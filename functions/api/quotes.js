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

  try {
    if (!isAuthorized(request, env)) {
      return unauthorized(headers)
    }
    if (!env.QUOTES_KV) {
      const envKeys = Object.keys(env || {}).filter((k) => !/KEY|SECRET|TOKEN|PASSWORD/i.test(k))
      return json(
        {
          ok: false,
          error: 'QUOTES_KV binding missing',
          hint: 'Ensure wrangler.toml [[kv_namespaces]] binding=QUOTES_KV is deployed (name must match Pages project b2b-website).',
          envKeys
        },
        500,
        headers
      )
    }

    const url = new URL(request.url)
    const format = (url.searchParams.get('format') || 'json').toLowerCase()
    // Workers KV list() allows at most 1000 keys per call
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 500), 1), 1000)

    const keys = []
    let cursor
    while (keys.length < limit) {
      const pageSize = Math.min(1000, limit - keys.length)
      const listed = await env.QUOTES_KV.list({
        prefix: 'quote:',
        limit: pageSize,
        ...(cursor ? { cursor } : {})
      })
      keys.push(...listed.keys)
      if (listed.list_complete || !listed.cursor) break
      cursor = listed.cursor
    }

    const quotes = []
    for (const key of keys.slice(0, limit)) {
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
  } catch (err) {
    console.error('quotes export error', err)
    return json(
      {
        ok: false,
        error: err?.message || 'Internal server error',
        name: err?.name || 'Error'
      },
      500,
      headers
    )
  }
}

export { onRequestGet, onRequestOptions }
