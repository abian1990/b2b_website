import {
  corsHeaders,
  json,
  getClientIp,
  verifyTurnstile,
  checkRateLimit,
  validateQuote,
  sendResendEmail,
  escapeHtml
} from '../_lib/quoteHelpers.js'

const onRequestOptions = async (context) => {
  const origin = context.request.headers.get('Origin') || ''
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, context.env.ALLOWED_ORIGINS)
  })
}

const onRequestPost = async (context) => {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin, env.ALLOWED_ORIGINS)

  try {
    const ip = getClientIp(request)
    const rate = await checkRateLimit(env.QUOTES_KV, ip, Number(env.RATE_LIMIT || 5), 600)
    if (!rate.ok) {
      return json({ ok: false, error: 'Too many requests. Please try again later.' }, 429, headers)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400, headers)
    }

    const turnstileToken = body.turnstileToken || body['cf-turnstile-response']
    const turnstile = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip)
    if (!turnstile.success) {
      return json(
        {
          ok: false,
          error: 'Human verification failed. Please refresh and try again.',
          details: turnstile['error-codes'] || turnstile.error
        },
        403,
        headers
      )
    }

    const payload = {
      company: String(body.company || '').trim(),
      contactName: String(body.contactName || body.name || '').trim(),
      phone: String(body.phone || '').trim(),
      email: String(body.email || '').trim().toLowerCase(),
      country: String(body.country || '').trim(),
      products: Array.isArray(body.products)
        ? body.products.map((p) => String(p).trim()).filter(Boolean)
        : String(body.products || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
      quantity: String(body.quantity || '').trim(),
      budget: String(body.budget || '').trim(),
      message: String(body.message || '').trim()
    }

    const errors = validateQuote(payload)
    if (errors.length) {
      return json({ ok: false, error: errors.join('; ') }, 400, headers)
    }

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    const record = {
      id,
      createdAt,
      ...payload,
      ip,
      userAgent: request.headers.get('User-Agent') || '',
      source: body.source || 'website'
    }

    if (env.QUOTES_KV) {
      await env.QUOTES_KV.put(`quote:${createdAt}:${id}`, JSON.stringify(record))
      // lightweight index for recent lookups
      const indexKey = 'quotes:recent'
      const recent = JSON.parse((await env.QUOTES_KV.get(indexKey)) || '[]')
      recent.unshift({ id, createdAt, company: record.company, email: record.email })
      await env.QUOTES_KV.put(indexKey, JSON.stringify(recent.slice(0, 500)))
    }

    const notifyTo = env.NOTIFY_EMAIL || env.EMAIL_TO
    const productLine = payload.products.join(', ')
    const adminHtml = `
      <h2>New Quote Request — ZZSKY</h2>
      <p><strong>ID:</strong> ${escapeHtml(id)}</p>
      <p><strong>Time:</strong> ${escapeHtml(createdAt)}</p>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td>Company</td><td>${escapeHtml(payload.company)}</td></tr>
        <tr><td>Contact</td><td>${escapeHtml(payload.contactName)}</td></tr>
        <tr><td>Phone</td><td>${escapeHtml(payload.phone)}</td></tr>
        <tr><td>Email</td><td>${escapeHtml(payload.email)}</td></tr>
        <tr><td>Country</td><td>${escapeHtml(payload.country)}</td></tr>
        <tr><td>Products</td><td>${escapeHtml(productLine)}</td></tr>
        <tr><td>Quantity</td><td>${escapeHtml(payload.quantity)}</td></tr>
        <tr><td>Budget</td><td>${escapeHtml(payload.budget)}</td></tr>
        <tr><td>Message</td><td>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</td></tr>
        <tr><td>IP</td><td>${escapeHtml(ip)}</td></tr>
      </table>
    `
    const adminText = [
      `New Quote ${id}`,
      `Company: ${payload.company}`,
      `Contact: ${payload.contactName}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Country: ${payload.country}`,
      `Products: ${productLine}`,
      `Quantity: ${payload.quantity}`,
      `Budget: ${payload.budget}`,
      `Message: ${payload.message}`,
      `IP: ${ip}`
    ].join('\n')

    let notifyResult = { skipped: true }
    if (notifyTo) {
      notifyResult = await sendResendEmail(env, {
        to: notifyTo,
        subject: `[Quote] ${payload.company} — ${productLine || 'Inquiry'}`,
        html: adminHtml,
        text: adminText,
        replyTo: payload.email
      })
    }

    let customerResult = { skipped: true }
    if (env.CUSTOMER_AUTO_REPLY !== 'false') {
      customerResult = await sendResendEmail(env, {
        to: payload.email,
        subject: 'We received your quote request — ZZSKY',
        html: `
          <p>Dear ${escapeHtml(payload.contactName)},</p>
          <p>Thank you for contacting <strong>ZZSKY</strong>. We have received your quote request and will get back to you within <strong>24 hours</strong>.</p>
          <p><strong>Reference ID:</strong> ${escapeHtml(id)}</p>
          <p><strong>Products:</strong> ${escapeHtml(productLine)}</p>
          <p>If you need to add details, reply to this email or write to ${escapeHtml(notifyTo || 'our sales team')}.</p>
          <p>Best regards,<br/>ZZSKY Sales Team</p>
        `,
        text: `Dear ${payload.contactName},\n\nWe received your quote request (ID: ${id}). We will contact you within 24 hours.\n\nProducts: ${productLine}\n\nZZSKY Sales Team`
      })
    }

    return json(
      {
        ok: true,
        id,
        createdAt,
        message: 'Quote received. We will contact you within 24 hours.',
        email: {
          notify: notifyResult.ok || notifyResult.skipped,
          customer: customerResult.ok || customerResult.skipped
        }
      },
      200,
      headers
    )
  } catch (err) {
    console.error('quote error', err)
    return json({ ok: false, error: 'Internal server error' }, 500, headers)
  }
}

export { onRequestPost, onRequestOptions }
