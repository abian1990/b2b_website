<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import ProductsShowcase from '../components/ProductsShowcase.vue'
import WhyUsSection from '../components/WhyUsSection.vue'
import IndustriesSection from '../components/IndustriesSection.vue'
import FactorySection from '../components/FactorySection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'
import logoImg from '../assets/logo_icon.webp'
import heroImg from '../assets/heroImage.webp'
import { siteMeta, homeFaqs } from '../seo/siteMeta.js'
import {
  applyPageSeo,
  buildOrganizationLd,
  buildWebSiteLd,
  buildFaqLd
} from '../seo/applyPageSeo.js'

const route = useRoute()
const router = useRouter()

const siteConfig = {
  logo: logoImg,
  companyName: siteMeta.brand,
  heroBadge: '20+ Years in Industrial Manufacturing',
  heroTitle1: 'PRECISION',
  heroTitle2: 'AT SCALE',
  heroSubtitle: 'Precision Manufacturing · Efficient Production · Trusted Partner',
  heroCta1: 'Get Free Quote',
  heroCta2: 'View Products',
  heroImage: heroImg,
  footerDesc: siteMeta.description,
  contactEmail: siteMeta.contactEmail,
  contactPhone: siteMeta.contactPhone,
  contactAddress: `${siteMeta.address.locality}, ${siteMeta.address.region}, ${siteMeta.address.countryName}`
}

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Global Cases' },
  { value: '180+', label: 'Countries Served' },
  { value: '99%', label: 'Client Satisfaction' }
]

const applyHomeSeo = () => {
  applyPageSeo({
    title: siteMeta.tagline,
    description: siteMeta.description,
    path: '/',
    type: 'website',
    jsonLd: [
      { id: 'seo-ld-org', data: buildOrganizationLd() },
      { id: 'seo-ld-website', data: buildWebSiteLd() },
      { id: 'seo-ld-faq', data: buildFaqLd(homeFaqs) }
    ]
  })
}

const scrollToSection = async (sectionId) => {
  if (!sectionId) return
  await nextTick()
  requestAnimationFrame(() => {
    const el = document.getElementById(sectionId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
    if (route.query.section) {
      router.replace({ query: {} })
    }
  })
}

watch(
  () => route.query.section,
  (section) => {
    if (section) scrollToSection(section)
  }
)

onMounted(() => {
  applyHomeSeo()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el))

  if (route.query.section) {
    scrollToSection(route.query.section)
  }
})
</script>

<template>
  <div class="min-h-screen bg-surface">
    <NavBar :config="siteConfig" />
    <main>
      <HeroSection :config="siteConfig" :stats="stats" />
      <FactorySection />
      <ProductsShowcase />
      <WhyUsSection />
      <IndustriesSection />
      <FaqSection />
      <!-- <ContactSection /> -->
    </main>
    <!-- <FooterSection :config="siteConfig" /> -->
  </div>
</template>
