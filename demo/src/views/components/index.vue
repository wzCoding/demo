<template>
    <div class="loading-page">
        <div class="show-item" id="loading-item1"></div>
    </div>
</template>
<script setup>
import { ref, onMounted,h } from 'vue';
import { Loading } from '@/components/Loading';

const examples = [
    {
        func: () => {
            Loading.service({ target: "#loading-item1" })
        }
    }
]
onMounted(() => {
    Loading.service({ target: "#loading-item1", show: true })
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