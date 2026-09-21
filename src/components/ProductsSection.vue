<script setup>
import ProductCard from './ProductCard.vue'
import { products } from '../data/products.js'

const sectionTitle = {
  title: 'Our Products',
  subtitle: 'Core Product Line',
  desc: 'Industrial-grade laser cutting solutions for precision manufacturing'
}
</script>

<template>
  <section id="products" class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 section-reveal">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">{{ sectionTitle.title }}</span>
        <h2 class="text-4xl font-bold text-primary mt-3 mb-4">{{ sectionTitle.subtitle }}</h2>
        <p class="text-muted max-w-2xl mx-auto">{{ sectionTitle.desc }}</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
