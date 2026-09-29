<script setup>
import { RouterView } from 'vue-router'
import ChatWidget from './components/ChatWidget.vue'
import { SHOW_AI_CHAT } from './config/features.js'
</script>

<template>
  <RouterView />
  <ChatWidget v-if="SHOW_AI_CHAT" />
</template>
