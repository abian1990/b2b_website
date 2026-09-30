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
  if (!container) return
  const card = container.querySelector('[data-factory-card]')
  const step = card ? card.offsetWidth + 16 : 320
  container.scrollBy({ left: -step, behavior: 'smooth' })
}

const scrollRight = () => {
  const container = scrollContainer.value
  if (!container) return
  const card = container.querySelector('[data-factory-card]')
  const step = card ? card.offsetWidth + 16 : 320
  container.scrollBy({ left: step, behavior: 'smooth' })
}

onMounted(() => {
  startScroll()
})

onUnmounted(() => {
  stopScroll()
})
</script>

<template>
  <section id="factory" class="py-16 bg-white" style="scroll-margin-top: 80px;" aria-labelledby="factory-heading">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Factory</span>
        <h2 id="factory-heading" class="text-3xl md:text-4xl font-bold text-primary mt-3">Manufacturing Strength</h2>
        <p class="text-muted mt-3">Smart production · Precision manufacturing · Quality assurance</p>
      </div>

      <!-- Banner -->
      <div class="relative overflow-hidden border border-border mb-6" style="height: min(420px, 55vw);">
        <img
          :src="bg1"
          alt="ZZSKY laser cutting machine factory workshop in Henan China"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/35 to-transparent"></div>
        <div class="absolute inset-0 flex items-center px-6 md:px-10">
          <div class="max-w-xl">
            <div class="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1 text-xs md:text-sm mb-4 border border-white/20">
              <span class="w-1.5 h-1.5 bg-accent rounded-full"></span>
              20+ Years Experience
            </div>
            <h3 class="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Precision Manufacturing <span class="text-accent">At Scale</span>
            </h3>
            <p class="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
              State-of-the-art production facilities with automated assembly lines
            </p>
          </div>
        </div>
      </div>

      <!-- Factory image carousel -->
      <div class="relative mb-10">
        <div class="absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <button
          type="button"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 hover:bg-white shadow-md border border-border rounded-full flex items-center justify-center text-primary hover:text-accent transition-all"
          aria-label="Previous factory photos"
          @click="scrollLeft"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/95 hover:bg-white shadow-md border border-border rounded-full flex items-center justify-center text-primary hover:text-accent transition-all"
          aria-label="Next factory photos"
          @click="scrollRight"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-4 overflow-x-hidden py-1"
          style="height: 300px;"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <div
            v-for="(img, index) in duplicatedImages"
            :key="index"
            data-factory-card
            class="flex-shrink-0 relative overflow-hidden border border-border group cursor-default"
            style="width: min(420px, 75vw);"
          >
            <img
              :src="img.src"
              :alt="img.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent">
              <div class="absolute bottom-5 left-5 right-5">
                <span class="text-accent text-xs font-semibold uppercase tracking-wider">{{ img.subtitle }}</span>
                <h4 class="text-white text-lg font-bold mt-1">{{ img.title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FactoryVideoGallery />

    <!-- Stats -->
    <div class="max-w-7xl mx-auto px-6 mt-10">
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-surface p-6 md:p-8 border border-border border-l-4 border-l-accent">
          <h3 class="text-lg font-bold text-primary mb-5 flex items-center gap-3">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Production Scale
          </h3>
          <div class="grid grid-cols-3 gap-3 md:gap-4">
            <div class="text-center p-3 md:p-4 bg-white border border-border">
              <div class="text-2xl md:text-3xl font-bold text-accent">50,000<span class="text-sm">㎡</span></div>
              <div class="text-muted text-xs md:text-sm mt-1">Floor Area</div>
            </div>
            <div class="text-center p-3 md:p-4 bg-white border border-border">
              <div class="text-2xl md:text-3xl font-bold text-accent">200<span class="text-sm">+</span></div>
              <div class="text-muted text-xs md:text-sm mt-1">Machines</div>
            </div>
            <div class="text-center p-3 md:p-4 bg-white border border-border">
              <div class="text-2xl md:text-3xl font-bold text-accent">500<span class="text-sm">+</span></div>
              <div class="text-muted text-xs md:text-sm mt-1">Employees</div>
            </div>
          </div>
        </div>

        <div class="bg-surface p-6 md:p-8 border border-border border-l-4 border-l-primary">
          <h3 class="text-lg font-bold text-primary mb-5 flex items-center gap-3">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            International Certifications
          </h3>
          <div class="flex flex-wrap gap-2 md:gap-3">
            <span class="bg-primary text-white px-4 py-2 font-bold text-sm">CE</span>
            <span class="bg-primary text-white px-4 py-2 font-bold text-sm">ISO 9001</span>
            <span class="bg-primary text-white px-4 py-2 font-bold text-sm">SGS</span>
            <span class="bg-primary text-white px-4 py-2 font-bold text-sm">TUV</span>
            <span class="bg-primary text-white px-4 py-2 font-bold text-sm">FDA</span>
          </div>
          <p class="text-muted text-sm mt-4">Quality management system certified by international standards</p>
        </div>
      </div>
    </div>
  </section>
</template>
