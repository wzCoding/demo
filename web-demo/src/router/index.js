import { createRouter, createWebHistory } from 'vue-router'
import  Home  from '../components/home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/periodic-table',
      name: 'periodic-table',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/periodic-table/index.vue')
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('../components/carousel/index.vue')
    },
  ]
})

export default router
