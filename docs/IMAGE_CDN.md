# 图片优化与外网 CDN 配置

本站部署在 **Cloudflare Pages**，静态资源默认已走 Cloudflare 全球 CDN，无需再挂第三方图床也能获得边缘缓存加速。

## 已完成的本地优化

| 项 | 结果 |
|----|------|
| 格式 | 产品/工厂/Hero 等大图统一为 **WebP** |
| 体积 | `src/assets` 约 **23MB → ~2MB** |
| 引用 | `products.js` / 各 Vue 组件改为 `.webp` |
| 懒加载 | 列表/画廊/工厂轮播使用 `loading="lazy"`；Hero/详情主图用 `fetchpriority="high"` |
| 浏览器缓存 | `public/_headers` 对 `/assets/*` 设置 `max-age=31536000, immutable` |

重新部署后，Vite 会把图片打成带 hash 的 `/assets/xxx.webp`，CDN + 长缓存即可生效。

---

## 方案 A：继续用 Pages 自带 CDN（推荐起步）

适合当前规模（几十张产品图）。

1. 正常 `git push` → Pages 自动构建部署  
2. 自定义域名接到 Pages（SSL 由 CF 自动签发）  
3. 控制台打开缓存相关能力（见下「Polish」）

无需改代码、无需额外账单（Polish 部分套餐含免费档）。

### 开启 Cloudflare Polish（一键压缩）

Dashboard → 你的域名 → **Speed** → **Optimization** → **Polish**

| 选项 | 说明 |
|------|------|
| Off | 不处理 |
| Lossless | 无损压缩 |
| **Lossy（推荐）** | 有损压缩，体积更小；已是 WebP 时仍可再优化传输 |

同时可打开 **WebP**（若访问端支持则自动协商 WebP；本站源文件已是 WebP，收益主要在未转换的旧 PNG/JPG）。

### 缓存级别（可选）

Dashboard → **Caching** → **Configuration**

- Caching Level: **Standard**
- Browser Cache TTL: 可保持默认；静态 hash 资源已由 `_headers` 控制

---

## 方案 B：Cloudflare Images（按需裁剪 / 多尺寸）

适合以后要做响应式多尺寸、后台上传图、或把图与站点代码分离。

### 开通

1. Dashboard → **Images** → 开通计划  
2. 上传原图，或用 Direct Creator Upload / URL 拉取  

### 交付 URL 示例

```
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/public
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/w=800,q=80
```

前端可写成：

```html
<img
  srcset="
    https://imagedelivery.net/.../w=400 400w,
    https://imagedelivery.net/.../w=800 800w
  "
  sizes="(max-width: 768px) 100vw, 400px"
  src="https://imagedelivery.net/.../w=800"
  alt="..."
  loading="lazy"
/>
```

产品数据里把本地 `import` 换成 Images URL 即可逐步迁移。

---

## 方案 C：R2 + 自定义域名（自建图床）

适合大量素材、PDF、视频，或想从 Git 仓库里拿掉大文件。

1. 创建 **R2** bucket（如 `zzsky-media`）  
2. 绑定自定义域名，例如 `cdn.yourdomain.com`（在 R2 → Settings → Custom Domains）  
3. 上传 WebP 后使用：`https://cdn.yourdomain.com/saige/seg-t120q.webp`  
4. 代码中把 `import ... from '../assets/...'` 改为上述 URL（或放到 `products.js` 字符串）

R2 出站走 CF 网络时通常无 egress 费；注意对象 ACL / 公开读配置。

本地可用 Wrangler：

```bash
npx wrangler r2 object put zzsky-media/saige/seg-t120q.webp --file=./src/assets/saige/seg-t120q.webp --content-type=image/webp
```

---

## 方案对比

| | Pages 静态资源 | Polish | CF Images | R2 + CDN 域名 |
|--|----------------|--------|-----------|---------------|
| 改代码量 | 无 | 无 | 中 | 中 |
| 多尺寸裁剪 | 需本地出多份 | 弱 | 强 | 需自己做或 + Images |
| 费用 | 含在 Pages | 套餐内/低 | 按量 | 存储按量 |
| 推荐场景 | **当前官网** | 所有 CF 站点建议开 | 产品图很多、要响应式 | 素材库 / 大文件 |

**建议路径**：保持现状（WebP + Pages CDN + `_headers`）→ 控制台打开 **Polish = Lossy** → 若产品图继续膨胀再迁 **Images** 或 **R2**。

---

## 本地继续压图（可选脚本）

若新增 JPG/PNG，可先转 WebP 再提交：

```bash
# 需已安装 Pillow: pip3 install pillow
python3 - <<'PY'
from pathlib import Path
from PIL import Image

root = Path("src/assets")
for p in list(root.rglob("*.jpg")) + list(root.rglob("*.png")):
    out = p.with_suffix(".webp")
    img = Image.open(p).convert("RGB")
    # 长边限制 1600，质量 78
    w, h = img.size
    m = 1600
    if max(w, h) > m:
        if w >= h:
            img = img.resize((m, int(h * m / w)), Image.Resampling.LANCZOS)
        else:
            img = img.resize((int(w * m / h), m), Image.Resampling.LANCZOS)
    img.save(out, "WEBP", quality=78, method=6)
    print(p, "->", out, out.stat().st_size // 1024, "KB")
PY
```

转完后把 Vue / `products.js` 里的扩展名改为 `.webp`，再删除原 JPG/PNG。

---

## 工厂视频（`public/videos/`）

视频放在 **`public/videos/`**，在 `src/data/factoryVideos.js` 登记条目，不要放进 `src/assets`（避免 Vite 打包大文件）。

性能约定（`FactoryVideoGallery.vue` 已实现）：

- 页面上只有 **一个** `<video>`，列表只用海报图
- `preload="none"`，点击播放后才拉流
- 切出视口自动暂停；切换条目会卸载旧 `src`
- 建议转成 **H.264 MP4**（或 WebM），单条约 5–8MB；当前 `.mov` 约 40MB，外网建议用 HandBrake / ffmpeg 压缩后再替换

新增示例：

```js
{
  id: 'assembly-line',
  title: 'Assembly Line',
  subtitle: 'Automated Build',
  src: '/videos/assembly-line.mp4',
  poster: posterAssembly,
  type: 'video/mp4'
}
```

## 验收清单

- [ ] 部署后 Network 面板：图片为 `image/webp`，体积明显小于改前  
- [ ] `/assets/*` 响应头含 `Cache-Control: ... immutable`  
- [ ] 首屏 Hero 优先加载；下方产品/工厂图为 lazy  
- [ ] （可选）域名开启 Polish Lossy  
- [ ] Lighthouse 的「Properly size images / Efficiently encode images」告警减少
