import { ref } from "vue"
import { useRouter } from "vue-router"
export default {
    name: "PageContainer",
    setup() {
        const menuActive = ref(false)
        const showMenu = () => {
              menuActive.value = !menuActive.value
        }

        const router = useRouter()
        const back = () => {
            router.push("/")
            menuActive.value = false
        }
        return {
            menuActive,
            back,
            showMenu,
        }
    }
}