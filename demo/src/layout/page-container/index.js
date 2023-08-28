import { toRefs, computed } from "vue"
import { useRouter } from "vue-router"
export default {
    name: "PageContainer",
    props: {

    },
    setup(props) {
        const router = useRouter()
        const back = () => {
            router.push("/")
        }
        return {
            back
        }
    }
}