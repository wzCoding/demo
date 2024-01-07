import { ref } from "vue"
import { useRouter } from "vue-router"
import PageMenu from "@/components/Menu/index.vue"
export default {
    name: "PageContainer",
    components: { PageMenu },
    setup() {
        const menuVisible = ref(false)
        const showMenu = (visible) => {
             visible.value = !visible.value
        }

        const router = useRouter()
        const back = () => {
            router.push("/")
            menuVisible.value = false
        }
        return {
            menuVisible,
            back,
            showMenu,
        }
    }
}