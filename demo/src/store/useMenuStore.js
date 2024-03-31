import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import { getData } from "@/utils/service"

export const useMenuStore = defineStore("menu", () => {
    const type = "menu"
    const loading = ref(false)
    const menu = reactive({})

    // 获取页面所有menu数据
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