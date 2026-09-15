<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'
import product3 from '../assets/product3.png'
import product4 from '../assets/product4.png'
import product5 from '../assets/product5.png'
import product6 from '../assets/product6.png'

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

    <!-- Main Section: Image Scroll (3/4) + Text (1/4) -->
    <div class="flex h-[320px]">
      <!-- Left: Scrolling Images (75%) -->
      <div class="w-3/4 relative">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

        <div
          ref="scrollContainer"
          class="flex gap-4 overflow-x-hidden py-6 px-4 h-full items-center"
        >
          <div
            v-for="(product, index) in allProducts"
            :key="index"
            class="flex-shrink-0 cursor-pointer group"
            @click="goToDetail(product.id)"
          >
            <div class="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2" style="width: 280px; height: 180px;">
              <img
                :src="product.src"
                :alt="`Product ${product.id}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              >
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
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
      </div>

      <!-- Diagonal Cut Divider -->
      <div class="relative w-24 flex-shrink-0">
        <!-- Main diagonal line -->
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 96 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="diagonalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#e2e8f0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f8fafc;stop-opacity:1" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="-2" dy="0" stdDeviation="3" flood-opacity="0.15"/>
            </filter>
          </defs>
          <!-- Background fill -->
          <path d="M0 0 L96 0 L96 320 L0 320 Z" fill="url(#diagonalGrad)"/>
          <!-- Diagonal cut line with shadow -->
          <path d="M0 0 L60 0 L96 320 L36 320 Z" fill="white" filter="url(#shadow)"/>
          <!-- Accent line -->
          <path d="M56 0 L92 320" stroke="#e11d48" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Decorative dots -->
          <circle cx="60" cy="80" r="3" fill="#e11d48" opacity="0.4"/>
          <circle cx="68" cy="160" r="2" fill="#e11d48" opacity="0.3"/>
          <circle cx="64" cy="240" r="2.5" fill="#e11d48" opacity="0.35"/>
        </svg>
      </div>

      <!-- Right: Fixed Text (25%) -->
      <div class="w-1/4 flex items-center justify-center bg-surface px-6">
        <div class="text-center space-y-4">
          <div class="text-accent text-sm font-semibold tracking-wider uppercase">Precision Engineering</div>
          <h3 class="text-2xl font-bold text-primary leading-tight">Industrial Laser Solutions</h3>
          <p class="text-muted text-sm leading-relaxed">Advanced fiber laser cutting technology for sheets, tubes, and profiles</p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Get Quote
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Product Cards Grid -->
    <!-- <div class="max-w-7xl mx-auto px-6 mt-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in [
            { id: 'f-series', name: 'F Series Sheet Laser Cutter', series: 'F', badge: 'BESTSELLER', powerRange: '1.5-20kW', description: 'High-rigidity structure bed design with modular worktable for easy maintenance.' },
            { id: 's-series', name: 'S Series High-Precision Laser', series: 'S', badge: 'PREMIUM', powerRange: '1.5-12kW', description: 'EU safety standards with full protective design. Compact footprint.' },
            { id: 'gr-series', name: 'GR Series Linear Rail Cutter', series: 'GR', badge: 'HEAVY DUTY', powerRange: '6-60kW', description: 'Customizable cutting size for full sheet thick plate cutting.' },
            { id: 'tz-series', name: 'TZ Series Tube Laser Cutter', series: 'TZ', badge: 'FLAGSHIP', powerRange: '3-12kW', description: 'Four-chuck design with 2+2 processing mode for efficient workflow.' },
            { id: 'gr-h-series', name: 'GR-H All-in-One Laser', series: 'GR-H', badge: 'ALL-IN-ONE', powerRange: '12-40kW', description: 'Profiles, plates and pipes - all cut by one machine.' },
            { id: 'pgt-series', name: 'PGT Sheet & Tube Laser', series: 'PGT', badge: null, powerRange: '1.5-12kW', description: 'Integrated sheet and tube design for dual-purpose applications.' }
          ]"
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          @click="goToDetail(product.id)"
        >
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img
              :src="productImages.find(p => p.id === product.id)?.src"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute top-4 left-4 flex gap-2">
              <span v-if="product.badge" class="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                {{ product.badge }}
              </span>
            </div>
            <div class="absolute bottom-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold px-3 py-1.5 rounded-full shadow">
                {{ product.powerRange }}
              </span>
            </div>
          </div>
          <div class="p-5">
            <div class="text-accent text-sm font-semibold mb-1">{{ product.series }} Series</div>
            <h3 class="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{{ product.name }}</h3>
            <p class="text-muted text-sm line-clamp-2">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div> -->
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
