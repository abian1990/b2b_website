import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import { HOME_SCROLL_KEY, RESTORE_SCROLL_KEY } from '../utils/scrollMemory.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Fiber Laser Tube & Sheet Cutting Machines' }
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: ProductPage,
    meta: { title: 'Product' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  // History mode is better for Google SEO (requires SPA fallback via public/_redirects)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.query.section) {
      return false
    }
    if (to.name === 'Home' && from.name === 'Product' && sessionStorage.getItem(RESTORE_SCROLL_KEY) === '1') {
      sessionStorage.removeItem(RESTORE_SCROLL_KEY)
      const y = Number(sessionStorage.getItem(HOME_SCROLL_KEY) || 0)
      return { top: y }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  if (from.name === 'Home' && to.name === 'Product') {
    sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY || 0))
  }
})

export default router
