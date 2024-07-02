import { createRouter, createWebHistory } from 'vue-router'
import { Message } from '@/components/Message'
import Home from '../views/home/home.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'toHome',
    path: '/:path(.*)',
    component: Home,
  }
]

const indexPages = require.context("@/views", true, /\.vue$/).keys().filter(item => item.includes("index.vue"))
indexPages.forEach(item => {
  const name = item.split("/")[1]
  const route = {
    name,
    path: `/${name.toLowerCase()}/index`,
    component: () => import(`@/views/${name}/index.vue`),
  }
  routes.push(route)
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  const basePath = to.fullPath.split("/").filter(Boolean)[0]
  const route = routes.filter(item => item.name === basePath)[0]
  
  if (to.name === 'toHome') {
    return route ? route.path : "/"
  }

  if (to.name === 'charts') {
    const isMobile = 'ontouchstart' in document.documentElement
    //判断是否移动端
    if (isMobile) {
      Message.info({
        type:"info",
        text: "当前页面不支持移动端浏览",
        showClose: true
      })

      return "/"
    }
  }
})

export default router
