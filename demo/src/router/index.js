import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/card',
    name: 'card',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "card" */ '../views/css/card.vue')
  },
  {
    path: '/card-carousel',
    name: 'card-carousel',
    component: () => import(/* webpackChunkName: "card-carousel" */ '../views/css/carousel.vue')
  },
  {
    path: '/echarts1',
    name: 'echarts1',
    component: () => import(/* webpackChunkName: "echarts1" */ '../views/echarts/echarts1.vue')
  },
  {
    path: '/echarts2',
    name: 'echarts2',
    component: () => import(/* webpackChunkName: "echarts2" */ '../views/echarts/echarts2.vue')
  },
  {
    path: '/bird',
    name: 'bird',
    component: () => import(/* webpackChunkName: "bird" */ '../views/three/bird.vue')
  },
  {
    path: '/sea',
    name: 'sea',
    component: () => import(/* webpackChunkName: "sea" */ '../views/three/sea.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
