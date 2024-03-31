import service from '@/axios'
import { deepClone } from "./index"
async function getData(id, type) {
    if (!id || !type) return []
    const param = { id, type }
    const result = await service.post('mock/data', param)
    return result && result.data ? deepClone(result.data) : []
}

export { getData }