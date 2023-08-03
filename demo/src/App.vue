<template>
  <menuBar :data="menus" :mode="menuMode" :collapse="menuCollapse" :uniqueOpen="unique" :defaultActive="activeMenu"
    @ctrlMenu="ctrlMenu"></menuBar>
  <RouterView></RouterView>
</template>
<script setup>
import { ref } from "vue"
import service from "./axios"
import menuBar from "./components/menu-bar/index.vue"

const menuMode = "vertical"
const activeMenu = "1-1"
const menuCollapse = ref(false)

const unique = true
const menus = ref([])

const getMenus = async () => {
  const res = await service.post("mock/data", { id: "menu" })
  menus.value = res.data
}
getMenus()

const ctrlMenu = (isCollapse) => {
  menuCollapse.value = !isCollapse.value
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  display: flex;

  &>div:nth-child(2) {
    flex: 1;
  }
}
</style>
