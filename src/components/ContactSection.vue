<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
const QUOTE_API = import.meta.env.VITE_QUOTE_API_URL || '/api/quote'

const countries = [
  'United States', 'Germany', 'United Kingdom', 'France', 'Japan',
  'Canada', 'Australia', 'Brazil', 'India', 'Russia', 'Mexico',
  'Vietnam', 'Thailand', 'Indonesia', 'Turkey', 'Poland', 'Other'
]

const productOptions = [
  'SEG-T120 / T120Q Tube Laser',
  'SEG-T160 Tube Laser',
  'SEG-T240 Heavy Tube Laser',
  'SEG-T130Y Offside',
  'SEG-T100M No-CAD',
  'SEG-100MZ Compact',
  'SEG-2513 Sheet Laser',
  'SEG-3015 Sheet Laser',
  'Other / Not sure'
]

const budgetOptions = [
  '',
  'Under $10,000',
  '$10,000 – $30,000',
  '$30,000 – $60,000',
  '$60,000 – $100,000',
  'Over $100,000',
  'Prefer not to say'
]

const form = reactive({
  company: '',
  contactName: '',
  phone: '',
  email: '',
  country: '',
  products: [],
  quantity: '',
  budget: '',
  message: ''
})

const submitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const quoteId = ref('')
const turnstileWidgetId = ref(null)
const turnstileToken = ref('')
const turnstileReady = ref(false)
const turnstileEl = ref(null)

let turnstileScript = null

const loadTurnstile = () =>
  new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile)
      return
    }
    turnstileScript = document.createElement('script')
    turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    turnstileScript.async = true
    turnstileScript.onload = () => resolve(window.turnstile)
    turnstileScript.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(turnstileScript)
  })

const renderTurnstile = async () => {
  if (!TURNSTILE_SITE_KEY || !turnstileEl.value) return
  try {
    const turnstile = await loadTurnstile()
    await nextTick()
    if (turnstileWidgetId.value != null) {
      turnstile.remove(turnstileWidgetId.value)
    }
    turnstileWidgetId.value = turnstile.render(turnstileEl.value, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'light',
      callback: (token) => {
        turnstileToken.value = token
        turnstileReady.value = true
      },
      'expired-callback': () => {
        turnstileToken.value = ''
        turnstileReady.value = false
      },
      'error-callback': () => {
        turnstileToken.value = ''
        turnstileReady.value = false
      }
    })
  } catch (e) {
    console.error(e)
    submitError.value = 'Security check failed to load. Please refresh the page.'
  }
}

const resetTurnstile = () => {
  turnstileToken.value = ''
  turnstileReady.value = false
  if (window.turnstile && turnstileWidgetId.value != null) {
    window.turnstile.reset(turnstileWidgetId.value)
  }
}

const resetForm = () => {
  form.company = ''
  form.contactName = ''
  form.phone = ''
  form.email = ''
  form.country = ''
  form.products = []
  form.quantity = ''
  form.budget = ''
  form.message = ''
  resetTurnstile()
}

const submitForm = async () => {
  submitError.value = ''
  if (!form.products.length) {
    submitError.value = 'Please select at least one product.'
    return
  }
  if (TURNSTILE_SITE_KEY && !turnstileToken.value) {
    submitError.value = 'Please complete the human verification.'
    return
  }

  submitting.value = true
  try {
    const res = await fetch(QUOTE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        turnstileToken: turnstileToken.value,
        source: 'website-contact'
      })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok) {
      throw new Error(data.error || `Submit failed (${res.status})`)
    }
    quoteId.value = data.id || ''
    submitSuccess.value = true
    resetForm()
  } catch (err) {
    submitError.value = err.message || 'Submit failed. Please try again.'
    resetTurnstile()
  } finally {
    submitting.value = false
  }
}

const submitAnother = () => {
  submitSuccess.value = false
  quoteId.value = ''
  nextTick(() => renderTurnstile())
}

