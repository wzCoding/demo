<template>
    <div class="virtual-list">
        <div class="list-container" ref="container" v-loading.scrollLock="loading">
            <div class="list-content" ref="content" :style="contentStyle">
                <div class="item" v-for="item in itemList" :key="item.name" :data-index="item.index"
                    :style="{ height: `${item.height}px`, backgroundColor: item.color }">{{
                        `${item.name}(${item.height}px)` }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { getRandom, getRandomColor, rafThrottle } from '@/utils/index'
import { Message } from '@/components/Message'

//随机高度范围
const minHeight = 100, maxHeight = 300
//列表项间隔
const margin = 10
//设置预估高度直接取最小高度
const expectedHeight = minHeight

//模拟设置数据总数
const dataCount = 10000
//所有数据集合，处理数据设置随机高度
const dataMap = Array.from({ length: dataCount }).map((_, index) => { return { index, name: index + 1, height: getRandom(minHeight, maxHeight), color: getRandomColor(0.5) } })

const loading = ref(true)
const container = ref(null)
const content = ref(null)

//设置列表相关属性
//positions用于缓存每个列表项的位置信息({index,top,bottom,diffHeight})
const positions = ref([])
//页面上已经加载的数据
const loadedData = ref([])
//列表的真实高度
const listHeight = ref(0)
//列表开始索引
const startIndex = ref(0)
//列表最大渲染的数据条数
const maxSize = ref(0)
//列表结束索引
const endIndex = computed(() => {
    if (loadedData.value.length === 0) return startIndex.value + maxSize.value + 1
    return Math.min(startIndex.value + maxSize.value + 1, loadedData.value.length)
})
//实际渲染的列表
const itemList = computed(() => loadedData.value.slice(startIndex.value, endIndex.value))
//列表已经滚动的距离
const scrolledHeight = computed(() => startIndex.value > 0 ? positions.value[startIndex.value - 1].bottom : 0)
//列表内容容器的样式
const contentStyle = computed(() => {
    return {
        height: `${listHeight.value - scrolledHeight.value}px`,
        transform: `translate3d(0, ${scrolledHeight.value}px, 0)`
    }

})

//模拟加载数据
const getData = async () => {
    loading.value = true
    let timer, p
    const start = loadedData.value.length, end = start + 20
    const data = dataMap.slice(start, end)
    Message.success({
        text: `模拟数据总量${dataCount}条，已加载${end}条`,
        duration:0
    })
    p = new Promise(resolve => {
        timer = setTimeout(() => resolve(data), 1000)
    })
    const result = await p
    //清除临时变量
    clearTimeout(timer)
    timer = null
    p = null
    Message.close()
    loading.value = false
    return result
}

//记录之前的数据长度，用于计算加载的数据与之前数据的差值
let oldDataLength = 0
//初始化列表项位置信息
const initPositions = () => {
    //设置一个临时数组，处理存储加载的列表项数据
    const tempList = []
    //获取当前将要渲染到页面上的第一个列表项的上一项，并获取它的bottom值，计算实际滑动的高度
    const prevItem = positions.value[positions.value.length - 1]
    const prevBottom = prevItem ? prevItem.bottom : 0
    //计算加载的数据条数
    const diffLength = loadedData.value.length - oldDataLength
    for (let i = 0; i < diffLength; i++) {
        //计算新加载的列表项的位置信息
        const top = prevBottom ? prevBottom + (expectedHeight + margin) * i : (expectedHeight + margin) * i
        const bottom = prevBottom ? prevBottom + (expectedHeight + margin) * (i + 1) : (expectedHeight + margin) * (i + 1)
        tempList.push({
            index: i, //列表项索引
            height: expectedHeight,  //列表项预估高度
            top,  //列表项顶部坐标
            bottom,  //列表项底部坐标
            diffHeight: 0  //列表项实际高度与预估高度的差值
        })
    }
    //更新positions数组
    positions.value = [...positions.value, ...tempList]
    //更新数据长度
    oldDataLength = loadedData.value.length
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
        const item = positions.value[index]
        const rect = node.getBoundingClientRect()
        const diff = item.height - rect.height
        //存在差值，说明预估高度不准确，更新列表项位置信息
        if (diff) {
            item.height = rect.height
            item.bottom = item.bottom - diff
            item.diffHeight = diff
        }
    })

    //从页面上渲染的第一个元素开始，逐个更新后面元素的位置信息
    //获取第一个元素索引
    const start = +children[0].dataset.index
    const length = positions.value.length
    let startHeight = positions.value[start].diffHeight
    positions.value[start].diffHeight = 0

    //通过循环更新后续位置信息
    for (let i = start + 1; i < length; i++) {
        const item = positions.value[i]
        item.top = positions.value[i - 1].bottom
        item.bottom = item.bottom - startHeight

        //将预估高度与真实高度的差值累加，用以计算之后元素的真实bottom值
        if (item.diffHeight !== 0) {
            startHeight += item.diffHeight
            item.diffHeight = 0
        }
    }
    //更新列表实际高度
    listHeight.value = positions.value[length - 1].bottom
}

const handleScroll = rafThrottle(() => {
    const { scrollTop, scrollHeight, clientHeight } = container.value
    const oldStart = startIndex.value
    const newStart = binarySearch(positions.value, scrollTop)
    startIndex.value = newStart > loadedData.value.length ? oldStart : newStart
    //加载数据...
    const restHeight = scrollHeight - clientHeight - scrollTop
    if (restHeight <= 20) {
        !loading.value && getData().then(res => {
            loadedData.value = [...loadedData.value, ...res]
        })
    }
})

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
//监听已经加载的数据，自动更新列表项位置信息
watch(() => loadedData.value.length, () => {
    initPositions()
    nextTick(() => {
        setPosition()
    })
})

//监听startIndex，自动更新后续列表项的位置信息
watch(startIndex, () => {
    setPosition()
})

onMounted(() => {
    maxSize.value = Math.ceil(container.value.clientHeight / expectedHeight)
    getData().then(res => {
        loadedData.value = [...loadedData.value, ...res]
    })
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
