<template>
    <main class="main">
        <div class="back" @click="back">
            <span>×</span>
        </div>
        <PageMenu position="bottom-left" :visible="false" @visible-change="showMenu" @menu-click="menuClick">
        </PageMenu>
        <div class="content">
           <router-view></router-view>
        </div>
    </main>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { useRouter } from "vue-router"
import PageMenu from "@/components/Menu/index.vue"
export default {
    name: "PageContainer",
    components: { PageMenu },
    setup() {

        const router = useRouter()
        const back = () => {
            router.push("/")
        }
        const showMenu = (active) => {
            active.value = !active.value
        }

        const menuClick = (active) => {
            console.log("menuClick")
            active.value = false
        }

        return {
            back,
            showMenu,
            menuClick,
        }
    }
}
</script>