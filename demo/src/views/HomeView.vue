<template>
  <div class="home" v-loading="homeLoading">
    <pageHeader themeControl></pageHeader>
    <main class="home-main">
      <div class="menu-wrap">
        <div class="menu-grid">
          <template v-if="menus">
            <div v-for="menu in menus" :key="menu.title" class="menu-item">
              <iconButton class="menu-btn" :icon="menu.icon" :text="menu.title" @click="toPage(menu.path)" />
            </div>
          </template>
        </div>
      </div>
      <div class="home-content">
        <h2 class="home-text">{{ text }}</h2>
        <h1 class="home-main-title">
          <span v-for="title in mainTitle" :key="title" :class="colorText.includes(title) ? 'color-text' : ''">{{ title
          }}</span>
        </h1>
        <h2 class="home-sub-title">
          <span v-for="title in subTitle" :key="title" :class="colorText.includes(title) ? 'color-text' : ''">{{ title
          }}</span>
        </h2>
        <p class="home-info">{{ info }}</p>
        <iconButton class="start-btn" :icon="startBtn.icon" direction="horizontal" iconSite="left"
          @click="toPage('default')">
          {{ startBtn.name }}</iconButton>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import pageHeader from '@/components/page-header/index.vue'
import iconButton from '@/components/icon-button/index.vue'
import service from '@/axios'

const menus = ref(null)
const menusParams = { id: 'menu' }
const homeLoading = ref(true)

const text = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'

const startBtn = { name: "开始浏览", icon: "right-arrow.svg" }

const getMenuData = async () => {
  const result = await service.post('mock/data', menusParams)
  menus.value = JSON.parse(JSON.stringify(result.data))

  homeLoading.value = false
}
getMenuData()

const router = useRouter()
const toPage = (path) => {
  if (path && path !== 'default') router.push(path)
}



</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-page-background);
  transition: all .3s ease;
  overflow: hidden;
  .home-main {
    width: 100%;
    margin: 0 4rem;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .menu-wrap {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .menu-grid {
        width: 220px;
        height: 220px;
        max-width: 220px;
        display: block;
        padding-left: 0;
        padding-right: 0;
        filter: drop-shadow(0px 0px 30px var(--theme-box-shadow-color));
        transform: rotate(-45deg) translate(-2rem, 2rem);
        position: relative;
        z-index: 2;

        .menu-item {
          float: left;
          clear: none;
          text-align: inherit;
          width: 50%;
          height: 50%;
          margin-left: 0%;
          margin-right: 0%;
          overflow: hidden;
          transition: .3s;
          @extend .background-gradient;

          .menu-btn {
            height: calc(100% + 62px);
            width: calc(100% + 62px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fff;
            transform: rotate(45deg) translate(-43px, 0);
            transition: .3s;
            cursor: pointer;

            &:hover {
              background-color: var(--theme-button-background);
            }

            img {
              width: 2rem;
            }
          }

          &::after {
            content: "";
            display: table;
            clear: both;
          }

          &:nth-child(1) {
            position: relative;
            top: -50%;
            border-radius: 10px 10px 0 0;
          }

          &:nth-child(2) {
            border-radius: 0 10px 0 0;
          }

          &:nth-child(3) {
            position: relative;
            top: -50%;
            border-radius: 0 0 0 10px;
          }

          &:nth-child(4) {
            position: relative;
            left: 50%;
            border-radius: 0 10px 10px 0;
          }

          &:nth-child(5) {
            position: relative;
            left: 50%;
            top: -50%;
            border-radius: 0 0 0 10px;
          }

          &:nth-child(6) {
            position: relative;
            left: -50%;
            top: -150%;
            border-radius: 10px;
            display: none;
          }

        }
      }
    }

    .home-content {
      width: 50%;
      display: flex;
      flex-direction: column;
      color: var(--theme-text-color);

      h1,
      h2 {
        padding-bottom: 1rem;

        span {
          padding-right: .5rem;

          &.color-text {
            @extend .text-gradient;
          }
        }
      }

      p {
        padding-bottom: 1rem;
      }

      .start-btn {
        width: 160px;
        padding: 10px 25px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        @extend .background-gradient;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.15);
        }

        :deep(.btn-icon img) {
          width: 1.5rem;
        }

        :deep(.btn-text) {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
