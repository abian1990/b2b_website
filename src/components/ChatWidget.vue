<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { siteMeta } from '../seo/siteMeta.js'

const CHAT_API = import.meta.env.VITE_CHAT_API_URL || '/api/chat'
const STORAGE_KEY = 'zzsky-chat'

const quickPrompts = [
  'Which machine fits 100mm square tube?',
  'Tube laser vs sheet laser — what do I need?',
  'Can I cut without CAD drawings?',
  'How do I get a quotation?'
]

const welcome = {
  role: 'assistant',
  local: true,
  content: `Hi! I'm the ${siteMeta.brand} laser cutting consultant. Tell me what you cut (material, tube size or sheet size, thickness) and I'll recommend the right machine.`
}

const loadState = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (saved?.sessionId && Array.isArray(saved.messages)) return saved
  } catch {
    /* ignore */
  }
  return { sessionId: crypto.randomUUID(), messages: [], leadSent: false }
}

const state = loadState()
const sessionId = state.sessionId
const messages = ref(state.messages)
const leadSent = ref(state.leadSent)
const open = ref(false)
const input = ref('')
const sending = ref(false)
const error = ref('')
const listEl = ref(null)
const inputEl = ref(null)
let controller = null

const route = useRoute()
const productId = computed(() => (route.name === 'Product' ? String(route.params.id || '') : ''))
const displayMessages = computed(() => [welcome, ...messages.value])
const showQuickPrompts = computed(() => !messages.value.some((m) => m.role === 'user'))

watch(
  [messages, leadSent],
  () => {
    const toSave = messages.value.filter((m) => m.content)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, messages: toSave, leadSent: leadSent.value }))
  },
  { deep: true }
)

const scrollToBottom = async () => {
  await nextTick()
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  await scrollToBottom()
  inputEl.value?.focus()
})

/** Split reply text so product paths become router links and emails become mailto links */
const LINK_RE = /(\/products\/[a-z0-9-]+|[^\s@]+@[^\s@]+\.[a-z]{2,})/gi
const toSegments = (text) =>
  text.split(LINK_RE).filter(Boolean).map((part) => {
    if (/^\/products\/[a-z0-9-]+$/i.test(part)) return { type: 'product', value: part }
    if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(part)) return { type: 'email', value: part }
    return { type: 'text', value: part }
  })

const readStream = async (res, reply) => {
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop()
    for (const evt of events) {
      const line = evt.trim()
      if (!line.startsWith('data:')) continue
      let data
      try {
        data = JSON.parse(line.slice(5))
      } catch {
        continue
      }
      if (data.type === 'delta') {
        reply.content += data.text
        scrollToBottom()
      } else if (data.type === 'lead') {
        leadSent.value = true
      } else if (data.type === 'error') {
        error.value = data.message
      }
    }
  }
}

const send = async (text = input.value) => {
  const content = text.trim()
  if (!content || sending.value) return
  error.value = ''
  input.value = ''
  messages.value.push({ role: 'user', content })
  messages.value.push({ role: 'assistant', content: '' })
  const reply = messages.value[messages.value.length - 1]
  sending.value = true
  scrollToBottom()

  controller = new AbortController()
  try {
    const history = messages.value.slice(0, -1).map(({ role, content: c }) => ({ role, content: c }))
    const res = await fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, productId: productId.value, sessionId }),
      signal: controller.signal
    })
    const type = res.headers.get('Content-Type') || ''
    if (!res.ok || !type.includes('text/event-stream') || !res.body) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || `Assistant service unavailable (${res.status}). Please try again later.`)
    }
    await readStream(res, reply)
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message || 'Network error. Please try again.'
    }
  } finally {
    if (!reply.content) messages.value.pop()
    sending.value = false
    controller = null
    scrollToBottom()
  }
}

const onKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault()
    send()
  }
}

const resetChat = () => {
  controller?.abort()
  messages.value = []
  leadSent.value = false
  error.value = ''
}

onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <section
        v-if="open"
        class="w-[calc(100vw-3rem)] sm:w-[380px] h-[min(600px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden origin-bottom-right"
        role="dialog"
        aria-label="AI sales assistant"
      >
        <header class="bg-primary text-white px-4 py-3 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full btn-primary flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold leading-tight">{{ siteMeta.brand }} Laser Consultant</p>
            <p class="text-xs text-white/60 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              AI assistant · Sales team replies within 24h
            </p>
          </div>
          <button
            v-if="messages.length"
            type="button"
            class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            title="New conversation"
            aria-label="New conversation"
            @click="resetChat"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            aria-label="Close chat"
            @click="open = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </header>

        <div ref="listEl" class="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-surface" aria-live="polite">
          <div
            v-for="(msg, i) in displayMessages"
            :key="i"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words"
              :class="msg.role === 'user'
                ? 'bg-accent text-white rounded-br-md'
                : 'bg-white text-slate-700 border border-border rounded-bl-md'"
            >
              <template v-if="msg.content">
                <template v-for="(seg, j) in toSegments(msg.content)" :key="j">
                  <RouterLink
                    v-if="seg.type === 'product'"
                    :to="seg.value"
                    class="text-accent font-medium underline underline-offset-2"
                  >{{ seg.value }}</RouterLink>
                  <a
                    v-else-if="seg.type === 'email'"
                    :href="`mailto:${seg.value}`"
                    class="underline underline-offset-2"
                    :class="msg.role === 'user' ? 'text-white' : 'text-accent'"
                  >{{ seg.value }}</a>
                  <template v-else>{{ seg.value }}</template>
                </template>
              </template>
              <span v-else class="inline-flex gap-1 py-1" aria-label="Typing">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]"></span>
              </span>
            </div>
          </div>

          <div v-if="showQuickPrompts" class="flex flex-wrap gap-2 pt-1">
            <button
              v-for="q in quickPrompts"
              :key="q"
              type="button"
              class="text-xs px-3 py-1.5 rounded-full border border-accent/40 text-accent bg-white hover:bg-accent hover:text-white transition-colors"
              :disabled="sending"
              @click="send(q)"
            >
              {{ q }}
            </button>
          </div>

          <p v-if="leadSent" class="text-xs text-center text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            Your inquiry has been sent to our sales team.
          </p>
          <p v-if="error" class="text-xs text-center text-red-700 bg-red-50 rounded-lg px-3 py-2">
            {{ error }}
          </p>
        </div>

        <form class="border-t border-border p-3 bg-white" @submit.prevent="send()">
          <div class="flex items-end gap-2">
            <textarea
              ref="inputEl"
              v-model="input"
              rows="1"
              maxlength="2000"
              class="flex-1 resize-none max-h-28 px-3 py-2.5 text-sm rounded-xl border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              placeholder="Ask about machines, specs, delivery..."
              @keydown="onKeydown"
            ></textarea>
            <button
              type="submit"
              class="btn-primary w-10 h-10 rounded-xl text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="sending || !input.trim()"
              aria-label="Send message"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 0l-6 6m6-6l6 6"/>
              </svg>
            </button>
          </div>
          <p class="text-[11px] text-muted mt-2 text-center">
            AI answers may be inaccurate. Prefer email?
            <a :href="`mailto:${siteMeta.contactEmail}`" class="text-accent hover:underline">{{ siteMeta.contactEmail }}</a>
          </p>
        </form>
      </section>
    </Transition>

    <button
      type="button"
      class="btn-primary flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-semibold"
      :aria-expanded="open"
      aria-label="Chat with our laser consultant"
      @click="open = !open"
    >
      <svg v-if="!open" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
      <span>{{ open ? 'Close' : 'Ask AI' }}</span>
    </button>
  </div>
</template>
