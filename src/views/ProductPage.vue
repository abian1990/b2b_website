<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'
import { getProductById } from '../data/products.js'
import logoImg from '../assets/logo_icon.png'
import { siteMeta, SITE_URL } from '../seo/siteMeta.js'
import {
  applyPageSeo,
  buildOrganizationLd,
  buildProductLd,
  buildBreadcrumbLd
} from '../seo/applyPageSeo.js'

const route = useRoute()
const product = computed(() => getProductById(route.params.id))

const siteConfig = {
  logo: logoImg,
  companyName: siteMeta.brand,
  footerDesc: siteMeta.description,
  contactEmail: siteMeta.contactEmail,
  contactPhone: siteMeta.contactPhone,
  contactAddress: `${siteMeta.address.locality}, ${siteMeta.address.region}, ${siteMeta.address.countryName}`
}

const absoluteAsset = (src) => {
  if (!src || typeof src !== 'string') return siteMeta.ogImage
  if (/^https?:\/\//i.test(src)) return src
  return `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`
}

const applyProductSeo = () => {
  const p = product.value
  if (!p) {
    applyPageSeo({
      title: 'Product Not Found',
      description: siteMeta.description,
      path: route.path,
      noindex: true,
      jsonLd: [{ id: 'seo-ld-org', data: buildOrganizationLd() }]
    })
    return
  }

  const path = `/products/${p.id}`
  const title = `${p.name} — ${p.category}`
  const description = p.description
  const image = absoluteAsset(p.image)

  applyPageSeo({
    title,
    description,
    path,
    image,
    type: 'product',
    jsonLd: [
      { id: 'seo-ld-org', data: buildOrganizationLd() },
      {
        id: 'seo-ld-product',
        data: {
          ...buildProductLd(p, path),
          image
        }
      },
      {
        id: 'seo-ld-breadcrumb',
        data: buildBreadcrumbLd([
          { name: 'Home', path: '/' },
          { name: p.name, path }
        ])
      }
    ]
  })
}

watch(() => route.params.id, applyProductSeo)
onMounted(applyProductSeo)
</script>

<template>
  <div class="min-h-screen bg-surface">
    <NavBar :config="siteConfig" />
    <main>
      <article v-if="product" itemscope itemtype="https://schema.org/Product">
        <meta itemprop="name" :content="product.name" />
        <meta itemprop="description" :content="product.description" />
        <meta itemprop="sku" :content="product.id" />
        <ProductDetail :product="product" />
      </article>
      <div v-else class="min-h-screen flex items-center justify-center pt-20">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <router-link to="/" class="text-accent hover:underline">Back to Home</router-link>
        </div>
      </div>
      <ContactSection />
    </main>
    <FooterSection :config="siteConfig" />
  </div>
</template>
