<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const activeTab = ref('specs')
const selectedModel = ref(props.product.models[0]?.name || '')
const form = reactive({
  name: '',
  email: '',
  company: '',
  country: '',
  message: `I'm interested in ${props.product.name} (${selectedModel.value}). `
})

const tabs = [
  { id: 'specs', label: 'Specifications' },
  { id: 'features', label: 'Features' },
  { id: 'applications', label: 'Applications' }
]

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

const submitForm = () => {
  alert('Quote request submitted! We will contact you within 24 hours.')
}
</script>

<template>
  <div class="min-h-screen bg-surface pt-24 pb-16">
    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-6 mb-8">
      <nav class="flex items-center gap-2 text-sm">
        <a href="/" class="text-muted hover:text-accent">Home</a>
        <span class="text-muted">/</span>
        <a href="/products" class="text-muted hover:text-accent">Products</a>
        <span class="text-muted">/</span>
        <span class="text-primary font-medium">{{ product.name }}</span>
      </nav>
    </div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            >
            <div class="absolute top-4 left-4 flex gap-2">
              <span class="bg-accent text-white text-sm font-bold px-4 py-2 rounded-full">
                {{ product.series }} Series
              </span>
              <span class="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">
                {{ getSeriesBadge(product.series) }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(img, idx) in product.gallery"
              :key="idx"
              class="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all"
            >
              <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="text-accent font-semibold mb-2">{{ product.category }}</div>
          <h1 class="text-3xl md:text-4xl font-bold text-primary mb-4">{{ product.name }}</h1>
          <p class="text-lg text-muted mb-6">{{ product.description }}</p>

          <!-- Model Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-slate-700 mb-3">Select Model</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="model in product.models"
                :key="model.name"
                @click="selectedModel = model.name"
                :class="[
                  'px-4 py-3 rounded-lg border-2 text-center transition-all',
                  selectedModel === model.name
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-white text-slate-700 hover:border-accent/50'
                ]"
              >
                <div class="font-semibold text-sm">{{ model.name }}</div>
                <div class="text-xs text-muted mt-1">{{ model.power }}</div>
              </button>
            </div>
          </div>

          <!-- Key Features Pills -->
          <div class="flex flex-wrap gap-2 mb-8">
            <span
              v-for="feature in product.features"
              :key="feature"
              class="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm flex items-center gap-2"
            >
              <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feature }}
            </span>
          </div>

          <!-- Quick Specs -->
          <div class="bg-primary rounded-2xl p-6 mb-8">
            <h3 class="text-white font-bold mb-4">Quick Specs</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="spec in product.keySpecs" :key="spec.label">
                <div class="text-white/60 text-sm">{{ spec.label }}</div>
                <div class="text-white font-semibold">{{ spec.value }}</div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="flex flex-wrap gap-4">
            <a href="#inquiry" class="btn-primary px-8 py-4 rounded-lg text-white font-semibold text-lg flex-1 text-center">
              Request Quote
            </a>
            <a href="tel:+864008328321" class="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-white transition-all">
              Call Now
            </a>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="mt-16">
        <div class="flex border-b border-border">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 font-semibold transition-all',
              activeTab === tab.id
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted hover:text-primary'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="py-8">
          <!-- Specifications Tab -->
          <div v-show="activeTab === 'specs'">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-slate-100">
                    <th class="px-6 py-4 text-left font-semibold text-primary">Parameter</th>
                    <th
                      v-for="model in product.models"
                      :key="model.name"
                      class="px-6 py-4 text-center font-semibold text-primary"
                    >
                      {{ model.name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in product.specsTable" :key="idx" class="border-b border-border">
                    <td class="px-6 py-4 text-slate-600">{{ row.parameter }}</td>
                    <td
                      v-for="model in product.models"
                      :key="model.name"
                      class="px-6 py-4 text-center font-medium text-primary"
                    >
                      {{ row.values[model.name] || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Features Tab -->
          <div v-show="activeTab === 'features'" class="grid md:grid-cols-2 gap-6">
            <div
              v-for="feature in product.featureDetails"
              :key="feature.title"
              class="bg-white rounded-xl p-6 shadow-md border border-border"
            >
              <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="font-bold text-primary mb-2">{{ feature.title }}</h3>
              <p class="text-muted text-sm">{{ feature.description }}</p>
            </div>
          </div>

          <!-- Applications Tab -->
          <div v-show="activeTab === 'applications'">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="app in product.applications"
                :key="app"
                class="bg-white rounded-xl p-6 text-center shadow-md border border-border"
              >
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-primary">{{ app }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inquiry Form -->
      <div id="inquiry" class="mt-16 bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-primary mb-2">Request a Quote</h2>
        <p class="text-muted mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

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
            <button type="submit" class="btn-primary w-full py-4 rounded-lg text-white font-semibold text-lg">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
