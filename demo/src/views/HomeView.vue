<template>
  <div class="home">
    <div class="menu-wrap">
      <div class="menu-grid">
        <template v-if="menus">
          <div v-for="menu in menus" :key="menu.title" class="menu-item">
            <div class="menu-btn" @click="toPage(menu.path)">
              <span class="menu-icon">
                <img :src="menu.icon" :alt="menu.title">
              </span>
              <span class="menu-text">{{ menu.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/axios'

const menus = ref(null)
const menusParams = { id: 'menu' }
const getMenuData = async () => {
  const result = await service.post('mock/data', menusParams)
  menus.value = result.data.map(item => {
    item.icon = require(`../assets/images/${item.icon}.svg`)
    return item
  })
}

const router = useRouter()
const toPage = (path) => {
  if (path) router.push(path)
}

getMenuData()

</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-wrap {
    transform: translateY(95px);
  }

  .menu-grid {
    width: 220px;
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
</style>
