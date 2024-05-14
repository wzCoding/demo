<template>
    <div class="virtual-list">
        <div class="list-content" ref="content" v-loading="loading">
            <div v-for="item in itemList" :key="item.key" class="item"
                :style="{ height: `${item.height}px`, backgroundColor: item.color }">{{
                    item.name
                }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { getRandom, getRandomColor } from '@/utils/index'

//设置默认属性
const dataCount = 100000
const minHeight = 100, maxHeight = 300
let dataList = reactive([])

const loading = ref(true)
const content = ref(null)
//模拟数据
const getData = async () => {
    loading.value = true
    const list = Array.from({ length: dataCount }).map((_, index) => { return { name: index + 1, height: getRandom(minHeight, maxHeight), key: index, color: getRandomColor(0.5) } })
    const result = await Promise.resolve(list)
    loading.value = false
    return result
}

const getMaxSize = () => {
    return Math.ceil(content.value.clientHeight / minHeight)
}

const getStartIndex = (scrollTop) => {
    return Math.floor(scrollTop / minHeight)
}
//设置列表数据相关属性
const maxSize = ref(0)
const startIndex = ref(0)
const endIndex = computed(() => startIndex.value + maxSize.value)
//自动计算
const itemList = computed(() => {
    return dataList.slice(startIndex.value, endIndex.value)
})

onMounted(async () => {
    dataList = await getData()
    maxSize.value = getMaxSize()
    startIndex.value = getStartIndex(0)
    console.log('startIndex', startIndex.value)
    console.log('endIndex', endIndex.value)
    console.log('maxSize', maxSize.value)
})


</script>
<style lang="scss" scoped>
.virtual-list {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
    overflow: hidden;
    background: #333;

    .list-content {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #f0f0f0;
        border-radius: 4px;

        .item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-size: 2rem;
            font-weight:600;
            margin:10px 0;
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
