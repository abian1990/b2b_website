import {
  corsHeaders,
  json,
  getClientIp,
  checkRateLimit,
  sendResendEmail,
  escapeHtml
} from '../_lib/quoteHelpers.js'
import {
  buildSystemPrompt,
  CHAT_TOOLS,
  MAX_HISTORY_MESSAGES,
  MAX_MESSAGE_CHARS
} from '../_lib/chatConfig.js'

const MAX_TOOL_ROUNDS = 2
const LLM_TIMEOUT_MS = 60000

/**
 * POST /api/chat — AI sales assistant (Server-Sent Events)
 * Body: { messages: [{ role: 'user'|'assistant', content }], productId?, sessionId? }
 * Events: { type: 'delta', text } | { type: 'lead', ok } | { type: 'error', message } | { type: 'done' }
 */
const onRequestPost = async (context) => {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin, env.ALLOWED_ORIGINS)

  if (!isOriginAllowed(origin, env.ALLOWED_ORIGINS)) {
    return json({ ok: false, error: 'Forbidden' }, 403, headers)
  }
  if (!env.LLM_API_KEY) {
    return json({ ok: false, error: 'AI assistant is not configured' }, 503, headers)
  }

  const ip = getClientIp(request)
  const rate = await checkRateLimit(env.QUOTES_KV, `chat:${ip}`, Number(env.CHAT_RATE_LIMIT || 30), 600)
  if (!rate.ok) {
    return json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' }, 429, headers)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400, headers)
  }

  const history = sanitizeHistory(body.messages)
  if (!history.length || history[history.length - 1].role !== 'user') {
    return json({ ok: false, error: 'messages must end with a user message' }, 400, headers)
  }

  const productId = typeof body.productId === 'string' ? body.productId.slice(0, 64) : ''
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 64) : ''
  const previousLeadId = sessionId && env.QUOTES_KV ? await env.QUOTES_KV.get(`chatlead:${sessionId}`) : null

  let systemPrompt = buildSystemPrompt({ productId })
  if (previousLeadId) {
    systemPrompt += '\n\nNOTE: This visitor already submitted their contact details. Only call submit_lead again if they provide new contact details or requirements.'
  }

  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()
  const send = (event) => writer.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))

  const leadContext = {
    ip,
    userAgent: request.headers.get('User-Agent') || '',
    productId,
    sessionId,
    isUpdate: Boolean(previousLeadId),
    transcript: history
  }

  const pump = runConversation(env, [{ role: 'system', content: systemPrompt }, ...history], send, leadContext)
    .catch(async (err) => {
      console.error('chat error', err)
      await send({ type: 'error', message: 'Sorry, the assistant is temporarily unavailable. Please email our sales team.' }).catch(() => {})
    })
    .finally(async () => {
      await send({ type: 'done' }).catch(() => {})
      await writer.close().catch(() => {})
    })
  context.waitUntil(pump)

  return new Response(readable, {
    status: 200,
    headers: {
      ...headers,
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no'
    }
  })
}

const onRequestOptions = async (context) => {
  const origin = context.request.headers.get('Origin') || ''
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, context.env.ALLOWED_ORIGINS)
  })
}

function isOriginAllowed(origin, allowedOrigins) {
  const list = (allowedOrigins || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (!list.length || list.includes('*')) return true
  return Boolean(origin) && list.includes(origin)
}

function sanitizeHistory(messages) {
  if (!Array.isArray(messages)) return []
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_HISTORY_MESSAGES)
}

async function runConversation(env, messages, send, leadContext) {
  let leadSent = false

  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const allowTools = round < MAX_TOOL_ROUNDS
    const res = await callLLM(env, messages, allowTools)
    const result = await readCompletionStream(res, (text) => send({ type: 'delta', text }))

    if (!result.toolCalls.length) return

    messages.push({
      role: 'assistant',
      content: result.content || null,
      tool_calls: result.toolCalls,
      ...(result.reasoning ? { reasoning_content: result.reasoning } : {})
    })

    for (const call of result.toolCalls) {
      let output
      if (call.function.name !== 'submit_lead') {
        output = { ok: false, error: `Unknown tool ${call.function.name}` }
      } else if (leadSent) {
        output = { ok: true, note: 'Lead already submitted in this reply.' }
      } else {
        output = await submitLead(env, parseToolArgs(call.function.arguments), leadContext)
        if (output.ok) {
          leadSent = true
          await send({ type: 'lead', ok: true })
        }
      }
      messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(output) })
    }
  }
}

async function callLLM(env, messages, allowTools) {
  const baseUrl = (env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '')
  const payload = {
    model: env.LLM_MODEL || 'deepseek-flash',
    messages,
    stream: true,
    temperature: Number(env.LLM_TEMPERATURE || 0.4),
    max_tokens: Number(env.LLM_MAX_TOKENS || 800)
  }
  if (allowTools) {
    payload.tools = CHAT_TOOLS
    payload.tool_choice = 'auto'
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.LLM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(LLM_TIMEOUT_MS)
  })
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '')
    throw new Error(`LLM HTTP ${res.status}: ${detail.slice(0, 500)}`)
  }
  return res
}

