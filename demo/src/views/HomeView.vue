<template>
  <div class="home">
    <menuBar :data="menus" :mode="menuMode" :collapse="menuCollapse" :uniqueOpen="unique" :defaultActive="activeMenu"></menuBar>
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import { ref } from "vue"
import service from "../axios"
import menuBar from "../components/menu-bar/index.vue"

const menuMode = "vertical"
const activeMenu = "1-1"
const menuCollapse = false

const unique = true
const menus = ref([])

const getMenus = async () => {
  const res = await service.post("mock/data", { id: "menu" })
  menus.value = res.data
}
getMenus()

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