onMounted(() => {
  renderTurnstile()
})

onBeforeUnmount(() => {
  if (window.turnstile && turnstileWidgetId.value != null) {
    try {
      window.turnstile.remove(turnstileWidgetId.value)
    } catch {
      /* ignore */
    }
  }
})
</script>

<template>
  <section id="contact" class="py-16 bg-primary" style="scroll-margin-top: 80px;" aria-labelledby="contact-heading">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Contact Us</span>
        <h2 id="contact-heading" class="text-4xl font-bold text-white mt-3">获取报价</h2>
        <p class="text-white/60 mt-3">24小时内回复 · 专业团队对接</p>
      </div>

      <!-- Success panel -->
      <div v-if="submitSuccess" class="bg-white rounded-2xl p-10 shadow-2xl text-center">
        <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-primary mb-3">报价请求已收到</h3>
        <p class="text-muted mb-2">Thank you! Our sales team will contact you within <strong>24 hours</strong>.</p>
        <p v-if="quoteId" class="text-sm text-slate-500 mb-6">Reference ID: <code class="bg-slate-100 px-2 py-1 rounded">{{ quoteId }}</code></p>
        <p class="text-sm text-muted mb-8">A confirmation email has been sent to your inbox (if configured).</p>
        <button type="button" class="btn-primary px-6 py-3 rounded-lg text-white font-semibold" @click="submitAnother">
          Submit another inquiry
        </button>
      </div>

      <!-- Quote form -->
      <form v-else @submit.prevent="submitForm" class="bg-white rounded-2xl p-8 shadow-2xl">
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Company *</label>
            <input v-model="form.company" type="text" required maxlength="120" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="Company name" autocomplete="organization">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Contact Name *</label>
            <input v-model="form.contactName" type="text" required maxlength="80" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="Your name" autocomplete="name">
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Phone / WhatsApp *</label>
            <input v-model="form.phone" type="tel" required maxlength="40" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="+86 138 0000 0000" autocomplete="tel">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
            <input v-model="form.email" type="email" required maxlength="120" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="your@email.com" autocomplete="email">
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Country</label>
            <select v-model="form.country" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all bg-white">
              <option value="">Select Country</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
            <input v-model="form.quantity" type="text" maxlength="40" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" placeholder="e.g. 1–2 sets">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Budget</label>
            <select v-model="form.budget" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all bg-white">
              <option v-for="b in budgetOptions" :key="b || 'empty'" :value="b">{{ b || 'Select budget' }}</option>
            </select>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-3">Product Interest *</label>
          <div class="flex flex-wrap gap-3">
            <label v-for="p in productOptions" :key="p" class="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg border border-border">
              <input type="checkbox" :value="p" v-model="form.products" class="w-4 h-4 rounded border-border text-accent focus:ring-accent">
              <span class="text-slate-700 text-sm">{{ p }}</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-700 mb-2">Requirements *</label>
          <textarea v-model="form.message" rows="4" required maxlength="5000" class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none" placeholder="Tube size, material, thickness, power preference, delivery country..."></textarea>
        </div>

        <div v-if="TURNSTILE_SITE_KEY" class="mb-6 flex justify-center">
          <div ref="turnstileEl"></div>
        </div>
        <p v-else class="mb-4 text-xs text-amber-600 text-center">
          Turnstile site key not set — add <code>VITE_TURNSTILE_SITE_KEY</code> before production.
        </p>

        <div v-if="submitError" class="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
          {{ submitError }}
        </div>

        <button
          type="submit"
          class="w-full btn-primary py-4 rounded-lg text-white font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="submitting"
        >
          {{ submitting ? 'Submitting...' : 'SUBMIT QUOTE REQUEST' }}
        </button>

        <div class="flex items-center justify-center gap-2 mt-4 text-muted text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          Protected by Cloudflare Turnstile · Your information is confidential
        </div>
      </form>
    </div>
  </section>
</template>
