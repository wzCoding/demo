<template>
    <div class="waterfall" ref="waterfall">
        <div class="waterfall-box" ref="waterfallBox">
            <div class="waterfall-item" v-for="item in 50" :key="item">
                {{ item }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted,onBeforeUnmount } from 'vue'
import { getRandom, getRandomColor, debounce } from '@/utils/index'

//设置默认属性
const maxHeight = 300, minHeight = 100
const defaultWidth = 200, defaultGap = 10, difference = 30

const waterfall = ref(null)
const waterfallBox = ref(null)

//模拟设置随机高度
const setItemHeight = () => {
    Array.from(waterfallBox.value.children).forEach(item => {
        item.style.height = `${getRandom(minHeight, maxHeight)}px`
        item.style.backgroundColor = getRandomColor(0.5)
    })
}

//列数相关数据
let count = 0
let columns = 0
const columnsHeight = []

const setItemStyle = (item,width) => {
    if (count === columns) {
        count = 0
    }
    let top = columnsHeight[count]
    if (top !== 0) {
        top = top + defaultGap
    }

    item.style.width = `${width}px`
    item.style.transform = `translate(${(width + defaultGap) * count}px, ${top}px)`
    columnsHeight[count] = top + item.clientHeight
    waterfallBox.value.style.height = `${Math.max(...columnsHeight)}px`

    count++
}
//计算宽度
const getWidth = (parentWidth, columns, gap) => {
    //计算列间距总和
    const totalGaps = (columns - 1) * gap
    //计算列宽
    const width = Math.min((parentWidth - totalGaps) / columns, defaultWidth)

    return {
        width,
        totalGaps
    }
}
//初始化列数
const initColumns = () => {
    //初始化
    count = 0
    columnsHeight.length = 0
    //获取父元素
    const parent = waterfall.value
    //获取父元素宽度
    const parentWidth = parent.clientWidth
    //计算最大列数
    columns = Math.max(Math.ceil(parentWidth / (defaultWidth + defaultGap)), 1)

    let { width } = getWidth(parentWidth, columns, defaultGap)
    
    //根据差值重新计算列数，确保子元素宽度变化在差值之内
    //如果宽度变大，则增加列数重新计算以缩小宽度
    if (width > defaultWidth && width - defaultWidth > difference) {
        columns++
    }
    //如果宽度变小，则减少列数重新计算以增加宽度
    if (width < defaultWidth && width + difference < defaultWidth) {
        columns--
    }

    columnsHeight.length = columns
    columnsHeight.fill(0, 0, columns)

    width = getWidth(parentWidth, columns, defaultGap).width
    let totalGaps = getWidth(parentWidth, columns, defaultGap).totalGaps

    waterfallBox.value.style.width = `${width * columns + totalGaps}px`

    Array.from(waterfallBox.value.children).forEach(item => {
        setItemStyle(item, width)
    })
}
const resize = debounce(initColumns, 100)

onMounted(() => {
    setItemHeight()
    initColumns()
    window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
})

</script>
<style lang="scss" scoped>
.waterfall {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .waterfall-box {
        position: relative;

        .waterfall-item {
            background-color: #ccc;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-size: 20px;
            box-sizing: border-box;
            border: 1px solid #000;
            box-shadow: 0 0 5px #333;
            transition: transform 0.3s, width 0.3s;
        }
    }
}
</style>
