import { reactive } from "vue"
import { defineStore } from "pinia"
import { getData } from "@/utils"

const useMenuStore = defineStore("menu", () => {
    const type = "menu"
    const menu = reactive({})
    // 获取数据
    async function getMenu(id) {
        if (!id) return []

        if (!menu[id]) {
            menu[id] = await getData(id, type)
        }

        return menu[id]
    }
    return {
        menu,
        getMenu
    }
})

export { useMenuStore }