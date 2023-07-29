<template>
  <div class="home">
    <el-menu :mode="menus.mode.value" unique-opened :default-openeds="menus.opens" :default-active="menus.active">
      <el-sub-menu v-for="menu in menus.options" :key="menu.index" :index="menu.index">
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

<script>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import axios from '../axios'
export default {
  name: 'HomeView',
  setup() {

    const menus = {
      mode: ref("vertical"),
      collapse: ref(true),
      opens: ["1"],
      active: "1-1",
      options: [
        {
          index: "1",
          title: "css",
          icon: require("../../public/images/css.svg"),
          children: [
            {
              index: "1-1",
              title: "卡片",
              path: "/card"
            },
            {
              index: "1-2",
              title: "卡片轮播",
              path: "/card-carousel"
            }
          ]
        },
        {
          index: "2",
          title: "echarts",
          icon: require("../../public/images/chart.svg"),
          children: [
            {
              index: "2-1",
              title: "报表1"
            },
            {
              index: "2-2",
              title: "报表2"
            }
          ]
        },
        {
          index: "3",
          title: "three.js",
          icon: require("../../public/images/cubes.svg"),
          children: [
            {
              index: "3-1",
              title: "海面"
            },
            {
              index: "3-2",
              title: "飞鸟"
            }
          ]
        }
      ]
    }
    const router = useRouter()
    const toPage = (path) => {
      if (path) router.push(path)
    }
    console.log(axios.get())
    return {
      menus,
      toPage
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;

  .el-menu {
    width: 200px;
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
