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

const canvasBox = ref()
const dataStore = useDataStore()
const loading = ref(true)
const id = "suv"
const world = ref()
async function init(data) {
    data.modelPath = "../static/models/suv.glb"
    const car = await loadGlbModel(data)
    const { wheels, grid } = setWheels(car)
    const near = 0.1, far = 100
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 50,
            near,
            far,
            x: -5, y:5, z: 5,
            aspect: canvasBox.value.clientWidth / canvasBox.value.clientHeight,
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
            needLights: [
                { type: 'main', strength: 8, x: -6, y: 1, z: 0.3 },
                { type: 'main', strength: 6, x: 4, y: 6, z: 0.4 },
            ],
            sceneObjects: [car, grid],
            env:true,
            fog:true,
        },
        animationList: [...wheels, grid]
    }
    world.value = new World(options)
    const { control } = world.value.getComponents()
   
    control.maxPolarAngle = Math.PI * 0.45
    control.minDistance = near
    control.maxDistance = far
    control.limitZoom(6,12)
    
    world.value.start()

    loading.value = false
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
