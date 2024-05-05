<template>
    <div class="cubes" ref="cubes">
        <div class="cube-box" ref="cubesBox" :style="cubeBoxStyle">
            <div v-for="i in sums" :key="i" class="cube-item" :style="cubeStyle"></div>
        </div>
        <h1 class="cube-title">wzCoding</h1>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
const cubeSize = 36
const resetNums = 2
const cubes = ref(null)
const cubesBox = ref(null)
const x = ref(0)
const y = ref(0)
const sums = ref(0)
const bucket = []
const cubeBoxStyle = computed(() => {
    return {
        width: `${cubeSize * x.value}px`,
        height: `${cubeSize * y.value}px`
    }
})
const cubeStyle = { width: `${cubeSize}px`, height: `${cubeSize}px` }

const resetCubes = () => {
    for (const cube of bucket) {
        cube.classList.remove('active')
        cube.addEventListener('mouseenter', handleMouseEnter, { once: true })
    }
    bucket.length = 0
}
const handleMouseEnter = (e) => {
    if (e.target.className !== 'cube-item') return

    let random = Math.random() * 2
    e.target.classList.add('active')
    e.target.style.animationDuration = 1 + random + 's'

    bucket.push(e.target)
    if(sums.value - bucket.length <= resetNums){
        resetCubes()
    }
}
onMounted(async () => {
    const { clientWidth, clientHeight } = cubes.value
    x.value = Math.floor(clientWidth / cubeSize)
    y.value = Math.floor(clientHeight / cubeSize)
    sums.value = x.value * y.value
    await nextTick()

    for (const cube of [...cubesBox.value.children]) {
        cube.addEventListener('mouseenter', handleMouseEnter, { once: true })
    }
})
</script>
<style lang="scss" scoped>
.cubes {
    width: 100%;
    height: 100%;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    .cube-title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-size:7.5rem;
    }
    .cube-box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow: hidden;
        
        .cube-item {
            background-color: #222;
            box-shadow: 0 0 1px 1px #000;
            cursor: pointer;
            z-index:1;
            &.active {
                z-index: 2;
                background-color: #0f0;
                box-shadow: 0 0 10px #0f05,
                    0 0 20px #0f08,
                    0 0 30px #0f0c;
                animation: drop 2s linear forwards;
            }
        }

        @keyframes drop {
            from {
                transform: translateY(0) rotate(0deg);
            }

            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    }

}
</style>