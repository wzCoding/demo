<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area" :style="{display:'flex'}">
                <icon-button class="popup-btn" size=default type="primary" text="Popup" @click="handleClick"/>
                <Popup direction="bottom" target="popup-btn" width="300" height="180">
                    <span>113156465416165849161651</span>
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