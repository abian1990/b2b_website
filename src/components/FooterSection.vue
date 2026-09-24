<script setup>
defineProps({
  config: Object
})

const footerProducts = [
  { label: 'AORE V12 High-Speed Tube', id: 'aore-v12' },
  { label: 'SEG-T120 / T160 Tube Laser', id: 'seg-t160' },
  { label: 'SEG-T130Y Offside', id: 'seg-t130y' },
  { label: 'SEG-T100M No-CAD', id: 'seg-t100m' },
  { label: 'SEG-2513 / 3015 Sheet Laser', id: 'seg-2513' }
]
const footerSupport = ['Download Catalog', 'FAQ', 'Warranty', 'Spare Parts']

const socials = [
  {
    name: 'LinkedIn',
    icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'
  },
  {
    name: 'Twitter',
    icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'
  },
  {
    name: 'Facebook',
    icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
  }
]
</script>

<template>
  <footer class="bg-dark py-16 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img :src="config.logo" :alt="`${config.companyName} logo`" class="h-8">
            <span class="text-white font-bold text-xl">{{ config.companyName }}</span>
          </div>
          <p class="text-white/60 text-sm">{{ config.footerDesc }}</p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Products</h4>
          <ul class="space-y-2">
            <li v-for="p in footerProducts" :key="p.id">
              <router-link :to="{ name: 'Product', params: { id: p.id } }" class="text-white/60 hover:text-accent transition-colors text-sm">{{ p.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li v-for="s in footerSupport" :key="s">
              <a href="#" class="text-white/60 hover:text-accent transition-colors text-sm">{{ s }}</a>
            </li>
          </ul>
        </div> -->

        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <ul class="space-y-2 text-sm">
            <li class="text-white/60">📧 {{ config.contactEmail }}</li>
            <!-- <li class="text-white/60">📞 {{ config.contactPhone }}</li> -->
            <li class="text-white/60">📍 {{ config.contactAddress }}</li>
          </ul>
          <!-- <div class="flex gap-4 mt-4">
            <a v-for="social in socials" :key="social.name" href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path :d="social.icon"/></svg>
            </a>
          </div> -->
        </div>
      </div>

      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/40 text-sm">© {{ new Date().getFullYear() }} {{ config.companyName }}. All Rights Reserved.</p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="text-white/40 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="text-white/40 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating CTA -->
  <div class="fixed bottom-6 right-6 z-50">
    <a href="#contact" class="btn-primary flex items-center gap-2 px-6 py-3 rounded-full shadow-lg">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <span class="text-white font-semibold">Inquiry</span>
    </a>
  </div>
</template>
