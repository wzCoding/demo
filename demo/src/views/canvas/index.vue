<template>
    <div id="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { getData } from '@/utils/index';
import { myCanvas } from './resouce/canvas';
import { Sea } from './resouce/sea';

const canvasBox = ref(null)
const canvas = ref(null)
const waves = ref(null)
const sea = ref(null)
const loading = ref(true)
getData('waves', 'data').then(res => {
    waves.value = res;
    loading.value = false
})
watch(waves, (newVal) => {
    sea.value.addWave(newVal)
    sea.value.start(60)
})
onMounted(() => {
    canvas.value = new myCanvas({
        id: 'waves',
        parent: canvasBox.value,
        width: canvasBox.value.clientWidth,
        height: canvasBox.value.clientHeight,
        styles: {
            background: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
            transition: "all 0.3s"
        }
    });
    sea.value = new Sea(canvas.value);
})
onUnmounted(() => {
    
    sea.value.stop()
    waves.value = null
    sea.value = null
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