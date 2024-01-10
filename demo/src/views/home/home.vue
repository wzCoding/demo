<style lang="scss" src="./home.scss" scoped></style>
<template>
    <div class="home" v-loading="loading">
        <div class="home-main">
            <transition name="rotate-in">
                <template v-if="menuStore.menu[id]">
                    <div class="menu-wrap">
                        <div class="menu-grid">
                            <div v-for="menu in menuStore.menu[id]" :key="menu.title" class="menu-item">
                                <icon-button class="menu-btn" direction="top" :text="menu.title" @click="toPage(menu.path)">
                                    <icon-svg size="32" color="#fff">
                                        <component :is="svgs[getSvgComponent(menu.icon)]"></component>
                                    </icon-svg>
                                </icon-button>
                            </div>
                        </div>
                    </div>
                </template>
            </transition>
            <div class="home-content">
                <h2 class="home-greet">{{ greet }}</h2>
                <h1 class="home-main-title">
                    <span v-for=" title  in  mainTitle " :key="title"
                        :class="colorText.includes(title) ? 'color-text' : ''">{{
                            title }}</span>
                </h1>
                <h2 class="home-sub-title">
                    <span v-for=" title  in  subTitle " :key="title"
                        :class="colorText.includes(title) ? 'color-text' : ''">{{
                            title }}</span>
                </h2>
                <p class="home-info">{{ info }}</p>
                <icon-button class="start-btn" :icon="startBtn.icon" :text="startBtn.name" @click="toPage()">
                    <icon-svg size="28" color="#fff">
                        <component :is="svgs[getSvgComponent(startBtn.icon)]"></component>
                    </icon-svg>
                </icon-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/useMenuStore'
import IconButton from '@/components/IconButton'
import IconSvg from '@/components/IconSvg'
//svg图标引入
import IconCss from '@/assets/images/svg/css.vue'
import IconChart from '@/assets/images/svg/chart.vue'
import IconCanvas from '@/assets/images/svg/canvas.vue'
import IconComp from '@/assets/images/svg/comp.vue'
import IconAbout from '@/assets/images/svg/about.vue'
import IconArrow from '@/assets/images/svg/arrow.vue'
import { Message } from '@/components/Message'
const svgs = {
    'css': IconCss,
    'chart': IconChart,
    'canvas': IconCanvas,
    'comp': IconComp,
    'about': IconAbout,
    'right-arrow': IconArrow
}

const id = "home"
const loading = ref(false)
const menuStore = useMenuStore()

if (!menuStore.menu[id]) {
    loading.value = true
    menuStore.getMenu(id).then(() => {
        loading.value = false
    })
}

const greet = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'
const startBtn = { name: "开始浏览", icon: "right-arrow.svg" }

const router = useRouter()
const toPage = (path) => {
    if(path){
        router.push(path)
    }else{
        Message.info('功能开发中...')
    }
}
const getSvgComponent = (icon) => {
    return icon.split(".")[0]
}
</script>
