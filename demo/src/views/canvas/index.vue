<template>
    <div id="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useDataStore } from '@/store/useDataStore';
import { myCanvas } from './resouce/canvas';
import { Sea } from './resouce/sea';

const canvasBox = ref(null)
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "waves"
const canvas = ref()
const sea = ref()
const startWaves = (data) => {
    sea.value.addWave(data)
    sea.value.start(60)
}
const stopWaves = () => {
    sea.value.stop()
    sea.value = null
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
    sea.value = new Sea(canvas.value);
    dataStore.getPageData(id).then(res => {
        startWaves(res[0][id])
    })

})
onUnmounted(() => {
    stopWaves()
})
</script>
<style lang="scss" scoped>
#sea {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>