<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { ACESFilmicToneMapping, EquirectangularReflectionMapping, Fog } from "three"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { World } from './resouce/three/world'
import { loadCarModel } from './resouce/three/car/car'
import { setWheels } from "./resouce/three/car/wheels"

const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "car"
const world = ref()
async function init(data) {
    const car = await loadCarModel(data)
    const { wheels, grid } = setWheels(car)
    const near = 0.1,far = 100
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
            sceneObjects: [car, grid]
        },
        animationList: [...wheels, grid]
    }
    world.value = new World(options)
    const { scene,control } = world.value.getComponents()
    const rgbeLoader = new RGBELoader()
    const loadEnv = async () => {
        return await rgbeLoader.loadAsync('../static/texture/venice_sunset_1k.hdr')
    }
    scene.environment = await loadEnv()
    scene.environment.mapping = EquirectangularReflectionMapping;
    scene.fog = new Fog("#333333", 10, 15);

    control.maxPolarAngle = Math.PI * 0.45
    control.minDistance = near
    control.maxDistance = far

    world.value.start()
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
