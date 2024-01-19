<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { setSun } from './resouce/three/sea/sun'
import { setSky } from './resouce/three/sea/sky'
import { setWater } from './resouce/three/sea/water'
import { World } from './resouce/three/world'
import { ACESFilmicToneMapping } from 'three'
const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "sea"
const world = ref()
async function init(data) {
    const water = setWater(data)
    const sky = setSky(data)
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 55,
            near: 5,
            far: 20000,
            x: 30, y: 30, z: 100
        },
        rendererOption: {
            dpr: window.devicePixelRatio,
            size: { width: canvasBox.value.clientWidth, height: canvasBox.value.clientHeight },
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure:0.5
        },
        sceneOption: {
            needLights: false,
            sceneObjects: [water, sky]
        },
        animationList: [water]
    }

    world.value = new World(options)
    const { renderer, scene, control } = world.value.getComponents()

    setSun({ scene, renderer, elevation: data.elevation, azimuth: data.azimuth })
    control.maxPolarAngle = Math.PI * 0.495
    control.target.set(0, 10, 0)
    control.minDistance = 40.0
    control.maxDistance = 200.0

    world.value.start()
}
onMounted(() => {
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 35,
            near: 5,
            far: 10000,
            x: 10, y: 0, z: 100
        },
        rendererOption: {
            dpr: window.devicePixelRatio,
            size: { width: canvasBox.value.clientWidth, height: canvasBox.value.clientHeight },
            toneMapping: ACESFilmicToneMapping
        },
        sceneOption: {
            needLights: true,
        }
    }
    dataStore.getPageData(id).then(res => {
        init(res[0], options)
    })
})
onUnmounted(() => {
    world.value.stop()
})
</script>
