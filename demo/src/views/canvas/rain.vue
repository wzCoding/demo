<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useDataStore } from '@/store/useDataStore';
import { myCanvas } from './resouce/canvas/canvas';
import { Rain } from './resouce/canvas/rain';

const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "rain"
const rain = ref()
const canvas = ref()
const startRain = (data) => {
    rain.value.set(data)
    rain.value.start(60)
}
const stopRain = () => {
    rain.value.stop()
    rain.value = null
    canvas.value = null
}
onMounted(() => {
    canvas.value = new myCanvas({
        id,
        parent: canvasBox.value,
        width: canvasBox.value.clientWidth,
        height: canvasBox.value.clientHeight,
        styles: {
            transition: "all 0.3s"
        }
    });
    rain.value = new Rain(canvas.value)
    dataStore.getPageData(id).then(res => {
        startRain(res[0])
    })
})
onUnmounted(() => {
   stopRain()
})
</script>