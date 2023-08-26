import { ref, watch } from "vue"
import { defineStore } from "pinia"
import { useRoute } from "vue-router"
const useSideStore = defineStore("menu", () => {
    //state
    const hasSide = ref(false)
    const sideActive = ref(false)
    const sideMenus = ref([])

    //actions
    function getSideMenus() {

    }
    const route = useRoute()
    watch(route, (newRoute) => {
        hasSide.value = newRoute.path !== "/"
        console.log(hasSide.value)
    })
    return { hasSide, sideActive, sideMenus }
})


export { useSideStore }