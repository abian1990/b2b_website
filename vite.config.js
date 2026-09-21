import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      // 本地先跑 `npm run pages:dev`（默认 8788）时，Vite 可把 /api 转到 Functions
      '/api': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true
      }
    }
  }
})
