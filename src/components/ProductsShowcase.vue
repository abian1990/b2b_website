<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { products } from '../data/products.js'

const scrollContainer = ref(null)
let animationId = null
let isPaused = false

const productImages = computed(() =>
  products.map((p) => ({
    src: p.image,
    id: p.id,
    name: p.name,
    badge: p.badge
  }))
)

const allProducts = computed(() => [...productImages.value, ...productImages.value])
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

const CARD_STEP = 400

const scrollLeft = () => {
  const container = scrollContainer.value
  if (container) {
    container.scrollBy({ left: -CARD_STEP, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  const container = scrollContainer.value
  if (container) {
    container.scrollBy({ left: CARD_STEP, behavior: 'smooth' })
  }
}

const handleWheel = (e) => {
  const container = scrollContainer.value
  if (container) {
    e.preventDefault()
    container.scrollLeft += e.deltaY * 2
  }
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
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
        <h2 class="text-4xl font-bold text-primary mt-3">Core Product Line</h2>
        <p class="text-muted mt-3">Tube & sheet fiber laser cutting machines · SEG Series</p>
      </div>
    </div>

    <!-- Image Scroll + Text -->
    <div class="flex h-[420px] md:h-[460px]">
      <!-- Left: Scrolling Images -->
      <div class="w-3/4 relative">
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none"></div>

        <button
          @click="scrollLeft"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          @click="scrollRight"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:text-accent transition-all hover:scale-110"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div
          ref="scrollContainer"
          class="flex gap-5 overflow-x-hidden py-4 px-4 h-full items-center"
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
            <div
              class="relative overflow-hidden bg-white border border-border shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:border-accent/40 group-hover:-translate-y-1"
              style="width: 380px; height: 280px;"
            >
              <img
                :src="product.src"
                :alt="product.name"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-16 pb-4 px-4">
                <span class="inline-block text-accent text-[11px] font-semibold uppercase tracking-wider mb-1">{{ product.badge }}</span>
                <div class="text-white text-base font-bold leading-snug line-clamp-2">{{ product.name }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Diagonal Divider -->
      <div class="relative w-12 flex-shrink-0 bg-surface">
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 48 460" preserveAspectRatio="none">
          <path d="M0 0 L30 0 L48 460 L18 460 Z" fill="white"/>
          <path d="M28 0 L46 460" stroke="#e11d48" stroke-width="1.5" fill="none"/>
        </svg>
      </div>

      <!-- Right: Text -->
      <div class="w-1/4 flex items-center justify-center bg-white px-5">
        <div class="text-center">
          <div class="text-accent text-sm font-semibold tracking-wider uppercase mb-2">Henan Saige</div>
          <h3 class="text-xl font-bold text-primary mb-3">Tube & Sheet Laser</h3>
          <p class="text-muted text-sm mb-5 leading-relaxed">Standard · Offside · No-CAD · Flat sheet</p>
          <button
            type="button"
            class="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 font-semibold text-sm hover:bg-accent transition-colors"
            @click="scrollToContact"
          >
            Get Quote
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
