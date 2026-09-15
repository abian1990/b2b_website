<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const getSeriesBadge = (series) => {
  const badges = {
    'S': '性能款',
    'F': '经典款',
    'FT': '经典款',
    'GR': '经典款',
    'GR-Pro': '经典款',
    'GR-C': '火焰款',
    'GR-H': '领航款',
    'FB': '性能款',
    'PGT': '经典款',
    'TZ': '旗舰款'
  }
  return badges[series] || 'Standard'
}
</script>

<template>
  <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-border group">
    <!-- Image -->
    <div class="relative h-64 overflow-hidden bg-slate-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
      <div class="absolute top-4 left-4 flex gap-2">
        <span v-if="product.badge" class="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
          {{ product.badge }}
        </span>
        <span class="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          {{ getSeriesBadge(product.series) }}
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

      <!-- Key Specs -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div v-for="spec in product.keySpecs.slice(0, 4)" :key="spec.label" class="bg-slate-50 rounded-lg p-2">
          <div class="text-xs text-muted">{{ spec.label }}</div>
          <div class="text-sm font-semibold text-primary">{{ spec.value }}</div>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="feature in product.features.slice(0, 3)"
          :key="feature"
          class="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
        >
          {{ feature }}
        </span>
      </div>

      <!-- CTA -->
      <div class="flex items-center justify-between pt-4 border-t border-border">
        <router-link
          :to="`/products/${product.id}`"
          class="text-accent font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          View Details
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
        <a href="#contact" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">
          Get Quote
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
