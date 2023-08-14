import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/css',
    name: 'css',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "card" */ '../views/css/card.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import(/* webpackChunkName: "card-carousel" */ '../views/css/carousel.vue')
  },
  {
    path: '/threeJS',
    name: 'threeJS',
    component: () => import(/* webpackChunkName: "echarts1" */ '../views/echarts/echarts1.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "echarts2" */ '../views/echarts/echarts2.vue')
  },
  {
    path: '/build',
    name: 'build',
    component: () => import(/* webpackChunkName: "bird" */ '../views/three/bird.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
