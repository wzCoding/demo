<template>
    <div class="canvas-box" ref="canvasBox" v-loading="loading"></div>
</template>
<script setup>
import { ref,computed } from 'vue';
import { useDataStore } from '@/store/useDataStore';

const dataStore = useDataStore()
const loading = computed(() => dataStore.loading)
</script>
