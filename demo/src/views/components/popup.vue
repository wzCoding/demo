<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area">
                <icon-button class="popup-btn" size=default type="primary" text="Popup" @click="handleClick"/>
                <Popup target="popup-btn">
                    <span>123</span>
                </Popup>
            </div>
        </div>
    </div>
</template>
<script setup>
import Popup from '@/components/Popup/template'
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo'
const handleClick = () => {
    console.log('click11')
}
</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>