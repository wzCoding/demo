<template>
    <div class="carousel-page">
        <div class="carousel" ref="carousel">
            <div class="carousel-box" ref="carouselBox" :style="carouselStyle">
                <div class="carousel-item">1</div>
                <div class="carousel-item">2</div>
                <div class="carousel-item">3</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { Timer } from '@/utils/timer'

let timer = new Timer()
const loop = ref(true)
const carousel = ref(null)
const carouselBox = ref(null)
const activeIndex = ref(0)
const defaultLength = ref(0)
const carouselStyle = computed(() => {
    const translate = activeIndex.value > 0 ? `${-activeIndex.value}00%` : 0
    return {
        transform: `translateX(${translate})`,
        transition: 'transform 0.5s ease-in-out'
    }
})
// 设置无缝轮播 dom 结构
const setCarousel = () => {
    const firstNode = carouselBox.value.children[0]
    const lastNode = carouselBox.value.children[carouselBox.value.children.length - 1]
    carouselBox.value.insertBefore(lastNode.cloneNode(true), firstNode)
    carouselBox.value.appendChild(firstNode.cloneNode(true))
}

// 更新轮播图
const updateCarousel = () => {
    moveForward()
}
//向前移动
const moveForward = () => {
    if(activeIndex.value === defaultLength.value){
        activeIndex.value = 0
        return true
    }
    activeIndex.value++
}
//向后移动
const moveBackward = () => {
    if(activeIndex.value === -1){
        activeIndex.value = defaultLength.value - 1
        return true
    }
    activeIndex.value--
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
    //timer.interval(updateCarousel, 1000)

    //carousel.value.addEventListener('mousemove', handleMouseDown)
})
</script>
<style lang="scss" scoped>
.carousel-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;

    .carousel {
        width: 200px;
        height: 100px;
        //overflow: hidden;
        border: 4px solid #f00;
        box-sizing: content-box;
        z-index: 3;
    }

    .carousel-box {
        position: relative;
        white-space: nowrap;

        .carousel-item {
            width: 100%;
            height: 100%;
            line-height: 100px;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            font-size: 48px;
            color: #333;

            &[data-index="0"] {
                background-color: #409eff;
            }

            &[data-index="1"] {
                background-color: wheat;
            }

            &[data-index="2"] {
                background-color: rgb(153, 239, 210);
            }
        }
    }

}
</style>