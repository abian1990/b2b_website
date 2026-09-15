<script setup>
defineProps({
  config: Object,
  stats: Array
})
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden">
    <div class="absolute inset-0">
      <img :src="config.heroImage" alt="Industrial Machine" class="w-full h-full object-cover opacity-40">
      <div class="gradient-overlay absolute inset-0"></div>
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
            <a href="#contact" class="btn-primary px-8 py-4 rounded-lg text-white font-semibold inline-flex items-center gap-2">
              {{ config.heroCta1 }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#products" class="px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
              {{ config.heroCta2 }}
            </a>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div v-for="stat in stats" :key="stat.label" class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div class="stat-number text-4xl font-bold font-display mb-2">{{ stat.value }}</div>
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
