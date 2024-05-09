<template>
    <div class="carousel-page">
        <div class="carousel" ref="carousel">
            <div class="carousel-box" ref="carouselBox" :style="carouselStyle">
                <div class="carousel-item" data-index="0">1</div>
                <div class="carousel-item" data-index="1">2</div>
                <div class="carousel-item" data-index="2">3</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { Timer } from '@/utils/timer'

let timer = new Timer()
const carousel = ref(null)
const carouselBox = ref(null)
const carouselStyle = ref(null)
const activeCarousel = ref(0)
// 设置轮播图
const setCarousel = () => {
    activeCarousel.value = carouselBox.value.children[0].dataset.index
    const firstNode = carouselBox.value.children[0]
    const lastNode = carouselBox.value.children[carouselBox.value.children.length - 1]
    carouselBox.value.insertBefore(lastNode.cloneNode(true), firstNode)
    carouselBox.value.appendChild(firstNode.cloneNode(true))
}
// 更新轮播图
const updateCarousel = () => {
    console.log('updateCarousel:', activeCarousel.value)
    if (activeCarousel.value >= carouselBox.value.children.length) {
        activeCarousel.value = 0
    }
    activeCarousel.value++
    carouselStyle.value = {
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(${-(carousel.value.offsetWidth || 0) * activeCarousel.value}px)`
    }
}
onMounted(() => {
    setCarousel()
    //timer.interval(updateCarousel, 1000)
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
        width: 400px;
        height: 200px;
        //overflow: hidden;
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