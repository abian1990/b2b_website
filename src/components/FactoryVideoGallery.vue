<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { factoryVideos } from '../data/factoryVideos.js'

const videos = factoryVideos
const activeId = ref(videos[0]?.id || '')
const isPlaying = ref(false)
const hasStarted = ref(false)
const videoEl = ref(null)
const sectionEl = ref(null)

const activeVideo = computed(
  () => videos.find((v) => v.id === activeId.value) || videos[0]
)

let inView = false
let observer = null

const unloadVideo = () => {
  const el = videoEl.value
  if (!el) return
  el.pause()
  el.removeAttribute('src')
  el.load()
  isPlaying.value = false
}

const loadAndPlay = async () => {
  const el = videoEl.value
  const item = activeVideo.value
  if (!el || !item) return

  hasStarted.value = true
  if (el.getAttribute('src') !== item.src) {
    el.src = item.src
    el.load()
  }
  try {
    await el.play()
    isPlaying.value = true
  } catch {
    isPlaying.value = false
  }
}

const selectVideo = async (id) => {
  if (id === activeId.value && hasStarted.value) {
    const el = videoEl.value
    if (el?.paused) await loadAndPlay()
    else {
      el?.pause()
      isPlaying.value = false
    }
    return
  }
  activeId.value = id
  hasStarted.value = false
  isPlaying.value = false
  await nextTick()
  unloadVideo()
  await loadAndPlay()
}

const onPlayClick = () => {
  if (isPlaying.value) {
    videoEl.value?.pause()
    isPlaying.value = false
  } else {
    loadAndPlay()
  }
}

const onEnded = () => {
  isPlaying.value = false
}

watch(activeId, () => {
  hasStarted.value = false
})

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting
      if (!inView && videoEl.value && !videoEl.value.paused) {
        videoEl.value.pause()
        isPlaying.value = false
      }
    },
    { rootMargin: '80px', threshold: 0.15 }
  )
  if (sectionEl.value) observer.observe(sectionEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
  unloadVideo()
})
</script>

<template>
  <div v-if="videos.length" ref="sectionEl" class="bg-primary py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <span class="text-accent font-semibold text-sm tracking-wider uppercase">Factory Tour</span>
          <h3 class="text-2xl md:text-3xl font-bold text-white mt-2">See Our Production Live</h3>
          <p class="text-white/60 mt-2 text-sm md:text-base max-w-xl">
            Walk through the workshop, assembly, and inspection — more clips coming soon.
          </p>
        </div>
        <p class="text-white/40 text-xs md:text-sm shrink-0">
          {{ videos.length }} video{{ videos.length > 1 ? 's' : '' }} · plays on demand
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-6 items-start">
        <!-- Featured player: single <video>, src only after user plays -->
        <div class="lg:col-span-8">
          <div class="relative aspect-video bg-black overflow-hidden group">
            <img
              v-show="!hasStarted"
              :src="activeVideo.poster"
              :alt="activeVideo.title"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            >
            <video
              ref="videoEl"
              class="absolute inset-0 w-full h-full object-contain bg-black"
              :class="hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              playsinline
              preload="none"
              controls
              :poster="activeVideo.poster"
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @ended="onEnded"
            />

            <button
              v-if="!isPlaying"
              type="button"
              class="absolute inset-0 z-10 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors"
              :aria-label="`Play ${activeVideo.title}`"
              @click="onPlayClick"
            >
              <span class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
            </button>

            <div class="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-[5]">
              <span class="text-accent text-xs font-semibold uppercase tracking-wider">{{ activeVideo.subtitle }}</span>
              <h4 class="text-white text-lg md:text-xl font-bold mt-0.5">{{ activeVideo.title }}</h4>
            </div>
          </div>
        </div>

        <!-- Playlist: posters only — no video elements -->
        <div class="lg:col-span-4">
          <div
            class="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:max-h-[min(56vh,420px)] lg:overflow-y-auto pb-1 lg:pr-1"
            style="-webkit-overflow-scrolling: touch;"
          >
            <button
              v-for="clip in videos"
              :key="clip.id"
              type="button"
              class="flex-shrink-0 w-[72%] sm:w-[45%] lg:w-full text-left group/item border transition-colors"
              :class="clip.id === activeId
                ? 'border-accent bg-white/10'
                : 'border-white/10 bg-white/5 hover:border-white/30'"
              @click="selectVideo(clip.id)"
            >
              <div class="flex gap-3 p-2">
                <div class="relative w-28 aspect-video shrink-0 overflow-hidden bg-black/40">
                  <img
                    :src="clip.poster"
                    :alt="clip.title"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover"
                  >
                  <span class="absolute inset-0 flex items-center justify-center">
                    <span class="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </span>
                </div>
                <div class="min-w-0 py-1 pr-1">
                  <div class="text-accent text-[10px] font-semibold uppercase tracking-wider truncate">{{ clip.subtitle }}</div>
                  <div class="text-white text-sm font-semibold mt-0.5 line-clamp-2">{{ clip.title }}</div>
                  <div v-if="clip.id === activeId && isPlaying" class="text-accent/80 text-[10px] mt-1">Playing</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
