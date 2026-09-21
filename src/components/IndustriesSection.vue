<script setup>
const industries = [
  { name: 'Building & Sanitary', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Automotive', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { name: 'Grain Machinery', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { name: 'Fitness Equipment', icon: 'M4 8h16M4 16h16M8 4v16M16 4v16' },
  { name: 'Furniture', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { name: 'Sheet Metal', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'Signage', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
]
</script>

<template>
  <section class="py-16 bg-surface" style="scroll-margin-top: 80px;">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-10">
        <span class="text-accent font-semibold text-sm tracking-wider uppercase">Industries</span>
        <h2 class="text-4xl font-bold text-primary mt-3">Industries We Serve</h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div v-for="industry in industries" :key="industry.name" class="bg-white border border-border p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
          <div class="w-10 h-10 mx-auto mb-2 bg-slate-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="industry.icon"/>
            </svg>
          </div>
          <span class="text-xs font-medium text-slate-700">{{ industry.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
