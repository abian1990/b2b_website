<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import factory1 from '../assets/factory1.png'
import factory2 from '../assets/factory2.png'
import factory3 from '../assets/factory3.png'
import factory4 from '../assets/factory4.png'
import factory5 from '../assets/factory5.png'
import factory6 from '../assets/factory6.png'

const scrollContainer = ref(null)
let animationId = null
let isPaused = false

const factoryImages = [
  { src: factory1, title: 'Production Workshop', subtitle: '智能化生产车间' },
  { src: factory2, title: 'Assembly Line', subtitle: '自动化装配线' },
  { src: factory3, title: 'Quality Control', subtitle: '精密质量检测' },
  { src: factory4, title: 'R&D Center', subtitle: '研发中心' },
  { src: factory5, title: 'Warehouse', subtitle: '智能仓储系统' },
  { src: factory6, title: 'Testing Facility', subtitle: '出厂测试中心' }
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
  <section id="factory" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Factory</span>
        <h2 class="text-4xl font-bold text-primary mt-3">智造实力</h2>
        <p class="text-muted mt-3">智能化生产 · 精密制造 · 品质保障</p>
      </div>

      <!-- Factory Image Carousel -->
      <div class="mb-8">
        <div class="relative">
          <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div
            ref="scrollContainer"
            class="flex gap-4 overflow-x-hidden py-4"
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
                class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="absolute bottom-4 left-4">
                  <h4 class="text-white font-bold text-base">{{ img.title }}</h4>
                  <p class="text-white/80 text-sm">{{ img.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats & Certifications -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-slate-50 p-5">
          <h3 class="text-lg font-bold text-primary mb-4">生产规模</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-accent">50,000<span class="text-sm">㎡</span></div>
              <div class="text-muted text-sm">生产面积</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-accent">200<span class="text-sm">+</span></div>
              <div class="text-muted text-sm">生产设备</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-accent">500<span class="text-sm">+</span></div>
              <div class="text-muted text-sm">员工数量</div>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 p-5">
          <h3 class="text-lg font-bold text-primary mb-4">国际认证</h3>
          <div class="flex flex-wrap gap-2">
            <span class="bg-accent/10 text-accent px-3 py-1 font-semibold text-sm">CE</span>
            <span class="bg-accent/10 text-accent px-3 py-1 font-semibold text-sm">ISO 9001</span>
            <span class="bg-accent/10 text-accent px-3 py-1 font-semibold text-sm">SGS</span>
            <span class="bg-accent/10 text-accent px-3 py-1 font-semibold text-sm">TUV</span>
            <span class="bg-accent/10 text-accent px-3 py-1 font-semibold text-sm">FDA</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
