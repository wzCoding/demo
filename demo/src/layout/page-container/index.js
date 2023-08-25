import { toRefs } from "vue"
import { storeToRefs } from "pinia"
import { useMenuStore } from "@/store/useMenuStore"
export default {
    name: "pageContainer",
    props: {
        hasAside: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { hasAside } = toRefs(props)
        const menuStore = useMenuStore()
        const { state } = storeToRefs(menuStore)
        return {
            hasAside,
            state
        }
    }
}