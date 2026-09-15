<script setup>
import { onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import ProductsShowcase from '../components/ProductsShowcase.vue'
import WhyUsSection from '../components/WhyUsSection.vue'
import IndustriesSection from '../components/IndustriesSection.vue'
import FactorySection from '../components/FactorySection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'

// Import images directly
import logoImg from '../assets/logo_icon.png'
import heroImg from '../assets/heroImage.png'

// Site configuration
const siteConfig = {
  logo: logoImg,
  companyName: 'KAILASH ME',
  heroBadge: '20+ Years in Industrial Manufacturing',
  heroTitle1: 'PRECISION',
  heroTitle2: 'AT SCALE',
  heroSubtitle: '精密制造 · 高效生产 · 值得信赖',
  heroCta1: 'Get Free Quote',
  heroCta2: 'View Products',
  heroImage: heroImg,
  footerDesc: 'Precision laser cutting solutions for industrial manufacturing worldwide.',
  contactEmail: 'sales@aorelaser.cn',
  contactPhone: '+86 400-832-8321',
  contactAddress: 'Jinan, Shandong, China'
}

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Global Cases' },
  { value: '180+', label: 'Countries Served' },
  { value: '99%', label: 'Client Satisfaction' }
]

// Scroll reveal
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="min-h-screen bg-surface">
    <NavBar :config="siteConfig" />
    <HeroSection :config="siteConfig" :stats="stats" />
    <FactorySection />
    <ProductsShowcase />
    <WhyUsSection />
    <IndustriesSection />
    
    <!-- <TestimonialSection /> -->
    <!-- <ProcessSection /> -->
    <!-- <ContactSection /> -->
    <FooterSection :config="siteConfig" />
  </div>
</template>
