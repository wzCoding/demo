<template>
  <div class="home">
    <div class="menu-container" :class="collapseClass">
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
      <div class="menu-ctrl" @click="ctrlMenu">
        <el-icon class="ctrl-arrow" :class="ctrlArrow">
          <ArrowLeft />
        </el-icon>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { ArrowLeft } from "@element-plus/icons-vue"
import service from "../axios"

const menuMode = ref("vertical")
const menuCollapse = ref(false)
const openMenu = ["1"]
const activeMenu = "1-1"
const menus = ref([])
const collapseClass = ref("")
const ctrlArrow = ref("left-arrow")
const ctrlMenu = () => {
  menuCollapse.value = !menuCollapse.value
  ctrlArrow.value = menuCollapse.value ? "right-arrow" : "left-arrow"
}

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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;

  .menu-container {
    height: 100%;
    border-right: 1px solid var(--el-menu-border-color);
    position: relative;

    .el-menu {
      border-right: none;
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

    .el-menu .el-sub-menu {
      min-width: unset;
    }

    .menu-ctrl {
      padding: .75rem 2px;
      position: absolute;
      right: -21px;
      top: 50%;
      margin-top: -20px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border: 1px solid var(--el-menu-border-color);
      border-left: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-icon {
        transition: all .5s ease-in-out;
      }

      .left-arrow {
        transform: rotate(0deg);
      }

      .right-arrow {
        transform: rotate(180deg);
      }
    }


  }

  &>div:nth-child(2) {
    height: 100%;
    flex-grow: 1;
  }
}
</style>
