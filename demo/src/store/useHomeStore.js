import { ref } from "vue"
import { defineStore } from "pinia"
import service from '@/axios'
const useMenuStore = defineStore("menu", () => {
    const menu = ref([])
    const type = "menu"
    async function getHomeMenu(id) {
        if (!menu.value.length) {
            const params = { id: id, type: type }
            const result = await service.post('mock/data', params)
            menu.value = result && result.data ? JSON.parse(JSON.stringify(result.data)) : []
        }
    }
    getHomeMenu()
    return { menu }
})

export { useHomeStore }