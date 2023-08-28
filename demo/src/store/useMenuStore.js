import { ref } from "vue"
import { defineStore } from "pinia"
import service from '@/axios'
const useMenuStore = defineStore("menu", () => {
    const menu = ref([])
    const isLoading = ref(true)
    async function getPageMenu(val) {
        if (!menu.value.length) {
            const params = { id: 'menu' }
            const result = await service.post('mock/data', params)
            menu.value = JSON.parse(JSON.stringify(result.data))
            isLoading.value = false
        }
    }
    getPageMenu()
    return { menu,isLoading }
})

export { useMenuStore }