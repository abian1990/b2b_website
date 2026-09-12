<script setup>
defineProps({
  config: Object
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="config.logo" alt="Logo" class="h-8">
          <span class="text-white font-bold text-xl tracking-tight">{{ config.companyName }}</span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#products" class="text-white/80 hover:text-accent transition-colors">Products</a>
          <a href="#why-us" class="text-white/80 hover:text-accent transition-colors">Solutions</a>
          <a href="#factory" class="text-white/80 hover:text-accent transition-colors">Factory</a>
          <a href="#contact" class="text-white/80 hover:text-accent transition-colors">Contact</a>
        </div>
        <a href="#contact" class="btn-primary px-6 py-2.5 rounded-lg text-white font-semibold text-sm">
          Request Quote
        </a>
      </div>
    </div>
  </nav>
</template>
