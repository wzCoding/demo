import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    nameCN: "主页",
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/css',
    name: 'css',
    nameCN: "css",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "card" */ '../views/css/card.vue')
  },
  {
    path: '/charts',
    name: 'charts',
    nameCN: "charts",
    component: () => import(/* webpackChunkName: "card-carousel" */ '../views/charts/echarts1.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    nameCN: "canvas",
    component: () => import(/* webpackChunkName: "echarts1" */ '../views/canvas/bird.vue')
  },
  {
    path: '/components',
    name: 'components',
    nameCN: "components",
    component: () => import(/* webpackChunkName: "echarts2" */ '../views/components/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    nameCN: "about",
    component: () => import(/* webpackChunkName: "echarts2" */ '../views/about/index.vue')
  },
]
const views = require.context("@/views",true,/\.vue$/)
views.keys().forEach(item=>{
  console.log(item)
})
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
