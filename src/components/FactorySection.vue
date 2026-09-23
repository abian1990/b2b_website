<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FactoryVideoGallery from './FactoryVideoGallery.vue'
import factory1 from '../assets/factory1.webp'
import factory2 from '../assets/factory2.webp'
import factory3 from '../assets/factory3.webp'
import factory4 from '../assets/factory4.webp'
import factory5 from '../assets/factory5.webp'
import factory6 from '../assets/factory6.webp'
import part1 from '../assets/part1.webp'
import part2 from '../assets/part2.webp'
import part3 from '../assets/part3.webp'
import bg1 from '../assets/bg1.webp'

const scrollContainer = ref(null)
let animationId = null
let isPaused = false

const factoryImages = [
  { src: factory1, title: 'Production Workshop', subtitle: 'Smart Manufacturing Floor' },
  { src: factory2, title: 'Assembly Line', subtitle: 'Automated Assembly' },
  { src: factory3, title: 'Quality Control', subtitle: 'Precision Inspection' },
  { src: factory4, title: 'R&D Center', subtitle: 'Research & Development' },
  { src: factory5, title: 'Warehouse', subtitle: 'Smart Warehousing' },
  { src: factory6, title: 'Testing Facility', subtitle: 'Outgoing Test Center' },
  { src: part1, title: 'Precision Parts', subtitle: 'Precision Components' },
  { src: part2, title: 'Precision Parts', subtitle: 'Precision Components' },
  { src: part3, title: 'Precision Parts', subtitle: 'Precision Components' }
]

const duplicatedImages = [...factoryImages, ...factoryImages]

const startScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  const scroll = () => {
    if (!isPaused) {
      container.scrollLeft += 0.6
      const halfWidth = container.scrollWidth / 2
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0
      }
    }
    animationId = requestAnimationFrame(scroll)
  }
  animationId = requestAnimationFrame(scroll)
}

const stopScroll = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const scrollLeft = () => {
  const container = scrollContainer.value
  if (container) {
    const cardWidth = container.querySelector('div').offsetWidth + 16
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  const container = scrollContainer.value
  if (container) {
    const cardWidth = container.querySelector('div').offsetWidth + 16
    container.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }
}

onMounted(() => {
  startScroll()
})

onUnmounted(() => {
  stopScroll()
})
</script>

<template>
  <section id="factory" class="bg-white" style="scroll-margin-top: 80px;">
    <!-- Section Title -->
    <div class="bg-white pt-8 pb-4">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Factory</span>
        <h2 class="text-3xl font-bold text-primary mt-2">Manufacturing Strength</h2>
        <p class="text-muted mt-2">Smart production · Precision manufacturing · Quality assurance</p>
      </div>
    </div>

    <!-- Top Banner - Full Width -->
    <div class="relative overflow-hidden" style="height: 480px;">
      <img :src="bg1" alt="ZZSKY laser cutting machine factory workshop in Henan China" loading="lazy" decoding="async" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/0 to-transparent"></div>
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-7xl mx-auto px-8 w-full">
          <div class="inline-flex items-center gap-2 bg-accent/20 text-white px-4 py-1.5 text-sm mb-4">
            <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            20+ Years Experience
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-3">
            Precision Manufacturing <span class="text-accent">At Scale</span>
          </h2>
          <p class="text-white/80 text-lg max-w-lg">
            State-of-the-art production facilities with automated assembly lines
          </p>
        </div>
      </div>
    </div>

    <!-- Factory Carousel - Full Width -->
    <div class="bg-white pb-4">
      <div class="relative">
        <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <!-- Left Arrow -->
        <button
          @click="scrollLeft"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Right Arrow -->
        <button
          @click="scrollRight"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-4 overflow-x-hidden py-6"
          style="height: 360px;"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <div
            v-for="(img, index) in duplicatedImages"
            :key="index"
            class="flex-shrink-0 relative overflow-hidden group cursor-pointer"
            style="width: calc(50% - 8px);"
          >
            <img
              :src="img.src"
              :alt="img.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div class="absolute bottom-6 left-6">
                <span class="text-accent text-sm font-semibold uppercase tracking-wider">{{ img.subtitle }}</span>
                <h4 class="text-white text-xl font-bold mt-1">{{ img.title }}</h4>
              </div>
            </div>
            <!-- Corner decoration -->
            <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>
    </div>

    <FactoryVideoGallery />

    <!-- Stats & Certifications -->
    <div class="bg-surface py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Production Scale -->
          <div class="bg-white p-8 border-l-4 border-accent">
            <h3 class="text-xl font-bold text-primary mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Production Scale
            </h3>
            <div class="grid grid-cols-3 gap-6">
              <div class="text-center p-4 bg-slate-50">
                <div class="text-3xl font-bold text-accent">50,000<span class="text-base">㎡</span></div>
                <div class="text-muted text-sm mt-1">Floor Area</div>
              </div>
              <div class="text-center p-4 bg-slate-50">
                <div class="text-3xl font-bold text-accent">200<span class="text-base">+</span></div>
                <div class="text-muted text-sm mt-1">Machines</div>
              </div>
              <div class="text-center p-4 bg-slate-50">
                <div class="text-3xl font-bold text-accent">500<span class="text-base">+</span></div>
                <div class="text-muted text-sm mt-1">Employees</div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div class="bg-white p-8 border-l-4 border-primary">
            <h3 class="text-xl font-bold text-primary mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              International Certifications
            </h3>
            <div class="flex flex-wrap gap-3">
              <span class="bg-primary text-white px-5 py-2.5 font-bold text-sm">CE</span>
              <span class="bg-primary text-white px-5 py-2.5 font-bold text-sm">ISO 9001</span>
              <span class="bg-primary text-white px-5 py-2.5 font-bold text-sm">SGS</span>
              <span class="bg-primary text-white px-5 py-2.5 font-bold text-sm">TUV</span>
              <span class="bg-primary text-white px-5 py-2.5 font-bold text-sm">FDA</span>
            </div>
            <p class="text-muted text-sm mt-4">Quality management system certified by international standards</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
