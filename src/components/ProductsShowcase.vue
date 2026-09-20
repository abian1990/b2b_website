<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'
import product3 from '../assets/product3.png'
import product4 from '../assets/product4.png'
import product5 from '../assets/product5.png'
import product6 from '../assets/product6.png'

const scrollContainer = ref(null)
let animationId = null
let isPaused = false

const productImages = [
  { src: product1, id: 'f-series' },
  { src: product2, id: 's-series' },
  { src: product3, id: 'gr-series' },
  { src: product4, id: 'tz-series' },
  { src: product5, id: 'gr-h-series' },
  { src: product6, id: 'pgt-series' }
]

const allProducts = [...productImages, ...productImages]
const scrollSpeed = 0.8

const startScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  const scroll = () => {
    if (!isPaused) {
      container.scrollLeft += scrollSpeed
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
    const cardWidth = 256
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  const container = scrollContainer.value
  if (container) {
    const cardWidth = 256
    container.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }
}

const handleWheel = (e) => {
  const container = scrollContainer.value
  if (container) {
    e.preventDefault()
    container.scrollLeft += e.deltaY * 2
  }
}

onMounted(() => {
  startScroll()
  const container = scrollContainer.value
  if (container) {
    container.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  stopScroll()
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('wheel', handleWheel)
  }
})
</script>

<template>
  <section id="products" class="py-16 bg-surface" style="scroll-margin-top: 80px;">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Products</span>
        <h2 class="text-4xl font-bold text-primary mt-3">核心产品线</h2>
        <p class="text-muted mt-3">Industrial-grade laser cutting solutions</p>
      </div>
    </div>

    <!-- Image Scroll + Text -->
    <div class="flex h-[280px]">
      <!-- Left: Scrolling Images -->
      <div class="w-3/4 relative">
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none"></div>

        <!-- Left Arrow -->
        <button
          @click="scrollLeft"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110 opacity-0 hover:opacity-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Right Arrow -->
        <button
          @click="scrollRight"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110 opacity-0 hover:opacity-100"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-3 overflow-x-hidden py-3 px-3 h-full items-center"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <router-link
            v-for="(product, index) in allProducts"
            :key="index"
            :to="{ name: 'Product', params: { id: product.id } }"
            class="flex-shrink-0 group cursor-pointer"
            @click="isPaused = true"
          >
            <div class="relative overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg" style="width: 240px; height: 140px;">
              <img :src="product.src" :alt="product.id" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                <span class="text-white text-xs font-semibold">View Details →</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Diagonal Divider -->
      <div class="relative w-12 flex-shrink-0 bg-surface">
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 48 280" preserveAspectRatio="none">
          <path d="M0 0 L30 0 L48 280 L18 280 Z" fill="white"/>
          <path d="M28 0 L46 280" stroke="#e11d48" stroke-width="1.5" fill="none"/>
        </svg>
      </div>

      <!-- Right: Text -->
      <div class="w-1/4 flex items-center justify-center bg-white px-4">
        <div class="text-center">
          <div class="text-accent text-xs font-semibold tracking-wider uppercase mb-2">Precision Engineering</div>
          <h3 class="text-lg font-bold text-primary mb-2">Industrial Laser Solutions</h3>
          <p class="text-muted text-xs mb-3">Advanced fiber laser cutting technology</p>
          <a href="#contact" class="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 font-semibold text-xs">
            Get Quote
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
