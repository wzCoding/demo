<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { setSun } from './resouce/three/sea/sun'
import { setSky } from './resouce/three/sea/sky'
import { setWater } from './resouce/three/sea/water'
import { World } from './resouce/three/world'
import { PMREMGenerator,ACESFilmicToneMapping } from 'three'
const canvasBox = ref()
const dataStore = useDataStore()
const loading = ref(true)
const id = "sea"
const world = ref()
async function init(data) {
    const water = setWater(data)
    const sky = setSky(data)
    const sun = setSun(data)

    water.material.uniforms['sunDirection'].value.copy(sun).normalize()
    sky.material.uniforms['sunPosition'].value.copy(sun)

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
            sceneObjects: [water, sky]
        },
        animationList: [water]
    }

    world.value = new World(options)
    const { renderer, scene, control } = world.value.getComponents()
    
    //设置场景环境贴图
    const pmremGenerator = new PMREMGenerator(renderer)
    const renderTarget = pmremGenerator.fromScene(sky)
    if (renderTarget !== undefined) renderTarget.dispose()
    scene.environment = renderTarget.texture

    control.maxPolarAngle = Math.PI * 0.5
    control.target.set(0, 10, 0)
    control.minDistance = 40.0
    control.maxDistance = 200.0

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
