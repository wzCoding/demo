<template>
    <main class="main">
        <div class="back" @click="back">
            <span>×</span>
        </div>
        <PageMenu position="bottom-left" :visible="false" :menus="menus" @visible-change="showMenu" @menu-click="menuClick">
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
        const id = computed(() => {
            return router.currentRoute.value.name
        })
        const loading = ref(true)
        const menus = ref([])
        menuStore.getMenu(id.value).then(res =>{
            menus.value = res
        })
        const back = () => {
            router.push("/")
        }
        const showMenu = (active) => {
            active.value = !active.value
        }

        const menuClick = (target,active) => {
            router.addRoute({ path: target.path, component: () => import(`@/views${target.path}.vue`)})
            router.push(target.path)
            active.value = false
        }

        return {
            menus,
            back,
            showMenu,
            menuClick,
        }
    }
}
</script>