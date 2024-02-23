<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area" :style="{display:'flex',justifyContent:'flex-start'}">
                <icon-button class="popup-btn" size=default type="primary" text="Popup"/>
                <Popup direction="top" target="popup-btn" max-width="700">
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit alias rem ipsam quo quod tempora inventore cumque aliquam! Pariatur expedita, dolorum nemo tenetur at illo debitis sequi hic ut quas.</span>
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
const handleConfirm = () => {
    console.log('click11')
}
</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
    .popup-btn{
        position: relative;
        left:-20px;
    }
}
</style>