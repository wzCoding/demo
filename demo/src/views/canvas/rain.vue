<template>
    <div id="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getData } from '@/utils/index';
import { myCanvas } from './resouce/canvas';
import { Rain } from './resouce/rain';

const canvasBox = ref(null)
const loading = ref(true)
const id = "rain"
const rain = ref()
const canvas = ref()
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
    
    getData(id, 'data').then(res => {
        loading.value = false
        rain.value = new Rain(canvas.value);
        rain.value.start(60)
    })

})
onUnmounted(() => {
    rain.value.stop()
    rain.value = null
    canvas.value = null
})
</script>
<style lang="scss" scoped>
#sea {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>