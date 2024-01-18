<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/store/useDataStore'
import { loadBirds } from './resouce/three/birds/birds'
import { ACESFilmicToneMapping } from "three"
import { World } from './resouce/three/world'

const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "birds"
const world = ref()
async function init(data) {
    const { loop, scene, control } = world.value.getComponents()
    const { Parrot, Flamingo, Stork } = await loadBirds(data)
    
    control.target.copy(Parrot.position)
    scene.add(Parrot, Flamingo, Stork)
    loop.updateList.push(Parrot, Flamingo, Stork)
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
            background:"#a0cfff",
            needLights: true,
        }
    }
    world.value = new World(options)
    dataStore.getPageData(id).then(res => {
        world.value.start()
        init(res)
    })
})
onUnmounted(()=>{
    world.value.stop()
})
</script>
