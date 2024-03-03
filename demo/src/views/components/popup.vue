<template>
    <div class="components-popup components-page">
        <div class="item">
            <div class="display-area" :style="{display:'flex',justifyContent:'flex-end',alignItems:'center'}">
                <icon-button class="popup-btn" size=default type="primary" text="Popup"/>
                <Popup direction="top" target="popup-btn" max-width="400">
                   <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, adipisci. Sequi placeat beatae distinctio, obcaecati saepe labore et! Eius minus itaque modi quod nam facere sapiente perferendis debitis cum iste.
                   Quibusdam perspiciatis nesciunt libero, natus temporibus nam delectus, maiores dolorem repudiandae facere nisi numquam voluptatem magni. Ipsum expedita magnam animi rem illum! Vitae, quis. Sint nobis velit eos? A, repellendus.
                   Dolorum odio amet voluptate maiores quam non aliquid eligendi hic sint impedit commodi illo, obcaecati temporibus debitis officia voluptas sit quis optio! Officia voluptatum rem fugiat dignissimos hic a veritatis.
                   Fugit, ratione molestiae at inventore cumque repellendus recusandae architecto rerum voluptates voluptatem eum odit provident vitae? Sapiente fuga ipsam minima magnam eaque adipisci necessitatibus tenetur vitae libero quos, blanditiis provident!
                   Sed
                   </span>
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
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo'
const handleConfirm = () => {
    console.log('click11')
}
</script>
<style lang="scss" scoped>
.display-area {
    height:100%;
    &:nth-child(1) {
        gap: 1rem;
    }
    .popup-btn{
        position: relative;
    }
}
</style>