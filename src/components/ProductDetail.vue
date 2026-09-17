<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const modelNames = computed(() => {
  if (!props.product.specsTable || !props.product.specsTable.length) return []
  return Object.keys(props.product.specsTable[0].values)
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  country: '',
  message: ''
})

const submitForm = () => {
  alert('Quote request submitted! We will contact you within 24 hours.')
}

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
  <div class="min-h-screen bg-surface pt-20">
    <!-- Hero Image -->
    <div class="relative" style="height: 60vh; min-height: 400px;">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>

      <!-- Content overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {{ product.series }} Series
            </span>
            <span class="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {{ getSeriesBadge(product.series) }}
            </span>
            <span class="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {{ product.powerRange }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ product.name }}</h1>
          <p class="text-white/80 text-lg max-w-2xl">{{ product.description }}</p>
        </div>
      </div>

      <!-- Back button -->
      <a href="/" class="absolute top-6 left-6 flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
    </div>

    <!-- Product Info Cards -->
    <div class="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div v-for="spec in product.keySpecs" :key="spec.label" class="bg-white rounded-xl p-5 shadow-lg">
          <div class="text-muted text-sm mb-1">{{ spec.label }}</div>
          <div class="text-xl font-bold text-primary">{{ spec.value }}</div>
        </div>
      </div>

      <!-- Features -->
      <div class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-6">Key Features</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="feature in product.features"
            :key="feature"
            class="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ feature }}
          </span>
        </div>
      </div>

      <!-- Configuration: Standard vs Optional -->
      <div v-if="product.standardConfig" class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-8 border-t-4 border-accent">
          <h2 class="text-xl font-bold text-primary mb-5 flex items-center gap-2">
            <span class="w-2 h-2 bg-accent rounded-full"></span>
            Standard Configuration
          </h2>
          <ul class="space-y-3">
            <li v-for="item in product.standardConfig" :key="item" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-slate-700">{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl p-8 border-t-4 border-secondary">
          <h2 class="text-xl font-bold text-primary mb-5 flex items-center gap-2">
            <span class="w-2 h-2 bg-secondary rounded-full"></span>
            Optional Configuration
          </h2>
          <ul class="space-y-3">
            <li v-for="item in product.optionalConfig" :key="item" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-slate-700">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Technical Specifications Table -->
      <div v-if="product.specsTable && product.specsTable.length" class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-2">Technical Specifications</h2>
        <p class="text-muted text-sm mb-6">All dimensions in millimeters unless otherwise noted. Subject to change without notice.</p>
        <div class="overflow-x-auto -mx-2 px-2">
          <table class="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr class="bg-primary text-white">
                <th class="text-left font-semibold px-4 py-3 rounded-l-lg">Parameter</th>
                <th v-for="model in modelNames" :key="model" class="text-center font-semibold px-4 py-3">{{ model }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in product.specsTable"
                :key="row.parameter"
                :class="idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'"
              >
                <td class="px-4 py-3 font-medium text-primary border-b border-border">{{ row.parameter }}</td>
                <td
                  v-for="model in modelNames"
                  :key="model"
                  class="px-4 py-3 text-center text-slate-700 border-b border-border tabular-nums"
                >{{ row.values[model] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Models -->
      <div class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-6">Available Models</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div v-for="model in product.models" :key="model.name" class="bg-slate-50 rounded-xl p-5 text-center">
            <div class="text-xl font-bold text-primary mb-1">{{ model.name }}</div>
            <div class="text-muted">{{ model.power }}</div>
          </div>
        </div>
      </div>

      <!-- Feature Details -->
      <div v-if="product.featureDetails && product.featureDetails.length" class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-6">Why This Machine</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(feat, i) in product.featureDetails" :key="i" class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center font-bold">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div>
              <h3 class="font-semibold text-primary mb-1">{{ feat.title }}</h3>
              <p class="text-muted text-sm leading-relaxed">{{ feat.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div v-if="product.applications && product.applications.length" class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-6">Typical Applications</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="app in product.applications"
            :key="app"
            class="bg-surface text-primary border border-border px-4 py-2 rounded-lg text-sm font-medium"
          >{{ app }}</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary rounded-2xl p-8 mb-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white mb-2">Interested in this product?</h2>
          <p class="text-white/70">Contact us for a personalized quote and consultation</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#inquiry" class="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Request Quote
          </a>
          <a href="tel:+864008328321" class="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Call Now
          </a>
        </div>
      </div>

      <!-- Inquiry Form -->
      <div id="inquiry" class="bg-white rounded-2xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-primary mb-6">Get a Quote</h2>
        <form @submit.prevent="submitForm" class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Name *</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none" placeholder="Your name">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none" placeholder="your@email.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Company</label>
            <input v-model="form.company" type="text" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none" placeholder="Company name">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Country</label>
            <select v-model="form.country" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none bg-white">
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="UK">United Kingdom</option>
              <option value="JP">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea v-model="form.message" rows="4" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none resize-none" placeholder="Tell us about your requirements..."></textarea>
          </div>
          <div class="md:col-span-2">
            <button type="submit" class="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg font-semibold text-lg transition-colors">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
