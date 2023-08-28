import { ref } from "vue"
import { defineStore } from "pinia"
import service from '@/axios'
const useHomeStore = defineStore("home", () => {
    const menu = ref([])
    const isLoading = ref(true)
    async function getHomeMenu(val) {
        if (!menu.value.length) {
            const params = { id: 'menu' }
            const result = await service.post('mock/data', params)
            menu.value = JSON.parse(JSON.stringify(result.data))
            isLoading.value = false
        }
    }
    getHomeMenu()
    return { menu,isLoading }
})

export { useHomeStore }