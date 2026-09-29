/**
 * Dev-only: serve Cloudflare Pages Functions (functions/api/*.js) inside the Vite dev server.
 * Env comes from .dev.vars; KV bindings are absent, so KV-dependent code must tolerate a missing binding.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'

function loadDevVars(root) {
  const file = path.join(root, '.dev.vars')
  if (!existsSync(file)) return {}
  const vars = {}
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!m) continue
    vars[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  return vars
}

function toWebRequest(req) {
  const url = new URL(req.originalUrl || req.url, `http://${req.headers.host || 'localhost'}`)
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(key, v))
    else if (value != null) headers.set(key, value)
  }
  const hasBody = !['GET', 'HEAD'].includes(req.method)
  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? 'half' : undefined
  })
}

async function sendWebResponse(res, response) {
  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))
  if (!response.body) return res.end()
  for await (const chunk of response.body) res.write(chunk)
  res.end()
}

export default function pagesFunctions() {
  let root = process.cwd()
  return {
    name: 'dev-pages-functions',
    apply: 'serve',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || '').split('?')[0]
        const match = pathname.match(/^\/api\/([a-z0-9_-]+)\/?$/i)
        if (!match) return next()

        const file = path.join(root, 'functions', 'api', `${match[1]}.js`)
        if (!existsSync(file)) return next()

        try {
          const mod = await server.ssrLoadModule(file)
          const method = req.method.charAt(0) + req.method.slice(1).toLowerCase()
          const handler = mod[`onRequest${method}`] || mod.onRequest
          if (!handler) {
            res.statusCode = 405
            return res.end('Method Not Allowed')
          }
          const env = { ...loadDevVars(root) }
          const response = await handler({
            request: toWebRequest(req),
            env,
            params: {},
            waitUntil: (p) => Promise.resolve(p).catch((e) => console.error('[functions] waitUntil', e))
          })
          await sendWebResponse(res, response)
        } catch (err) {
          console.error(`[functions] ${pathname}`, err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
          }
          res.end(JSON.stringify({ ok: false, error: String(err?.message || err) }))
        }
      })
    }
  }
}
