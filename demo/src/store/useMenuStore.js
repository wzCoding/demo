import { defineStore } from "pinia"
import { ref } from "vue"
const useMenuStore = defineStore("menu", () => {
    let state = ref(false)
    function changeState(val) {
        state.value = val
    }
    return { state, changeState }
})

export { useMenuStore }