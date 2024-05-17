<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useDataStore } from '@/store/useDataStore';
import { myCanvas } from './resouce/canvas/canvas';
import { Waves } from './resouce/canvas/waves';

const canvasBox = ref()
const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
const id = "waves"
const canvas = ref()
const waves = ref()
const startWaves = (data) => {
    waves.value.addWave(data[id])
    waves.value.addCloud(data['clouds'])
    waves.value.addSun(data['sun'])
    waves.value.start(60)
}
const stopWaves = () => {
    waves.value.stop()
    waves.value = null
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
    waves.value = new Waves(canvas.value);
    dataStore.getPageData(id).then(res => {
        startWaves(res[0])
    })

})
onUnmounted(() => {
    stopWaves()
})
</script>
