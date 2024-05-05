<style lang="scss" src="./home.scss" scoped></style>
<template>
    <div class="home" v-loading="loading">
        <div class="home-main">
            <transition name="rotate-in">
                <template v-if="menuStore.menu[id]">
                    <div class="menu-wrap">
                        <div class="menu-grid">
                            <div v-for="menu in menuStore.menu[id]" :key="menu.title" class="menu-item">
                                <e-button class="menu-btn" direction="top" :text="menu.title" @click="toPage(menu)">
                                    <e-svg size="32" color="#fff" :name="menu.icon" />
                                </e-button>
                            </div>
                        </div>
                    </div>
                </template>
            </transition>
            <div class="home-content">
                <h2 class="home-greet">{{ greet }}</h2>
                <h1 class="home-main-title">
                    <span v-for=" title in mainTitle " :key="title"
                        :class="colorText.includes(title) ? 'color-text' : ''">{{
                            title }}</span>
                </h1>
                <h2 class="home-sub-title">
                    <span v-for=" title in subTitle " :key="title"
                        :class="colorText.includes(title) ? 'color-text' : ''">{{
                            title }}</span>
                </h2>
                <p class="home-info">{{ info }}</p>
                <e-button class="start-btn" :text="startBtn.name" @click="toPage(menuStore.menu[id][1])">
                    <e-svg size="28" color="#fff" :name="startBtn.icon" />
                </e-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/useMenuStore'
import { Message } from '@/components/Message'
import EButton from '@/components/Button'
import ESvg from '@/components/Svg'

const id = "home"
const loading = computed(() => menuStore.loading)
const menuStore = useMenuStore()
menuStore.getPageMenu(id)

const greet = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'
const startBtn = { name: "开始浏览", icon: "arrow" }
const notAllowed = ['about']
const router = useRouter()
const toPage = (menu) => {
    if(notAllowed.includes(menu.title)){
        Message.info('敬请期待')
        return
    }
    if (menu.path) {
        const params = { path: menu.path, icon: menu.icon }
        router.push(params)
    }
}

</script>
