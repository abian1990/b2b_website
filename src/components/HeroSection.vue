<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  config: Object,
  stats: Array
})

const displayStats = ref([])
const hasAnimated = ref(false)

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const animateNumber = (target, key) => {
  const duration = 2000
  const startTime = performance.now()
  const numericValue = parseInt(target.replace(/\D/g, ''))
  const suffix = target.replace(/[\d]/g, '')

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(numericValue * easeOut)

    const index = displayStats.value.findIndex(s => s.label === key)
    if (index !== -1) {
      displayStats.value[index] = {
        ...displayStats.value[index],
        value: currentValue + suffix
      }
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  displayStats.value = props.stats.map(s => ({ ...s }))

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        props.stats.forEach(stat => {
          animateNumber(stat.value, stat.label)
        })
      }
    })
  }, { threshold: 0.5 })

  const statsSection = document.querySelector('.hero-stats')
  if (statsSection) {
    observer.observe(statsSection)
  }
})
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden">
    <div class="absolute inset-0">
      <img :src="config.heroImage" alt="Industrial Machine" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary"></div>
    </div>

    <div class="relative z-10 min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-6 py-32">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span class="text-white/80 text-sm">{{ config.heroBadge }}</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            {{ config.heroTitle1 }}<br>
            <span class="text-accent">{{ config.heroTitle2 }}</span>
          </h1>
          <p class="text-xl text-white/70 mb-8">
            {{ config.heroSubtitle }}
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              type="button"
              class="bg-accent hover:bg-accent/90 text-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors"
              @click="scrollToSection('contact')"
            >
              {{ config.heroCta1 }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <button
              type="button"
              class="px-8 py-4 border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              @click="scrollToSection('products')"
            >
              {{ config.heroCta2 }}
            </button>
          </div>
        </div>

        <!-- Stats with animation -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 hero-stats">
          <div v-for="stat in displayStats" :key="stat.label" class="bg-white/5 backdrop-blur-sm p-5 border border-white/10">
            <div class="text-3xl md:text-4xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="text-white/60 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>
