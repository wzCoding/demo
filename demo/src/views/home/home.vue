<style lang="scss" src="./home.scss" scoped></style>
<template>
    <div class="home" v-loading="loading">
        <div class="home-main">
            <template v-if="menuStore.menu[id]">
                <div class="menu-wrap">
                    <div class="menu-grid">
                        <div v-for="menu in menuStore.menu[id]" :key="menu.title" class="menu-item">
                            <IconButton class="menu-btn" direction="top" :icon="menu.icon" :text="menu.title"
                                @click="toPage(menu.path)" />
                        </div>
                    </div>
                </div>
            </template>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/useMenuStore'
import IconButton from '@/components/IconButton/index.vue'

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
    if (path) router.push(path)
}

</script>
