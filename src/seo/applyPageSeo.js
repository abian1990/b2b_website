import { SITE_URL, siteMeta } from './siteMeta.js'

const ensureMeta = (attr, key, content) => {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const ensureLink = (rel, href, extra = {}) => {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const setJsonLd = (id, data) => {
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/** 更新页面 SEO / GEO 相关 head 标签与 JSON-LD */
export function applyPageSeo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  jsonLd = []
} = {}) {
  const fullTitle = title?.includes(siteMeta.brand)
    ? title
    : `${title} | ${siteMeta.brand}`
  const desc = description || siteMeta.description
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const img = image || siteMeta.ogImage

  document.title = fullTitle

  ensureMeta('name', 'description', desc)
  ensureMeta('name', 'keywords', siteMeta.keywords)
  ensureMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
  ensureMeta('name', 'author', siteMeta.brand)
  ensureMeta('name', 'theme-color', '#0f172a')

  ensureMeta('property', 'og:type', type)
  ensureMeta('property', 'og:site_name', siteMeta.brand)
  ensureMeta('property', 'og:title', fullTitle)
  ensureMeta('property', 'og:description', desc)
  ensureMeta('property', 'og:url', url)
  ensureMeta('property', 'og:image', img)
  ensureMeta('property', 'og:locale', siteMeta.locale)
  ensureMeta('property', 'og:locale:alternate', siteMeta.alternateLocale)

  ensureMeta('name', 'twitter:card', 'summary_large_image')
  ensureMeta('name', 'twitter:title', fullTitle)
  ensureMeta('name', 'twitter:description', desc)
  ensureMeta('name', 'twitter:image', img)

  ensureLink('canonical', url)

  // 清理旧业务 JSON-LD，再写入本页
  ;['seo-ld-org', 'seo-ld-website', 'seo-ld-product', 'seo-ld-faq', 'seo-ld-breadcrumb'].forEach((id) => {
    const keep = jsonLd.find((item) => item.id === id)
    if (!keep) setJsonLd(id, null)
  })
  jsonLd.forEach(({ id, data }) => setJsonLd(id, data))
}

export function buildOrganizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMeta.brand,
    legalName: siteMeta.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: siteMeta.description,
    email: siteMeta.contactEmail,
    telephone: siteMeta.contactPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteMeta.address.street,
      addressLocality: siteMeta.address.locality,
      addressRegion: siteMeta.address.region,
      addressCountry: siteMeta.address.country
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Fiber laser tube cutting',
      'Sheet fiber laser cutting',
      'SEG tube laser machines',
      'Industrial metal fabrication equipment'
    ]
  }
}

export function buildWebSiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMeta.brand,
    url: SITE_URL,
    description: siteMeta.description,
    inLanguage: ['en', 'zh-CN'],
    publisher: { '@type': 'Organization', name: siteMeta.brand }
  }
}

export function buildFaqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  }
}

export function buildProductLd(product, path) {
  const url = `${SITE_URL}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameZh || product.name,
    alternateName: product.name,
    description: product.description,
    image: typeof product.image === 'string' ? product.image : undefined,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'SEG'
    },
    manufacturer: {
      '@type': 'Organization',
      name: siteMeta.brand
    },
    category: product.category,
    url,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    additionalProperty: (product.keySpecs || []).map((s) => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value
    }))
  }
}

export function buildBreadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  }
}
