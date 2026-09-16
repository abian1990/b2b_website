import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: ProductPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
