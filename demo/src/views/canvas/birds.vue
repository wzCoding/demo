<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '@/store/useDataStore';
import { loadBirds } from './resouce/three/birds/birds';
import { ACESFilmicToneMapping } from "three";
import { World } from './resouce/three/world';

const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "birds"
async function init(data, scene, loop, control) {
    console.log("animation init !!!");
    const { parrot, flamingo, stork } = await loadBirds(data);
    control.target.copy(parrot.position);
    scene.add(parrot, flamingo, stork);
    loop.updateList.push(parrot, flamingo, stork);
}
onMounted(() => {

    const options = {
        el: document.querySelector(".canvas-box"),
        cameraOption: {
            fov: 35,
            near: 10,
            far: 20000,
            x: 10, y: 0, z: 100
        },
        rendererOption: {
            setPixelRatio: window.devicePixelRatio,
            setSize: { width: window.innerWidth, height: window.innerHeight },
            toneMapping: ACESFilmicToneMapping
        },
    }
    const world = new World(options);
    const { scene, loop, control } = world.getComponents();
    dataStore.getPageData(id).then(res => {
        init(res, scene, loop, control)
    })
})
</script>
