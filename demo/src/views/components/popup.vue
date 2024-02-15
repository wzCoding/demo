<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area" :style="{display:'flex'}">
                <icon-button class="popup-btn" size=default type="primary" text="Popup"/>
                <Popup direction="bottom" target="popup-btn">
                    <span>11黄家驹交汇处机场集合好像很喜欢教育促进3</span>
                </Popup>
                <icon-button class="popup-btn1" size=default type="primary" text="Popup"/>
                <Popup direction="bottom" target="popup-btn1" trigger="hover">
                    <span>11黄家驹交汇处机场集合好像很喜欢教育促进4</span>
                </Popup>
            </div>
        </div>
    </div>
</template>
<script setup>
import Popup from '@/components/Popup/template'
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo'
// const handleClick = () => {
//     console.log('click11')
// }
</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>