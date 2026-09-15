<script setup>
import ProductDetail from '../components/ProductDetail.vue'
import { getProductById } from '../data/products.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = getProductById(route.params.id)
</script>

<template>
  <div v-if="product">
    <ProductDetail :product="product" />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
      <router-link to="/" class="text-accent hover:underline">Back to Home</router-link>
    </div>
  </div>
</template>
