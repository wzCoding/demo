import { ref,reactive } from "vue"
import { defineStore } from "pinia"
import { getData } from "@/utils"

export const useMenuStore = defineStore("menu", () => {
    const type = "menu"
    const loading = ref(false)
    const menu = reactive({})
    // 获取数据
    async function getPageMenu(id) {
        if (!id) return []

        if (!menu[id]) {
            loading.value = true
            menu[id] = await getData(id, type)
            loading.value = false
        }

        return menu[id]
    }
    return {
        menu,
        loading,
        getPageMenu
    }
})