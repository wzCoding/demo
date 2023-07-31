<template>
  <div class="home">
    <el-menu :mode="menuMode" :collapse="menuCollapse" unique-opened :default-openeds="openMenu"
      :default-active="activeMenu">
      <el-sub-menu v-for="menu in menus" :key="menu.index" :index="menu.index">
        <template #title>
          <img v-if="menu.icon" :src="menu.icon" :alt="menu.title" class="title-icon">
          <span class="title-text">{{ menu.title }}</span>
        </template>
        <el-menu-item v-for="item in menu.children" :key="item.index" :index="item.index" @click="toPage(item.path)">
          {{ item.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import service from '../axios'

const menuMode = ref("vertical")
const menuCollapse = ref(false)
const openMenu = ["1"]
const activeMenu = "1-1"
const menus = ref([])
const getMenus = async () => {
  const res = await service.post("mock/data", { id: "menu" })
  menus.value = res.data.map(item => {
     item.icon = require(`../../public/images/${item.icon}`)
     return item
  })
}
getMenus()
const router = useRouter()
const toPage = (path) => {
  if (path) router.push(path)
}

</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;

  .el-menu {
    height: 100%;

    .el-sub-menu__title {
      .title-icon {
        width: 1.5rem;
      }

      .title-text {
        padding-left: .8rem;
      }
    }
  }
}
</style>
