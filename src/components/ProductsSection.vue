<script setup>
const products = [
  {
    name: 'Fiber Laser Cutter',
    desc: '薄板高速切割 · 0.1mm 精度',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    badge: 'BESTSELLER',
    tags: ['1500W-6000W', 'CE Certified']
  },
  {
    name: 'CO2 Laser Cutter',
    desc: '厚板精细加工 · 有机材料',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80',
    badge: null,
    tags: ['100W-300W', 'High Precision']
  },
  {
    name: 'Tube Laser Cutter',
    desc: '管材专用 · 圆管方管',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    badge: 'NEW',
    tags: ['1500W-4000W', 'Auto Feed']
  },
  {
    name: 'Handheld Welder',
    desc: '便携手持 · 多材料焊接',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    badge: null,
    tags: ['1000W-3000W', 'Portable']
  },
  {
    name: 'Automatic Feeder',
    desc: '全自动上料系统 · 提效 50%',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80',
    badge: null,
    tags: ['Smart Control', 'Auto']
  },
  {
    name: 'Welding System',
    desc: '焊接工作站 · 自动化集成',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&q=80',
    badge: null,
    tags: ['Robot Ready', 'Industrial']
  }
]

const sectionTitle = {
  title: 'Our Products',
  subtitle: '核心产品线',
  desc: 'Industrial-grade laser cutting solutions for precision manufacturing'
}
</script>

<template>
  <section id="products" class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 section-reveal">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">{{ sectionTitle.title }}</span>
        <h2 class="text-4xl font-bold text-primary mt-3 mb-4">{{ sectionTitle.subtitle }}</h2>
        <p class="text-muted max-w-2xl mx-auto">{{ sectionTitle.desc }}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.name" class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-border">
          <div class="relative h-56 overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
            <div v-if="product.badge" class="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              {{ product.badge }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-primary mb-2">{{ product.name }}</h3>
            <p class="text-muted text-sm mb-4">{{ product.desc }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in product.tags" :key="tag" class="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{{ tag }}</span>
            </div>
            <a href="#contact" class="text-accent font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
              Get Details
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
