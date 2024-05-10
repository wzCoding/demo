<template>
    <div class="carousel-page">
        <div class="carousel" ref="carousel">
            <div class="carousel-box" ref="carouselBox" :style="carouselStyle">
                <div class="carousel-item">1</div>
                <div class="carousel-item">2</div>
                <div class="carousel-item">3</div>
                <div class="carousel-item">4</div>
                <div class="carousel-item">5</div>
            </div>
            <div class="controls">
                <div class="backward" @click="moveBackward">{{ `⟨` }}</div>
                <div class="forward" @click="moveForward">{{ `⟩` }}</div>
            </div>
            <div class="indicators">
                <span v-for="i in defaultLength" :key="i" :class="{ active: i === activeIndex }"
                    @click="moveTo(i)"></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { Timer } from '@/utils/timer'

let timer = new Timer()
const carouselTimer = ref(null)

// 设置轮播图的一些默认属性
const loop = ref(true)
const autoPlay = ref(true)

const carousel = ref(null)
const carouselBox = ref(null)
const defaultLength = ref(0)

const activeIndex = ref(0)
const startIndex = ref(0)
const endIndex = ref(0)

const carouselStyle = computed(() => {
    return {
        transform: `translateX(${-activeIndex.value}00%)`,
        transition: 'transform 0.5s ease-in-out'
    }
})
// 设置无缝轮播 dom 结构
const setCarousel = () => {
    //设置背景色
    Array.from(carouselBox.value.children).forEach(item => {
        item.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    })
    if (loop.value) {
        //设置开始索引
        activeIndex.value = startIndex.value = 1
        // 克隆第一张和最后一张
        const firstNode = carouselBox.value.children[0]
        const lastNode = carouselBox.value.children[carouselBox.value.children.length - 1]
        carouselBox.value.insertBefore(lastNode.cloneNode(true), firstNode)
        carouselBox.value.appendChild(firstNode.cloneNode(true))
        //设置结束索引
        endIndex.value = carouselBox.value.children.length - 1
    }

    if (autoPlay.value) {
        updateCarousel()
    }
}
const updateCarousel = () => {
    carouselTimer.value = timer.interval(moveForward, 1000)
    carousel.value.addEventListener('mouseenter', () => {
        // 清除定时器
        timer.clear(carouselTimer.value)
    })
    carousel.value.addEventListener('mouseleave', () => {
        // 重新设置定时器
        carouselTimer.value = timer.interval(moveForward, 1000)
    })
}
//向前移动
const moveForward = () => {
    if (activeIndex.value === defaultLength.value) {
        activeIndex.value = startIndex.value - 1
        // 设置过渡效果为 none，以便瞬间跳转到起始位置
        carouselBox.value.style.transition = `none`
        carouselBox.value.style.transform = `translateX(${-activeIndex.value}00%)`
        // 强制渲染
        carouselBox.value.getBoundingClientRect()
        // 从起始位置前进
        moveTo(activeIndex.value + 1)
    } else {
        // 从起始位置前进
        moveTo(activeIndex.value + 1)
    }
}
//向后移动
const moveBackward = () => {
    if (activeIndex.value === startIndex.value) {
        activeIndex.value = endIndex.value
        // 设置过渡效果为 none，以便瞬间跳转到结束位置
        carouselBox.value.style.transition = `none`
        carouselBox.value.style.transform = `translateX(${-activeIndex.value}00%)`
        // 强制渲染
        carouselBox.value.getBoundingClientRect()
        // 从结束位置后退
        moveTo(activeIndex.value - 1)
    } else {
        // 从结束位置后退
        moveTo(activeIndex.value - 1)
    }
}
//移动到指定位置
const moveTo = (index) => {
    activeIndex.value = index
}

const handleMouseUp = (e) => {
    console.log(e)
}
const handleMouseDown = (e) => {
    console.log(e)
}
onMounted(() => {
    defaultLength.value = carouselBox.value.children.length
    // 设置轮播图
    setCarousel()
})
onBeforeUnmount(() => {
    // 清除定时器
    timer.clear(carouselTimer.value)
    timer = null
})
</script>
<style lang="scss" scoped>
.carousel-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-items: center;

    .carousel {
        width: 400px;
        height: 200px;
        overflow: hidden;
        border: 4px solid #000;
        box-sizing: content-box;
        position: relative;
        z-index: 1;
    }

    .carousel-box {
        position: relative;
        white-space: nowrap;

        .carousel-item {
            width: 100%;
            height: 100%;
            line-height: 200px;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            font-size: 48px;
            color: #333;
        }
    }

    .controls {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;

        div {
            width: 30px;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            color: #fff;
            cursor: pointer;
        }

        .backward {
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
        }

        .forward {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            margin: 0 5px;
            cursor: pointer;

            &.active {
                background-color: #ddd;
            }
        }

    }
}
</style>
