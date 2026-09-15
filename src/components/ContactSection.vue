<script setup>
import { ref, reactive } from 'vue'

const sectionTitle = {
  title: 'Contact Us',
  subtitle: '获取报价',
  desc: '24小时内回复 · 专业团队对接'
}

const countries = [
  'United States', 'Germany', 'United Kingdom', 'France', 'Japan',
  'Canada', 'Australia', 'Brazil', 'India', 'Russia', 'Other...'
]

const productOptions = [
  'Fiber Laser Cutter', 'CO2 Laser Cutter', 'Tube Laser Cutter', 'Handheld Welder'
]

const form = reactive({
  name: '',
  email: '',
  company: '',
  country: '',
  products: [],
  message: ''
})

const submitBtnText = ref('SUBMIT INQUIRY')
const submitSuccess = ref(false)
const successMessage = 'Thank you! We will contact you within 24 hours.'

const submitForm = () => {
  submitBtnText.value = 'Submitting...'
  setTimeout(() => {
    submitSuccess.value = true
    submitBtnText.value = 'SUBMIT INQUIRY'
    form.name = ''
    form.email = ''
    form.company = ''
    form.country = ''
    form.products = []
    form.message = ''
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  }, 1500)
}
</script>

<template>
  <section id="contact" class="py-16 bg-primary">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Contact Us</span>
        <h2 class="text-4xl font-bold text-white mt-3">获取报价</h2>
        <p class="text-white/60 mt-3">24小时内回复 · 专业团队对接</p>
      </div>

      <form @submit.prevent="submitForm" class="bg-white rounded-2xl p-8 shadow-2xl">
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Name *</label>
            <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="Your name" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
            <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="your@email.com" required>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Company</label>
            <input v-model="form.company" type="text" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="Company name">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Country</label>
            <select v-model="form.country" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all bg-white">
              <option value="">Select Country</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-3">Product Interest *</label>
          <div class="flex flex-wrap gap-4">
            <label v-for="p in productOptions" :key="p" class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" :value="p" v-model="form.products" class="w-5 h-5 rounded border-border text-accent focus:ring-accent">
              <span class="text-slate-600">{{ p }}</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-2">Message</label>
          <textarea v-model="form.message" rows="4" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your requirements..."></textarea>
        </div>

        <button type="submit" class="w-full btn-primary py-4 rounded-lg text-white font-semibold text-lg">
          {{ submitBtnText }}
        </button>

        <div v-if="submitSuccess" class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          {{ successMessage }}
        </div>

        <div class="flex items-center justify-center gap-2 mt-4 text-muted text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          Your information is secure & confidential
        </div>
      </form>
    </div>
  </section>
</template>
