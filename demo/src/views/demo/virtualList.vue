<template>
    <div class="virtual-list">
        <div class="list-container" ref="container" v-loading="loading">
            <div class="list-content" ref="content" :style="contentStyle">
                <div class="item" v-for="item in itemList" :key="item.name" :data-index="item.index"
                    :style="{ height: `${item.height}px`, backgroundColor: item.color }">{{
                        `${item.name}(${item.height}px)` }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { getRandom, getRandomColor, throttle } from '@/utils/index'

//随机高度范围
const minHeight = 100, maxHeight = 300
//列表项间隔
const margin = 10
//设置预估高度直接取最小高度
const expectedHeight = minHeight

//模拟设置数据总数
const dataCount = 100000
//处理数据设置随机高度
const dataList = Array.from({ length: dataCount }).map((_, index) => { return { index, name: index + 1, height: getRandom(minHeight, maxHeight), color: getRandomColor(0.5) } })

const loading = ref(true)
const container = ref(null)
const content = ref(null)

//设置列表相关属性
const itemList = ref([])
//positions用于缓存每个列表项的位置信息({index,top,bottom,diffHeight})
const positions = reactive([])
//列表的真实高度
const listHeight = ref(0)
//列表最大渲染的数据条数
const maxSize = ref(0)
//列表开始索引
const startIndex = ref(0)
//列表结束索引
const endIndex = computed(() => Math.min(startIndex.value + maxSize.value + 1, dataCount))

//列表已经滚动的距离
const scrollDistance = computed(() => startIndex.value > 0 ? positions[startIndex.value - 1].bottom : 0)
//列表内容容器的样式
const contentStyle = computed(() => {
    return {
        height: `${listHeight.value - scrollDistance.value}px`,
        transform: `translate3d(0, ${scrollDistance.value}px, 0)`
    }

})
//监听startIndex，自动更新后续列表项的位置信息
watch(startIndex, () => {
    setPosition()
})

//模拟加载数据
const getData = async (start, end) => {
    loading.value = true
    let timer, p
    const data = dataList.slice(start, end)

    p = new Promise(resolve => { timer = setTimeout(() => resolve(data), 1000) })
    const result = await p
    //清除临时变量
    clearTimeout(timer)
    timer = null
    p = null
    loading.value = false
    return result
}

//计算最大渲染数据条数
const getMaxSize = () => Math.ceil(container.value.clientHeight / expectedHeight)

//初始化列表项位置信息
const initPositions = () => {
    dataList.forEach((_, index) => {
        positions.push({
            index, //列表项索引
            height: expectedHeight,  //列表项预估高度
            top: (expectedHeight + margin) * index,  //列表项顶部坐标
            bottom: (expectedHeight + margin) * (index + 1),  //列表项底部坐标
            diffHeight: 0  //列表项实际高度与预估高度的差值
        })
    })
}

//重新设置列表项位置信息
const setPosition = () => {
    const children = [...content.value.children]
    if (!children.length) return
    //遍历页面上每个列表项元素，更新缓存的列表项实际高度以及 相关位置信息
    children.forEach(node => {
        if (!node) return
        //获取列表项索引
        const index = +node.dataset.index
        const rect = node.getBoundingClientRect()
        const oldHeight = positions[index].height
        const diff = rect.height - oldHeight
        //存在差值，说明预估高度不准确，更新列表项位置信息
        if (diff) {
            positions[index].height = rect.height
            positions[index].bottom = positions[index].bottom - diff
            positions[index].diffHeight = diff
        }
    })

    //从页面上渲染的第一个元素开始，逐个更新后面元素的位置信息
    //获取第一个元素索引
    const startIndex = +children[0].dataset.index
    const length = positions.length
    let startHeight = positions[startIndex].diffHeight
    positions[startIndex].diffHeight = 0
   
    //通过循环更新后续位置信息
    for (let i = startIndex + 1; i < length; i++) {
        const item = positions[i]
        item.top = positions[i - 1].bottom
        item.bottom = item.bottom - startHeight

        if (item.diffHeight !== 0) {
            startHeight += item.diffHeight
            item.diffHeight = 0
        }
    }
    //更新列表实际高度
    listHeight.value = positions[length - 1].bottom
}

const handleScroll = throttle(async () => {
    const { scrollTop, scrollHeight, clientHeight } = container.value
    startIndex.value = binarySearch(positions, scrollTop)
    //加载数据...
    const restHeight = scrollHeight - (clientHeight + scrollTop)
    if (restHeight <= 20) {
        itemList.value = await getData(startIndex.value, endIndex.value)
    }
}, 100)

//二分查找法
const binarySearch = (list, value) => {
    //list就是缓存的positions数组，它的bottom值是递增的
    //开始索引
    let startIndex = 0
    //结束索引
    let endIndex = list.length - 1
    //临时索引
    let tempIndex = -1
    while (startIndex < endIndex) {
        //一分为二计算中间索引
        const midIndex = Math.floor((startIndex + endIndex) / 2)
        //获取中间索引对应的bottom值
        const midValue = list[midIndex].bottom
        if (midValue === value) {
            //如果bottom值与传入的scrollTop相等,说明它的下一项就是要找的数据，直接返回
            return midValue + 1
        } else if (midValue < value) {
            //如果bottom值小于传入的scrollTop,说明要找的数据在midIndex之后
            startIndex = midIndex + 1
        } else if (midValue > value) {
            //如果bottom值大于传入的scrollTop,说明要找的数据在midIndex之前
            if (tempIndex === -1 || tempIndex > midIndex) {
                tempIndex = midIndex
            }
            //更新结束索引，缩小查找范围
            endIndex = midIndex
        }
    }

    return tempIndex
}
onMounted(async () => {
    initPositions()
    setPosition()
    maxSize.value = getMaxSize()
    itemList.value = await getData(startIndex.value, endIndex.value)

    container.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    container.value.removeEventListener('scroll', handleScroll)
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

    .list-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f0f0f0;
        border-radius: 4px;
        -webkit-overflow-scrolling: touch;
    }

    .list-content {
        position: relative;
        width: 100%;

        .item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-size: 2rem;
            font-weight: 600;
            margin: 10px 0;

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
