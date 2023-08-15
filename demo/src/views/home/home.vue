<style lang="scss" src="./home.scss" scoped></style>
<template>
    <div class="home" v-loading="homeLoading">
        <PageHeader themeControl></PageHeader>
        <main class="home-main">
            <div class="menu-wrap">
                <div class="menu-grid">
                    <template v-if="menus">
                        <div v-for="menu in menus" :key="menu.title" class="menu-item">
                            <IconButton class="menu-btn" :icon="menu.icon" :text="menu.title" @click="toPage(menu.path)" />
                        </div>
                    </template>
                </div>
            </div>
            <div class="home-content">
                <h2 class="home-text">{{ text }}</h2>
                <h1 class="home-main-title">
                    <span v-for="title in mainTitle" :key="title" :class="colorText.includes(title) ? 'color-text' : ''">{{
                        title
                    }}</span>
                </h1>
                <h2 class="home-sub-title">
                    <span v-for="title in subTitle" :key="title" :class="colorText.includes(title) ? 'color-text' : ''">{{
                        title
                    }}</span>
                </h2>
                <p class="home-info">{{ info }}</p>
                <IconButton class="start-btn" :icon="startBtn.icon" direction="horizontal" iconSite="left"
                    @click="toPage('default')">
                    {{ startBtn.name }}</IconButton>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/layout/page-header/index.vue'
import IconButton from '@/components/icon-button/index.vue'
import service from '@/axios'

const menus = ref(null)
const menusParams = { id: 'menu' }


const text = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'

const startBtn = { name: "开始浏览", icon: "right-arrow.svg" }

const homeLoading = ref(true)
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
