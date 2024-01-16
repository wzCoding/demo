<template>
    <div id="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useDataStore } from '@/store/useDataStore';
import { myCanvas } from './resouce/canvas';
import { Rain } from './resouce/rain';

const canvasBox = ref(null)
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "rain"
const rain = ref()
const canvas = ref()
const startRain = (data) => {
    const { text, color } = data
    rain.value.set(text, color)
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
            background: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
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
<style lang="scss" scoped>
#sea {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>