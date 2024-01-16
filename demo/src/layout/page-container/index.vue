<template>
    <main class="main">
        <div class="back" @click="back">
            <span>×</span>
        </div>
        <PageMenu v-if="showMenu" position="bottom-left" :menus="menus" @visible-change="openMenu" @menu-click="menuClick">
        </PageMenu>
        <div class="content">
            <router-view></router-view>
        </div>
    </main>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useMenuStore } from "@/store/useMenuStore"
import PageMenu from "@/components/Menu"
export default {
    name: "PageContainer",
    components: { PageMenu },
    setup() {
        const menuStore = useMenuStore()
        const router = useRouter()
        const menus = ref([])
        const id = computed(() => {
            return router.currentRoute.value.name
        })
        const showMenu = computed(() => {
            return id.value !== "about"
        })
        const back = () => {
            router.push("/")
        }
        const openMenu = (visible) => {
            visible.value = !visible.value
        }

        const menuClick = (target, visible) => {
            router.addRoute({ path: target.path, component: () => import(`@/views${target.path}.vue`) })
            router.push(target.path)
            visible.value = false
        }
        if (showMenu.value) {
            menuStore.getPageMenu(id.value).then(res => {
                menus.value = res
            })
        }
        return {
            menus,
            showMenu,
            back,
            openMenu,
            menuClick,
        }
    }
}
</script>