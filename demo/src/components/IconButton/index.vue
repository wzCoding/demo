<script src="./index"></script>
<template>
    <div class="icon-btn" :style="styleObj">
        <span v-if="btnIcon" class="icon">
            <slot name="icon">
                <img :src="btnIcon" alt="icon">
            </slot>
        </span>
        <span v-if="text" class="text">{{ text }}</span>
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.icon-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: .3s;

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 2rem;
        }
    }
    .text{
        display:block;
    }
}
</style>