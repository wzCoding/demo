import { ref } from "vue"
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
        const showMenu = (visible) => {
             visible.value = !visible.value
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