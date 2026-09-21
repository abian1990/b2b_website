# Quote System Setup (Cloudflare Pages Functions)

## Features

| Feature | Implementation |
|---------|----------------|
| B2B form fields | Company / Contact / Phone / Email / Products / Qty / Budget / Requirements |
| Turnstile | Frontend widget + server verify on `/api/quote` |
| Success state | In-form success panel with Reference ID |
| Sales email notify | Resend → `NOTIFY_EMAIL` |
| Customer auto-reply | Resend → customer email (`CUSTOMER_AUTO_REPLY=false` to disable) |
| Data archive | KV `QUOTES_KV`, keys prefixed `quote:` |
| CSV export | `GET /api/quotes?format=csv` + Admin Key |

## 1. Cloudflare Dashboard

### KV（下载报价单必需）
若导出时报 `QUOTES_KV binding missing`，说明 **Pages 项目还没绑 KV**，按下面做完后必须 **Redeploy** 才生效：

1. Cloudflare Dashboard → **Workers & Pages** → **KV** → **Create a namespace**  
   名称随意，例如 `zzsky-quotes`
2. 打开你的 **Pages 项目** → **Settings** → **Functions** → **KV namespace bindings** → **Add binding**
   - Variable name / Binding name：**`QUOTES_KV`**（必须完全一致，区分大小写）
   - KV namespace：选上一步创建的 namespace
3. **Production** 和 **Preview** 环境各绑一次（若两边都要用）
4. **Deployments** → 对最新部署点 **Retry deployment**，或重新 push 触发构建  
   （只改 Binding 不重新部署，线上 Functions 仍读不到 `env.QUOTES_KV`）

本地开发：

```bash
npm run pages:dev
# 等价于: npm run build && wrangler pages dev dist --kv=QUOTES_KV
```

### Turnstile
1. Turnstile → Add site (your production domain; you may also add `*.pages.dev`)
2. Set **both** keys on Pages (Runtime Variables / Secrets):
   - `TURNSTILE_SITE_KEY` = **Site Key** (public; returned by `/api/config`)
   - `TURNSTILE_SECRET_KEY` = **Secret Key** (server only)
3. (Optional) Build var `VITE_TURNSTILE_SITE_KEY` = same Site Key  
   If omitted, the frontend loads the Site Key from `/api/config`.

> Common mistake: only Secret is set → no widget on the page → submit fails with `Missing Turnstile token`.

Local Always Pass keys:
- Site: `1x00000000000000000000AA`
- Secret: `1x0000000000000000000000000000000AA`

### Resend (sales notification)
1. Sign up at [Resend](https://resend.com) and verify a sending domain
2. Create an API Key
3. Pages Secrets / Env:
   - `RESEND_API_KEY`
   - `EMAIL_FROM` = `ZZSKY Quote <noreply@your-verified-domain.com>`
   - `NOTIFY_EMAIL` = your sales inbox

Without a verified domain, Resend test sending can only deliver to your Resend account email.

### Other environment variables
| Variable | Where | Notes |
|----------|-------|-------|
| `TURNSTILE_SITE_KEY` | Runtime | Public Site Key via `/api/config` |
| `VITE_TURNSTILE_SITE_KEY` | Build (optional) | Same Site Key; otherwise use `/api/config` |
| `VITE_SITE_URL` | Build | SEO canonical domain |
| `TURNSTILE_SECRET_KEY` | Runtime Secret | Server verification |
| `RESEND_API_KEY` | Runtime Secret | Email sending |
| `EMAIL_FROM` | Runtime | From address |
| `NOTIFY_EMAIL` | Runtime | Sales inbox |
| `ADMIN_API_KEY` | Runtime Secret | Export auth (create yourself) |
| `ALLOWED_ORIGINS` | Runtime | Comma-separated, e.g. `https://www.zzsky.com` |
| `CUSTOMER_AUTO_REPLY` | Runtime | Default on; `false` disables customer receipt |
| `RATE_LIMIT` | Runtime | Max submits per IP / 10 min (default 5) |

## 2. Repo files

```
functions/
  _lib/quoteHelpers.js
  api/quote.js      → POST /api/quote
  api/quotes.js     → GET  /api/quotes
public/_routes.json → Functions only for /api/*
src/components/ContactSection.vue
wrangler.toml
```

## 3. Export quotes as CSV

```bash
curl -L "https://your-domain/api/quotes?format=csv" \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -o quotes.csv
```

Or JSON:

```bash
curl "https://your-domain/api/quotes?format=json&limit=200" \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

Or open `/admin-quotes.html` and paste the same Admin API Key.

## 4. Local (optional)

```bash
npm run build
npx wrangler pages dev dist --kv=QUOTES_KV
```

Also bind the same Secrets / KV on the Preview environment in the Dashboard.

## 5. Checklist

- [ ] Form submit succeeds and shows Reference ID
- [ ] Sales inbox receives quote email (Reply-To = customer)
- [ ] Customer receives receipt (if enabled)
- [ ] Invalid Turnstile / empty fields are rejected
- [ ] `/api/quotes?format=csv` downloads latest records
- [ ] Export without Admin Key returns 401
