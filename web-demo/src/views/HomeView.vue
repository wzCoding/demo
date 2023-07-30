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

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import service from '../axios'

const menus = {
  mode: ref("vertical"),
  collapse: ref(true),
  opens: ["1"],
  active: "1-1",
  options: []
}
const getMenus = async () => {
  const res = await service.post("mock/data", {})
  menus.options = res.data
}

onMounted(() => {
  getMenus()
  console.log(menus)
})

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
