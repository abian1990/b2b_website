import { corsHeaders, json } from '../_lib/quoteHelpers.js'

/**
 * 公开配置（可暴露给前端）
 * Site Key 是公开的；Secret 绝不能出现在这里
 */
const onRequestGet = async (context) => {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = {
    ...corsHeaders(origin, env.ALLOWED_ORIGINS),
    'Cache-Control': 'public, max-age=300'
  }

  return json(
    {
      ok: true,
      turnstileSiteKey: env.TURNSTILE_SITE_KEY || '',
      brand: env.SITE_BRAND || 'ZZSKY'
    },
    200,
    headers
  )
}

const onRequestOptions = async (context) => {
  const origin = context.request.headers.get('Origin') || ''
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, context.env.ALLOWED_ORIGINS)
  })
}

export { onRequestGet, onRequestOptions }
