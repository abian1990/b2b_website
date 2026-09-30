<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getShowcaseProducts } from '../data/products.js'

const products = computed(() => getShowcaseProducts())

const lightbox = ref(null)

const openLightbox = (product) => {
  lightbox.value = product
}

const closeLightbox = () => {
  lightbox.value = null
}

const onKeydown = (e) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="products" class="py-16 bg-surface" style="scroll-margin-top: 80px;" aria-labelledby="products-heading">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Our Products</span>
        <h2 id="products-heading" class="text-3xl md:text-4xl font-bold text-primary mt-3">Core Product Line</h2>
        <p class="text-muted mt-3">Tube & sheet fiber laser cutting machines · SEG Series</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6 lg:gap-8">
        <article
          v-for="product in products"
          :key="product.id"
          class="group bg-white border border-border overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        >
          <button
            type="button"
            class="relative block w-full aspect-[4/3] bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            :aria-label="`Enlarge ${product.showcaseName || product.name}`"
            @click="openLightbox(product)"
          >
            <img
              :src="product.image"
              :alt="product.showcaseName || product.name"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-contain p-6 md:p-8 transition-transform duration-500 group-hover:scale-[1.03]"
            >
            <span
              v-if="product.showcaseBadge || product.badge"
              class="absolute top-4 left-4 bg-primary/90 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1"
            >
              {{ product.showcaseBadge || product.badge }}
            </span>
            <span
              class="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/95 border border-border text-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-hidden="true"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </span>
          </button>

          <div class="px-5 py-5 border-t border-border">
            <p class="text-accent text-xs font-semibold uppercase tracking-wider mb-1.5">
              {{ product.series }} · {{ product.powerRange }}
            </p>
            <h3 class="text-lg font-bold text-primary leading-snug mb-3">
              {{ product.showcaseName || product.name }}
            </h3>
            <div class="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
              <div
                v-for="spec in product.keySpecs.slice(0, 3)"
                :key="spec.label"
                class="text-sm"
              >
                <span class="text-muted">{{ spec.label }}</span>
                <span class="text-primary font-semibold ml-1">{{ spec.value }}</span>
              </div>
            </div>
            <router-link
              :to="{ name: 'Product', params: { id: product.id } }"
              class="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              View Details
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </router-link>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="lightbox.showcaseName || lightbox.name"
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

        <div class="max-w-5xl w-full flex flex-col items-center gap-4" @click.stop>
          <img
            :src="lightbox.image"
            :alt="lightbox.showcaseName || lightbox.name"
            class="max-w-full max-h-[75vh] object-contain bg-white rounded-lg shadow-2xl p-4 md:p-8"
          >
          <div class="text-center">
            <p class="text-white font-semibold text-lg">{{ lightbox.showcaseName || lightbox.name }}</p>
            <router-link
              :to="{ name: 'Product', params: { id: lightbox.id } }"
              class="inline-flex items-center gap-2 mt-2 text-sm text-accent hover:underline"
              @click="closeLightbox"
            >
              View product details
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
