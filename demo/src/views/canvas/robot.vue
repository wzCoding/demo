<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { ACESFilmicToneMapping } from "three"
import { World } from './resouce/three/world'
import { loadGlbModel } from './resouce/three/glb/load'
import { setGrid } from './resouce/three/glb/grid'
const canvasBox = ref()
const dataStore = useDataStore()
const loading = ref(true)
const id = "robot"
const world = ref()
async function init(data) {
    data.modelPath = "../static/models/robot.glb"
    const robot = await loadGlbModel(data)
    const grid = setGrid()
    robot.position.set(0, 0, 0)
    const near = 1, far = 100
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 45,
            near,
            far,
            x: 3, y: 8, z: 10,
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
            sceneObjects: [robot, grid],
            env: true,
            fog: true,
        },
    }
    world.value = new World(options)
    const { control } = world.value.getComponents()

    control.maxPolarAngle = Math.PI * 0.75
    control.minDistance = near
    control.maxDistance = far
    control.limitZoom(6, 12)

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
