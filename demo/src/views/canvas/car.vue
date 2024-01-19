<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { ACESFilmicToneMapping } from "three"
import { World } from './resouce/three/world'
import { loadCarModel } from './resouce/three/car/car'
const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "car"
const world = ref()
async function init(data) {
    console.log(data)
    const car = loadCarModel(data)
    console.log(car)
}
onMounted(() => {
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 35,
            near: 5,
            far: 10000,
            aspect: canvasBox.value.clientWidth / canvasBox.value.clientHeight,
            x: 10, y: 0, z: 100
        },
        rendererOption: {
            dpr: window.devicePixelRatio,
            size: { width: canvasBox.value.clientWidth, height: canvasBox.value.clientHeight },
            toneMapping: ACESFilmicToneMapping
        },
        sceneOption: {
            background: "#a0cfff",
            needLights: true,
        }
    }
    //world.value = new World(options)
    dataStore.getPageData(id).then(res => {
        // world.value.start()
        init(res[0])
    })
})
onUnmounted(() => {
    //world.value.stop()
})
</script>
