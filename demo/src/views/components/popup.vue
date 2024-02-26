<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area" :style="{display:'flex',justifyContent:'center'}">
                <icon-button class="popup-btn" size=default type="primary" text="Popup"/>
                <Popup direction="left" target="popup-btn">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sint rerum magni, nam ullam quibusdam, voluptate dicta, officiis odio voluptates animi facere reiciendis at quisquam magnam autem consequuntur quae quasi!</span>
                </Popup>
                <!-- <icon-button class="popup-btn1" size=default type="primary" text="Popup"/>
                <Popup direction="bottom" target="popup-btn1" trigger="hover">
                    <span>11黄家驹交汇处机场集合好像很喜欢教育促进4</span>
                </Popup> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import Popup from '@/components/Popup/template'
// import Popup from '@/components/Popper/template'
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo'
const handleConfirm = () => {
    console.log('click11')
}
</script>
<style lang="scss" scoped>
.display-area {
    //height:3000px;
    &:nth-child(1) {
        gap: 1rem;
    }
    .popup-btn{
        position: relative;
        //left:-20px;
    }
}
</style>