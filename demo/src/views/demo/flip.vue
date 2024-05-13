<template>
    <div class="flip">
        <e-button size=default type="primary" @click="handleClick">随机排序</e-button>
        <div class="flip-box" ref="flipBox">
            <div class="flip-item" v-for="i in 36" :key="i">{{ i }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import EButton from '@/components/Button'

const flipBox = ref(null)
const beforeMove = (item) => {
    const rect = item.getBoundingClientRect()
    item.startX = rect.left
    item.startY = rect.top
}
const randomSort = (item, index) => {
    const random = Math.floor(Math.random() * flipBox.value.children.length)
    if (index !== random) {
        // 获取当前dom的下一个元素
        const nextDom = item.nextElementSibling
        // 获取随机下标的元素
        const randomDom = flipBox.value.children[random]
        // 将随机下标的元素插入当前元素之前
        flipBox.value.insertBefore(item, randomDom)
        // 将当前元素的下一个元素插入随机下标的元素之前
        flipBox.value.insertBefore(randomDom, nextDom)
    }
}
const startMove = (item) => {
    const rect = item.getBoundingClientRect()
    item.animate(
        [
            { transform: `translate(${item.startX - rect.left}px, ${item.startY - rect.top}px)` },
            { transform: `translate(0px, 0px)` }
        ],
        {
            duration: 500,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    )
}

const handleClick = () => {
    Array.from(flipBox.value.children).forEach((item, index) => { 
        beforeMove(item)
        randomSort(item, index)
        startMove(item)
    })
}

</script>
<style lang="scss" scoped>
.flip {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    background-color: #333;
    .flip-box {
        width: 360px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-sizing: border-box;
        .flip-item {
            width: 50px;
            height: 50px;
            text-align: center;
            background: #d9ecff;
            box-shadow: 0 0 1px 1px #409eff;
            border-radius: 4px;
            line-height: 50px;
            margin:5px;
        }
    }
}
</style>
