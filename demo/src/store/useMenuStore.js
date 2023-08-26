import { ref, watch } from "vue"
import { defineStore } from "pinia"
import { useRoute } from "vue-router"
const useMenuStore = defineStore("menu", () => {
    let state = ref(false)
    function changeState(val) {
        state.value = val
    }
    const route = useRoute()
    watch(route, (newRoute) => {
        changeState(newRoute.path !== "/")
    })
    return { state, changeState }
})

export { useMenuStore }