import { ref,reactive } from "vue"
import { defineStore } from "pinia"
import { getData } from "@/utils"

export const useDataStore = defineStore("data", () => {
    const type = "data"
    const loading = ref(false)
    const data = reactive({})
    // 获取数据
    async function getPageData(id) {
        if (!id) return []

        if (!data[id]) {
            loading.value = true
            data[id] = await getData(id, type)
            loading.value = false
        }

        return data[id]
    }
    return {
        data,
        loading,
        getPageData
    }
})