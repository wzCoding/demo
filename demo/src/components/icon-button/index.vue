<script src="./index"></script>
<template>
    <div class="btn-container" :style="{ flexDirection: btnDir }">
        <span class="btn-icon">
            <slot name="icon">
                <img :src="btnIcon" alt="btn-icon">
            </slot>
        </span>
        <span class="btn-text"><slot>{{ text }}</slot></span>
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

    .btn-icon{
        width: 2rem;
    }
    .btn-text{
        font-size: 1rem;
    }
}
</style>