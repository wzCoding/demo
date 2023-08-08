<script src="./index"></script>
<template>
    <div class="btn-container" :class="btnClass" :style="{ flexDirection: btnDir }">
        <span v-if="btnIcon" class="btn-icon">
            <slot name="icon">
                <img :src="btnIcon" alt="btn-icon">
            </slot>
        </span>
        <span class="btn-text">
            <slot>{{ text }}</slot>
        </span>
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
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-text {
        font-size: 1rem;
    }
    &.btn-vertical{
        gap:.3rem 0;
    }
    &.btn-horizontal{
        gap:0 .3rem;
    }
}
</style>