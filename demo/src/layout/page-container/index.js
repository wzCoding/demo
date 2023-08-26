import { toRefs, computed } from "vue"
import { storeToRefs } from "pinia"
import { useSideStore } from "@/store/useSideStore"
export default {
    name: "pageContainer",
    props: {
        side: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const sideStore = useSideStore()
        const { side } = toRefs(props)
        const { hasSide, sideActive, sideMenus } = storeToRefs(sideStore)
        if (!side.value) hasSide.value = side.value
        const hideSide = (e) => {
            sideActive.value = !e.target.className.includes("overlay")
        }
        return {
            side,
            hasSide,
            sideActive,
            hideSide
        }
    }
}