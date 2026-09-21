# 报价系统部署说明（Cloudflare Pages Functions）

## 功能一览

| 能力 | 实现 |
|------|------|
| B2B 表单字段 | 公司 / 联系人 / 电话 / 邮箱 / 产品 / 数量 / 预算 / 需求 |
| Turnstile 人机验证 | 前端 widget + `/api/quote` 服务端校验 |
| 提交成功态 | 表单内成功页，展示 Reference ID |
| 销售邮件通知 | Resend → `NOTIFY_EMAIL` |
| 客户自动回执 | Resend → 客户邮箱（可用 `CUSTOMER_AUTO_REPLY=false` 关闭） |
| 数据存档 | KV `QUOTES_KV`，前缀 `quote:` |
| 导出 CSV | `GET /api/quotes?format=csv` + Admin Key |

## 1. Cloudflare 控制台配置

### KV
1. Workers & Pages → KV → Create namespace，例如 `zzsky-quotes`
2. 打开你的 Pages 项目 → Settings → Bindings → Add → KV namespace  
   - Variable name: **`QUOTES_KV`**  
   - Namespace: 刚创建的命名空间  
3. 保存后 **重新部署** 一次

### Turnstile
1. Turnstile → Add site，域名填你的线上域名（可加 `*.pages.dev`）
2. **两套 Key 都要配到 Pages（Runtime Variables / Secrets）**：
   - `TURNSTILE_SITE_KEY` = **Site Key**（公开，给前端用，经 `/api/config` 下发）
   - `TURNSTILE_SECRET_KEY` = **Secret Key**（仅服务端）
3. （可选）构建变量 `VITE_TURNSTILE_SITE_KEY` = 同一个 Site Key  
   若不配构建变量，前端会自动请求 `/api/config` 获取 Site Key。

> 常见错误：只配了 Secret，没配 Site Key → 页面不出现验证框，提交报 `Missing Turnstile token`。

本地测试可用 Cloudflare Always Pass：
- Site: `1x00000000000000000000AA`
- Secret: `1x0000000000000000000000000000000AA`

### Resend 邮件（销售通知）
1. 注册 [Resend](https://resend.com)，验证发信域名
2. 创建 API Key
3. Pages Secrets / Env：
   - `RESEND_API_KEY`
   - `EMAIL_FROM` = `ZZSKY Quote <noreply@你的已验证域名>`
   - `NOTIFY_EMAIL` = 你的销售邮箱

未验证域名时可用 Resend 测试发信地址（仅能发到你自己的账号邮箱）做联调。

### 其它环境变量
| 变量 | 位置 | 说明 |
|------|------|------|
| `TURNSTILE_SITE_KEY` | Runtime | **公开** Site Key，`/api/config` 返回 |
| `VITE_TURNSTILE_SITE_KEY` | Build（可选） | 同 Site Key；不配则走 `/api/config` |
| `VITE_SITE_URL` | Build | SEO 域名 |
| `TURNSTILE_SECRET_KEY` | Runtime Secret | 服务端校验 |
| `RESEND_API_KEY` | Runtime Secret | 发信 |
| `EMAIL_FROM` | Runtime | 发件人 |
| `NOTIFY_EMAIL` | Runtime | 销售收件 |
| `ADMIN_API_KEY` | Runtime Secret | 导出鉴权 |
| `ALLOWED_ORIGINS` | Runtime | 逗号分隔，如 `https://www.zzsky.com` |
| `CUSTOMER_AUTO_REPLY` | Runtime | 默认开；`false` 关闭客户回执 |
| `RATE_LIMIT` | Runtime | 同 IP 10 分钟内次数，默认 5 |

## 2. 仓库文件

```
functions/
  _lib/quoteHelpers.js
  api/quote.js      → POST /api/quote
  api/quotes.js     → GET  /api/quotes
public/_routes.json → 仅 /api/* 走 Functions
src/components/ContactSection.vue
wrangler.toml
```

## 3. 导出询价 CSV

```bash
curl -L "https://你的域名/api/quotes?format=csv" \
  -H "Authorization: Bearer 你的_ADMIN_API_KEY" \
  -o quotes.csv
```

或 JSON：

```bash
curl "https://你的域名/api/quotes?format=json&limit=200" \
  -H "Authorization: Bearer 你的_ADMIN_API_KEY"
```

## 4. 本地联调（可选）

```bash
npm run build
npx wrangler pages dev dist --kv=QUOTES_KV
```

在 Dashboard 把 Preview 环境也绑上同样的 Secrets / KV。

## 5. 验收清单

- [ ] 表单提交成功，出现 Reference ID
- [ ] 销售邮箱收到询价邮件（Reply-To 为客户邮箱）
- [ ] 客户收到回执（若开启）
- [ ] 错误 Turnstile / 空字段被拦截
- [ ] `/api/quotes?format=csv` 能下载且含最新记录
- [ ] 无 Admin Key 访问导出返回 401
