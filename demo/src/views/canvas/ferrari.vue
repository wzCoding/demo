<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { ACESFilmicToneMapping } from "three"
import { World } from './resouce/three/world'
import { loadGlbModel } from './resouce/three/glb/load'
import { setWheels } from "./resouce/three/glb/wheels"
import { createMaterial } from "./resouce/three/glb/material"

const canvasBox = ref()
const dataStore = useDataStore()
const loading = ref(true)
const id = "car"
const world = ref()
async function init(data) {
    // 设置汽车模型
    data.modelPath = "../static/models/ferrari.glb"
    const car = await loadGlbModel(data)
    const { wheels, grid } = setWheels(car)
    setCarMaterial(car, data)
    // 创建场景
    const near = 0.1, far = 100
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 50,
            near,
            far,
            x: 4, y: 1.5, z: -4
        },
        rendererOption: {
            dpr: window.devicePixelRatio,
            size: { width: canvasBox.value.clientWidth, height: canvasBox.value.clientHeight },
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 0.85,
            antialias: true,
        },
        sceneOption: {
            background: "#333333",
            sceneObjects: [car, grid],
            env: true,
            fog: true
        },
        animationList: [...wheels, grid]
    }
    world.value = new World(options)
    const { control } = world.value.getComponents()

    control.maxPolarAngle = Math.PI * 0.45
    control.minDistance = near
    control.maxDistance = far
    control.limitZoom(6, 12)

    world.value.start()

    loading.value = false
}

function setCarMaterial(carModel, data) {
    const { body, glass, detail } = data
    const bodyMaterial = createMaterial('physical', body)
    const detailsMaterial = createMaterial('standard', detail)
    const glassMaterial = createMaterial('physical', glass)

    carModel.getObjectByName('body').material = bodyMaterial

    carModel.getObjectByName('rim_fl').material = detailsMaterial
    carModel.getObjectByName('rim_fr').material = detailsMaterial
    carModel.getObjectByName('rim_rr').material = detailsMaterial
    carModel.getObjectByName('rim_rl').material = detailsMaterial
    carModel.getObjectByName('trim').material = detailsMaterial

    carModel.getObjectByName('glass').material = glassMaterial
}

onMounted(() => {
    dataStore.getPageData(id).then(res => {
        init(res[0])
    })
})

onUnmounted(() => {
    world.value.stop()
})
</script>
