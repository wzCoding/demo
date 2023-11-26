<style lang="scss" src="./home.scss" scoped></style>
<template>
    <div class="home" v-loading="loading">
        <div class="home-main">
            <div class="menu-wrap">
                <div class="menu-grid">
                    <template v-if="menus">
                        <div v-for=" menu  in  menus" :key="menu.title" class="menu-item">
                            <IconButton class="menu-btn" direction="top" :icon="menu.icon" :text="menu.title"
                                @click="toPage(menu.path)" />
                        </div>
                    </template>
                </div>
            </div>
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
                <IconButton class="start-btn" :icon="startBtn.icon" @click="toPage()">
                    {{ startBtn.name }}</IconButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import IconButton from '@/components/IconButton/index.vue'
import service from '@/axios';
const menus = ref([])

const greet = 'Hello !'
const mainTitle = ['欢迎来到我的', 'Demo']
const subTitle = ['I`m', 'wzCoding']
const colorText = ['Demo', 'I`m']
const info = '这是我的 Demo 网页，这里记录展示了一些使用 CSS 和 JS 实现的前端 Demo，欢迎浏览 .'
const startBtn = { name: "开始浏览", icon: "right-arrow.svg" }

const loading = reactive({ text: `Loading......`, show: true })
async function getMenu() {
    const params = { id: 'home', type: "menu" }
    const result = await service.post('mock/data', params)
    menus.value = result && result.data ? JSON.parse(JSON.stringify(result.data)) : []
    loading.show = false
}

getMenu()

const router = useRouter()
const toPage = (path) => {
    if (path) router.push(path)
}

</script>