/** Parse an OpenAI-compatible chat.completion.chunk SSE stream */
async function readCompletionStream(res, onDelta) {
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  const toolCalls = []
  let buffer = ''
  let content = ''
  let reasoning = ''

  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const raw of lines) {
      const line = raw.trim()
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (!data || data === '[DONE]') continue

      let chunk
      try {
        chunk = JSON.parse(data)
      } catch {
        continue
      }
      const delta = chunk.choices?.[0]?.delta
      if (!delta) continue

      if (delta.content) {
        content += delta.content
        await onDelta(delta.content)
      }
      if (delta.reasoning_content) reasoning += delta.reasoning_content

      for (const tc of delta.tool_calls || []) {
        const i = tc.index ?? 0
        const slot = (toolCalls[i] ||= { id: '', type: 'function', function: { name: '', arguments: '' } })
        if (tc.id) slot.id = tc.id
        if (tc.function?.name && !slot.function.name) slot.function.name = tc.function.name
        if (tc.function?.arguments) slot.function.arguments += tc.function.arguments
      }
    }
  }

  return {
    content,
    reasoning,
    toolCalls: toolCalls.filter(Boolean).map((tc, i) => ({ ...tc, id: tc.id || `call_${i}` }))
  }
}

function parseToolArgs(raw) {
  try {
    const parsed = JSON.parse(raw || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const clip = (v, max) => String(v ?? '').trim().slice(0, max)

async function submitLead(env, args, ctx) {
  const email = clip(args.email, 120).toLowerCase()
  const phone = clip(args.phone, 40)
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid && phone.replace(/\D/g, '').length < 6) {
    return { ok: false, error: 'A valid email or phone/WhatsApp number is required. Ask the buyer for it.' }
  }

  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  const products = Array.isArray(args.products)
    ? args.products.map((p) => clip(p, 80)).filter(Boolean).slice(0, 10)
    : []
  if (!products.length && ctx.productId) products.push(ctx.productId)

  const transcriptText = ctx.transcript
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
    .join('\n')

  const record = {
    id,
    createdAt,
    company: clip(args.company, 120),
    contactName: clip(args.name, 80),
    phone,
    email: emailValid ? email : '',
    country: clip(args.country, 60),
    products,
    quantity: clip(args.quantity, 40),
    budget: '',
    message: clip(args.requirements, 5000),
    ip: ctx.ip,
    userAgent: ctx.userAgent,
    source: 'ai-chat',
    sessionId: ctx.sessionId,
    productPage: ctx.productId,
    transcript: transcriptText.slice(0, 20000)
  }

  if (env.QUOTES_KV) {
    await env.QUOTES_KV.put(`quote:${createdAt}:${id}`, JSON.stringify(record))
    const indexKey = 'quotes:recent'
    const recent = JSON.parse((await env.QUOTES_KV.get(indexKey)) || '[]')
    recent.unshift({ id, createdAt, company: record.company, email: record.email })
    await env.QUOTES_KV.put(indexKey, JSON.stringify(recent.slice(0, 500)))
    if (ctx.sessionId) {
      await env.QUOTES_KV.put(`chatlead:${ctx.sessionId}`, id, { expirationTtl: 60 * 60 * 24 * 7 })
    }
  }

  const notifyTo = env.NOTIFY_EMAIL || env.EMAIL_TO
  if (notifyTo) {
    const who = record.company || record.contactName || record.email || record.phone
    const rows = [
      ['Name', record.contactName],
      ['Company', record.company],
      ['Email', record.email],
      ['Phone / WhatsApp', record.phone],
      ['Country', record.country],
      ['Products', products.join(', ')],
      ['Quantity', record.quantity],
      ['Requirements', record.message],
      ['Page', record.productPage ? `/products/${record.productPage}` : 'Home'],
      ['IP', record.ip]
    ]
    const html = `
      <h2>New AI Chat Lead — ZZSKY${ctx.isUpdate ? ' (update)' : ''}</h2>
      <p><strong>ID:</strong> ${escapeHtml(id)} · <strong>Time:</strong> ${escapeHtml(createdAt)}</p>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td>${k}</td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}
      </table>
      <h3>Conversation</h3>
      <pre style="white-space:pre-wrap;font-family:sans-serif;font-size:13px;background:#f8fafc;padding:12px">${escapeHtml(transcriptText)}</pre>
    `
    const text = [
      `New AI Chat Lead ${id}`,
      ...rows.map(([k, v]) => `${k}: ${v}`),
      '',
      'Conversation:',
      transcriptText
    ].join('\n')

    const result = await sendResendEmail(env, {
      to: notifyTo,
      subject: `[AI Chat${ctx.isUpdate ? ' · Update' : ''}] ${who} — ${products.join(', ') || 'Inquiry'}`,
      html,
      text,
      replyTo: record.email || undefined
    })
    if (!result.ok && !result.skipped) console.error('chat lead email failed', result.error)
  }

  return { ok: true, id }
}

export { onRequestPost, onRequestOptions }
