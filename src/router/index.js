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
  scrollBehavior(to) {
    // 由首页根据 ?section= 自行定位，避免先滚到顶部再抢滚动
    if (to.query.section) {
      return false
    }
    return { top: 0 }
  }
})

export default router
