<script setup>
const sectionTitle = {
  title: 'Process',
  subtitle: 'Service Process'
}

const processSteps = [
  { num: '01', title: 'Inquiry', desc: 'Send inquiry' },
  { num: '02', title: 'Design', desc: 'Solution design' },
  { num: '03', title: 'Produce', desc: 'Manufacturing' },
  { num: '04', title: 'Delivery', desc: 'Delivery & install' }
]
</script>

<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 section-reveal">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">{{ sectionTitle.title }}</span>
        <h2 class="text-4xl font-bold text-primary mt-3 mb-4">{{ sectionTitle.subtitle }}</h2>
      </div>

      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="step in processSteps" :key="step.num" class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold">{{ step.num }}</div>
          <h3 class="font-bold text-primary mb-2">{{ step.title }}</h3>
          <p class="text-muted text-sm">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
