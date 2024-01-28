<template>
    <div class="loading-page">
        <div class="show-item" id="loading-item1"></div>
    </div>
</template>
<script setup>
import { ref, onMounted,h } from 'vue';
import { Loading } from '@/components/Loading';

onMounted(() => {
    Loading.service({ target: "#loading-item1", show: true,spinner:"123" })
})
</script>
<style lang="scss" scoped>
.loading-page {
    #loading-item1 {
        width: 300px;
        height: 300px;
    }
}
</style>