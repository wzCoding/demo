import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue'),
  },
  {
    path: '/home',
    redirect: '/'
  }
]

const menuPages = require.context("@/views", true, /\.vue$/)
const indexViews = menuPages.keys().filter(item => item.includes("index.vue"))
indexViews.forEach(item => {
  const name = item.split("/")[1]
  const route = {
    name,
    path: `/${name.toLowerCase()}/index`,
    component: () => import(`@/views/${name}/index.vue`),
  }
  const redirect = {
    path: `/${name.toLowerCase()}`,
    redirect: `/${name.toLowerCase()}/index`
  }
  routes.push(
     route,
     redirect
  )
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  try {
    console.log(to)
    console.log(routes)

    if (!router.hasRoute(to.name)) {
      console.log("no match")
    }
  } catch (error) {
    console.log(error)
  }
})
export default router
