<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import ProductDetail from '../components/ProductDetail.vue'
import FooterSection from '../components/FooterSection.vue'
import { getProductById } from '../data/products.js'
import logoImg from '../assets/logo_icon.png'

const route = useRoute()
const product = computed(() => getProductById(route.params.id))

const siteConfig = {
  logo: logoImg,
  companyName: 'KAILASH ME',
  footerDesc: 'Precision laser cutting solutions for industrial manufacturing worldwide.',
  contactEmail: 'sales@aorelaser.cn',
  contactPhone: '+86 400-832-8321',
  contactAddress: 'Huixian, Xinxiang, Henan, China'
}
</script>

<template>
  <div class="min-h-screen bg-surface">
    <NavBar :config="siteConfig" />
    <ProductDetail v-if="product" :product="product" />
    <div v-else class="min-h-screen flex items-center justify-center pt-20">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
        <router-link to="/" class="text-accent hover:underline">Back to Home</router-link>
      </div>
    </div>
    <FooterSection :config="siteConfig" />
  </div>
</template>
