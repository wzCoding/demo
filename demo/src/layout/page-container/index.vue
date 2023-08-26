<script src="./index"></script>
<template>
    <main class="main" :class="{hasPadding:hasSide}">
        <div class="side side-container" v-if="side" :class="{ active: sideActive }" @click="hideSide">
            <div class="side-box">{{ sideActive }}</div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </main>
</template>
<style lang="scss" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &.hasPadding{
        padding-top: var(--header-height);
    }
    .side {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, .5);
        transform: translateX(-100%);
        z-index: 998;
        transition: .3s;

        &.active {
            transform: translateX(0);
        }
        
        .side-box {
            width: 30%;
            height: 100%;
            padding-top: var(--header-height);
            background-color: #fff;
        }
    }

    .content {
        width: 100%;
        height: 100%;
    }
}
</style>