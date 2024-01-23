<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { loadBirds } from './resouce/three/birds/birds'
import { ACESFilmicToneMapping, PMREMGenerator } from "three"
import { World } from './resouce/three/world'
import { setSky } from './resouce/three/sea/sky'
import { setSun } from './resouce/three/sea/sun'

const canvasBox = ref()
const dataStore = useDataStore()
const loading = ref(true)
const id = "birds"
const world = ref()
async function init(data) {
    //设置鸟类
    const { Parrot, Flamingo, Stork } = await loadBirds(data)

    //设置天空环境
    const sun = setSun()
    const sky = setSky({
        skyWidth: 20000,
        turbidity: 1.2,
        rayleigh: 5,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8
    })
    sky.material.uniforms['sunPosition'].value.copy(sun)

    const near = 5, far = 1000
    const options = {
        el: canvasBox.value,
        cameraOption: {
            fov: 35,
            near,
            far,
            aspect: canvasBox.value.clientWidth / canvasBox.value.clientHeight,
            x: 30, y: 0, z: 100
        },
        rendererOption: {
            dpr: window.devicePixelRatio,
            size: { width: canvasBox.value.clientWidth, height: canvasBox.value.clientHeight },
            toneMapping: ACESFilmicToneMapping
        },
        sceneOption: {
            needLights: [{ type: 'main', strength: 5 }, { type: 'ambi', strength: 2 }],
            sceneObjects: [sky, Parrot, Flamingo, Stork]
        },
        animationList: [Parrot, Flamingo, Stork]
    }
    world.value = new World(options)

    const { renderer, scene, control } = world.value.getComponents()
    const pmremGenerator = new PMREMGenerator(renderer)
    const renderTarget = pmremGenerator.fromScene(sky)
    if (renderTarget !== undefined) renderTarget.dispose()
    scene.environment = renderTarget.texture

    control.target.copy(Parrot.position)
    control.minDistance = near
    control.maxDistance = far
    control.limitZoom(25, 100)
    world.value.start()

    loading.value = false

}
onMounted(() => {
    dataStore.getPageData(id).then(res => {
        init(res)
    })
})
onUnmounted(() => {
    world.value.stop()
})
</script>
