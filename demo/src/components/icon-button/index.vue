<script src="./index"></script>
<template>
    <div class="btn-container" :style="styleObj">
        <span v-if="btnIcon" class="btn-icon">
            <slot name="icon">
                <img :src="btnIcon" alt="btn-icon">
            </slot>
        </span>
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: .3s;

    .btn-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 2rem;
        }
    }

    &.primary {
        &::after {
            position: absolute;
            top: 1px;
            left: 1px;
            bottom: 1px;
            right: 1px;
            background: #fff;
        }
    }
}</style>