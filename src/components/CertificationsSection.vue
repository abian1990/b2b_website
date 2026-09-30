<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import certificationsImg from '../assets/certifications.webp'

const open = ref(false)

const openLightbox = () => {
  // open.value = true
}

const closeLightbox = () => {
  open.value = false
}

const onKeydown = (e) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="certifications" class="py-16 bg-white" style="scroll-margin-top: 80px;" aria-labelledby="certifications-heading">
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Trust</span>
        <h2 id="certifications-heading" class="text-3xl md:text-4xl font-bold text-primary mt-3">Certifications</h2>
        <p class="text-muted mt-3">CE · FDA · RoHS · patents — compliance and IP for global buyers</p>
      </div>

      <button
        type="button"
        class="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
        aria-label="View certifications full size"
        @click="openLightbox"
      >
        <img
          :src="certificationsImg"
          alt="ZZSKY certifications: CE, FDA, RoHS, and patent certificates"
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          class="w-full h-auto rounded-xl border border-border shadow-sm group-hover:shadow-md transition-shadow"
        >
      </button>
      <!-- <p class="text-center text-xs text-muted mt-3">Click to enlarge</p> -->
    </div>

    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Certifications enlarged"
        @click="closeLightbox"
      >
        <button
          type="button"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
          aria-label="Close"
          @click="closeLightbox"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img
          :src="certificationsImg"
          alt="ZZSKY certifications enlarged"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        >
      </div>
    </Teleport>
  </section>
</template>
