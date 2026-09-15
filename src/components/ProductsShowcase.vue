<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'
import product3 from '../assets/product3.png'
import product4 from '../assets/product4.png'
import product5 from '../assets/product5.png'
import product6 from '../assets/product6.png'
import { products } from '../data/products.js'

const router = useRouter()
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

// Duplicate for seamless loop
const allProducts = [...productImages, ...productImages]

const scrollSpeed = 1 // pixels per frame

const startScroll = () => {
  const container = scrollContainer.value
  if (!container) return

  const scroll = () => {
    if (!isPaused) {
      container.scrollLeft += scrollSpeed

      // Reset scroll for seamless loop
      const halfWidth = container.scrollWidth / 2
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0
      }
    }
    animationId = requestAnimationFrame(scroll)
  }
  animationId = requestAnimationFrame(scroll)
}

const handleMouseEnter = () => {
  isPaused = true
}

const handleMouseLeave = () => {
  isPaused = false
}

const goToDetail = (productId) => {
  router.push(`/products/${productId}`)
}

onMounted(() => {
  startScroll()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <section id="products" class="py-16 bg-surface overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12 section-reveal">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Products</span>
        <h2 class="text-4xl font-bold text-primary mt-3 mb-4">核心产品线</h2>
        <p class="text-muted max-w-2xl mx-auto">Industrial-grade laser cutting solutions for precision manufacturing</p>
      </div>
    </div>

    <!-- Scrolling Banner -->
    <div
      ref="scrollContainer"
      class="flex gap-6 overflow-x-hidden py-4"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-for="(product, index) in allProducts"
        :key="index"
        class="flex-shrink-0 cursor-pointer group"
        @click="goToDetail(product.id)"
      >
        <div class="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1" style="width: 320px; height: 200px;">
          <img
            :src="product.src"
            :alt="`Product ${product.id}`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span class="text-white font-semibold text-sm flex items-center gap-2">
              View Details
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Cards Grid (below the scroll) -->
    <div class="max-w-7xl mx-auto px-6 mt-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          @click="goToDetail(product.id)"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden bg-slate-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute top-4 left-4 flex gap-2">
              <span v-if="product.badge" class="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                {{ product.badge }}
              </span>
            </div>
            <div class="absolute bottom-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                {{ product.powerRange }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="text-accent text-sm font-semibold mb-2">{{ product.series }} Series</div>
            <h3 class="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-muted text-sm mb-4 line-clamp-2">{{ product.description }}</p>

            <div class="flex items-center justify-between pt-4 border-t border-border">
              <span class="text-accent font-semibold text-sm inline-flex items-center gap-2">
                View Details
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
              <a href="#contact" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold" @click.stop>
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
