<script setup>
import { homeFaqs } from '../seo/siteMeta.js'

const faqs = homeFaqs
</script>

<template>
  <section id="faq" class="py-16 bg-white" style="scroll-margin-top: 80px;" aria-labelledby="faq-heading">
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">FAQ</span>
        <h2 id="faq-heading" class="text-3xl md:text-4xl font-bold text-primary mt-3">常见问题</h2>
        <p class="text-muted mt-3">Quick answers about ZZSKY SEG laser cutting machines</p>
      </div>

      <div class="space-y-3">
        <details
          v-for="(item, i) in faqs"
          :key="i"
          class="group border border-border rounded-xl px-5 py-4 bg-surface open:bg-white open:shadow-sm transition-all"
        >
          <summary class="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-primary">
            <span>{{ item.question }}</span>
            <svg class="w-5 h-5 flex-shrink-0 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <p class="mt-3 text-muted text-sm leading-relaxed pr-8">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
</style>
