<script setup>
const sectionTitle = {
  title: 'Our Factory',
  subtitle: '智造实力'
}

const factoryImages = [
  {
    title: '30000㎡ 生产基地',
    subtitle: '中国 · 江苏',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80'
  },
  {
    title: '50+ 研发工程师',
    subtitle: '持续技术创新',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'
  }
]

const certifications = {
  title: '国际认证 · International Certifications',
  items: ['CE', 'FDA', 'ISO 9001', 'RoHS', 'SGS', 'TUV']
}
</script>

<template>
  <section id="factory" class="py-24 bg-dark">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 section-reveal">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">{{ sectionTitle.title }}</span>
        <h2 class="text-4xl font-bold text-white mt-3 mb-4">{{ sectionTitle.subtitle }}</h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 mb-12">
        <div v-for="item in factoryImages" :key="item.title" class="relative rounded-2xl overflow-hidden">
          <img :src="item.image" :alt="item.title" class="w-full h-80 object-cover">
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
            <h3 class="text-white font-bold text-xl">{{ item.title }}</h3>
            <p class="text-white/70">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h3 class="text-white font-bold text-xl mb-6 text-center">{{ certifications.title }}</h3>
        <div class="flex flex-wrap justify-center gap-6">
          <div v-for="cert in certifications.items" :key="cert" class="bg-white rounded-lg px-6 py-3 font-bold text-slate-700">{{ cert }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
