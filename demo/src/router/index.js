import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    nameCN:"主页",
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/css',
    name: 'css',
    nameCN:"css",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "card" */ '../views/css/card.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    nameCN:"echarts",
    component: () => import(/* webpackChunkName: "card-carousel" */ '../views/echarts/echarts1.vue')
  },
  {
    path: '/threeJS',
    name: 'threeJS',
    nameCN:"threeJS",
    component: () => import(/* webpackChunkName: "echarts1" */ '../views/three/bird.vue')
  },
  {
    path: '/about',
    name: 'about',
    nameCN:"about",
    component: () => import(/* webpackChunkName: "echarts2" */ '../views/about/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
