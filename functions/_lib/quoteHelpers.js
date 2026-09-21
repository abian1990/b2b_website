/**
 * Shared helpers for Cloudflare Pages Functions (quote API)
 */

export const corsHeaders = (origin, allowedOrigins) => {
  const list = (allowedOrigins || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const allow =
    !list.length ||
    list.includes('*') ||
    (origin && list.includes(origin))
      ? origin || list[0] || '*'
      : list[0]

  return {
    'Access-Control-Allow-Origin': allow || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  }
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    }
  })

export const getClientIp = (request) =>
  request.headers.get('CF-Connecting-IP') ||
  request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
  'unknown'

export async function verifyTurnstile(token, secret, ip) {
  if (!secret) {
    return { success: false, error: 'TURNSTILE_SECRET_KEY not configured' }
  }
  if (!token) {
    return { success: false, error: 'Missing Turnstile token' }
  }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  if (ip && ip !== 'unknown') body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body
  })
  const outcome = await res.json()
  return outcome
}

export async function checkRateLimit(kv, ip, limit = 5, windowSec = 600) {
  if (!kv) return { ok: true }
  const key = `ratelimit:${ip}`
  const raw = await kv.get(key)
  const count = raw ? Number(raw) : 0
  if (count >= limit) {
    return { ok: false, remaining: 0 }
  }
  await kv.put(key, String(count + 1), { expirationTtl: windowSec })
  return { ok: true, remaining: limit - count - 1 }
}

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateQuote(payload) {
  const errors = []
  const required = ['company', 'contactName', 'phone', 'email', 'products', 'message']
  for (const key of required) {
    const val = payload[key]
    if (val == null || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && !val.length)) {
      errors.push(`${key} is required`)
    }
  }
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push('email is invalid')
  }
  if (payload.message && String(payload.message).length > 5000) {
    errors.push('message is too long (max 5000)')
  }
  if (payload.phone && String(payload.phone).length > 40) {
    errors.push('phone is too long')
  }
  return errors
}

export async function sendResendEmail(env, { to, subject, html, text, replyTo }) {
  if (!env.RESEND_API_KEY) {
    return { ok: false, skipped: true, error: 'RESEND_API_KEY not set' }
  }
  const from = env.EMAIL_FROM || 'ZZSKY Quote <onboarding@resend.dev>'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      reply_to: replyTo || undefined
    })
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { ok: false, error: data?.message || `Resend HTTP ${res.status}`, data }
  }
  return { ok: true, data }
}

export function quoteToCsvRow(q) {
  const cells = [
    q.id,
    q.createdAt,
    q.company,
    q.contactName,
    q.phone,
    q.email,
    q.country || '',
    Array.isArray(q.products) ? q.products.join('; ') : q.products || '',
    q.quantity || '',
    q.budget || '',
    (q.message || '').replace(/\r?\n/g, ' '),
    q.ip || ''
  ]
  return cells.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')
}

export const CSV_HEADER =
  'id,createdAt,company,contactName,phone,email,country,products,quantity,budget,message,ip'
