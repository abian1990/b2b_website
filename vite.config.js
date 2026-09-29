import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import pagesFunctions from './scripts/vite-plugin-pages-functions.js'

export default defineConfig({
  plugins: [vue(), pagesFunctions()],
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
      // /api/* with a file in functions/api is served in-process by pagesFunctions();
      // anything else falls through to `npm run pages:dev` (default :8788)
      '/api': {
        target: 'http://127.0.0.1:8788',
        changeOrigin: true
      }
    }
  }
})
