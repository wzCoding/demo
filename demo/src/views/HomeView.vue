<template>
  <div class="home">
    <div class="container">
      <div class="menu-wrap">
        <div class="menu-grid">
          <template v-if="menus">
            <div v-for="menu in menus" :key="menu.title" class="menu-item">
              <iconButton class="menu-btn" :icon="menu.icon" @click="toPage(menu.path)">{{ menu.title }}</iconButton>
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
        <iconButton class="start-btn" :icon="btnIcon" direction="horizontal" iconSite="right" @click="toPage('default')">{{ btnText }}</iconButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import iconButton from '../components/icon-button/index.vue'
import service from '@/axios'

const menus = ref(null)
const menusParams = { id: 'menu' }
const getMenuData = async () => {
  const result = await service.post('mock/data', menusParams)
  menus.value = result.data
}
getMenuData()

const text = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'

const btnIcon = "right-arrow.svg"
const btnText = 'start'

const router = useRouter()
const toPage = (path) => {
  if (path && path!=='default') router.push(path)
}



</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;

  .container {
    width: 100%;
    margin: 0 4rem;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .menu-wrap {
      width: 50%;

      .menu-grid {
        width: auto;
        max-width: 220px;
        float: none;
        display: block;
        padding-left: 0;
        padding-right: 0;
        height: 220px;
        filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
        transform: rotate(-45deg);
        position: relative;
        z-index: 2;
        margin-left: calc(110px + 20px);

        .menu-item {
          float: left;
          clear: none;
          text-align: inherit;
          width: 50%;
          margin-left: 0%;
          margin-right: 0%;
          height: 110px;
          background: linear-gradient(135deg, #F8B127, #CB26B6);
          overflow: hidden;
          transition: .3s;

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
              background-color: #9f2b83;
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
            border-radius: 10px 10px 0 0;
          }

          &:nth-child(2) {
            position: relative;
            top: 50%;
            border-radius: 0 10px 0 0;
          }

          &:nth-child(3) {
            border-radius: 0 0 0 10px;
          }

          &:nth-child(4) {
            position: relative;
            top: 50%;
            left: 50%;
            border-radius: 0 10px 10px 0;
          }

          &:nth-child(5) {
            position: relative;
            left: 50%;
            border-radius: 0 0 0 10px;
          }

        }
      }
    }

    .home-content {
      width: 50%;
      height: 220px;
      display: flex;
      flex-direction: column;
      color: #333;
      font-family: "Poppins", sans-serif;
      h1,
      h2 {
        padding-bottom: 1rem;

        span {
          padding-right: .5rem;

          &.color-text {
            color: transparent;
            background: linear-gradient(135deg, #F8B127, #CB26B6);
            background-clip: text;
          }
        }
      }

      p {
        padding-bottom: 1rem;
      }

      .start-btn {
        height: 50px;
        width: 140px;
        padding: 10px 25px;
        background: linear-gradient(135deg,#CB26B6,#F8B127);
        border-radius: 25px;
        cursor: pointer;
        color: #fff;
        &:hover{
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
