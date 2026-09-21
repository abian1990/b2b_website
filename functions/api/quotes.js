import {
  corsHeaders,
  json,
  CSV_HEADER,
  quoteToCsvRow
} from '../_lib/quoteHelpers.js'

const unauthorized = (headers) =>
  json({ ok: false, error: 'Unauthorized' }, 401, headers)

const isAuthorized = (request, env) => {
  const key = env.ADMIN_API_KEY
  if (!key) return false
  const auth = request.headers.get('Authorization') || ''
  if (auth === `Bearer ${key}`) return true
  const url = new URL(request.url)
  return url.searchParams.get('key') === key
}

const onRequestOptions = async (context) => {
  const origin = context.request.headers.get('Origin') || ''
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, context.env.ALLOWED_ORIGINS)
  })
}

/**
 * GET /api/quotes?format=json|csv&limit=200
 * Header: Authorization: Bearer <ADMIN_API_KEY>
 */
const onRequestGet = async (context) => {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = corsHeaders(origin, env.ALLOWED_ORIGINS)

  if (!isAuthorized(request, env)) {
    return unauthorized(headers)
  }
  if (!env.QUOTES_KV) {
    return json({ ok: false, error: 'QUOTES_KV binding missing' }, 500, headers)
  }

  const url = new URL(request.url)
  const format = (url.searchParams.get('format') || 'json').toLowerCase()
  const limit = Math.min(Number(url.searchParams.get('limit') || 500), 2000)

  const listed = await env.QUOTES_KV.list({ prefix: 'quote:', limit })
  const quotes = []
  for (const key of listed.keys) {
    const raw = await env.QUOTES_KV.get(key.name)
    if (!raw) continue
    try {
      quotes.push(JSON.parse(raw))
    } catch {
      /* skip corrupt */
    }
  }

  quotes.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))

  if (format === 'csv') {
    const lines = [CSV_HEADER, ...quotes.map(quoteToCsvRow)]
    return new Response(lines.join('\n'), {
      status: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="zzsky-quotes-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    })
  }

  return json({ ok: true, count: quotes.length, quotes }, 200, headers)
}

export { onRequestGet, onRequestOptions }
