<template>
    <div id="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getData } from '@/utils/index';
import { myCanvas } from './resouce/canvas';
import { Sea } from './resouce/sea';

const canvasBox = ref(null)
const loading = ref(true)
const id = "waves"
const sea = ref()
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
    sea.value = new Sea(canvas.value);
    getData(id, 'data').then(res => {
        loading.value = false
        sea.value.addWave(res[0][id])
        sea.value.start(60)
    })

})
onUnmounted(() => {
    sea.value.stop()
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