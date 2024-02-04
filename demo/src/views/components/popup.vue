<template>
    <div class="components-popup components-page">
        <Popup />
    </div>
</template>
<script setup>
import Popup from '@/components/Popup'
import CodeDemo from '@/components/CodeDemo'

</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>