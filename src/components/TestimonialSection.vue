<script setup>
const testimonial = {
  quote: 'ZZSKY machines improved our productivity by 40%, with cutting accuracy of ±0.01mm. Professional support gives us complete peace of mind.',
  avatar: 'TM',
  name: 'Thomas Müller',
  title: 'CTO, MetalTech GmbH (Germany)'
}
</script>

<template>
  <section class="py-24 bg-surface">
    <div class="max-w-4xl mx-auto px-6 text-center section-reveal">
      <div class="text-accent text-6xl mb-6">"</div>
      <blockquote class="text-2xl md:text-3xl font-medium text-primary leading-relaxed mb-8">
        {{ testimonial.quote }}
      </blockquote>
      <div class="flex items-center justify-center gap-4">
        <div class="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">{{ testimonial.avatar }}</div>
        <div class="text-left">
          <div class="font-bold text-primary">{{ testimonial.name }}</div>
          <div class="text-muted">{{ testimonial.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
