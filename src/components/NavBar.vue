<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineProps({
  config: Object
})

const router = useRouter()
const route = useRoute()

const isProductPage = computed(() => route.name === 'Product')

const allNavItems = [
  { id: 'factory', label: 'Factory', homeOnly: true },
  { id: 'products', label: 'Products', homeOnly: true },
  { id: 'why-us', label: 'Solutions', homeOnly: true },
  { id: 'contact', label: 'Contact', homeOnly: false }
]

const navItems = computed(() =>
  allNavItems.filter((item) => {
    if (isProductPage.value) {
      return !item.homeOnly
    }
    return true
  })
)

const goToSection = async (sectionId) => {
  if (isProductPage.value && sectionId === 'contact') {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  if (route.name === 'Home') {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  await router.push({ name: 'Home', query: { section: sectionId } })
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-3">
          <img :src="config.logo" alt="Logo" class="h-8">
          <span class="text-white font-bold text-xl tracking-tight">{{ config.companyName }}</span>
        </router-link>
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="item in navItems"
            :key="item.id"
            type="button"
            class="text-white/80 hover:text-accent transition-colors text-sm font-medium"
            @click="goToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
