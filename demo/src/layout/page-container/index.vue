<script src="./index"></script>
<template>
    <main class="main" :class="{ hasPadding: hasSide }">
        <template v-if="side">
            <div class="side overlay" :class="{ active: sideActive }" @click="hideSide">
                <div class="side-box">{{ sideActive }}</div>
            </div>
            
        </template>
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
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.hasPadding {
        padding-top: var(--header-height);
    }

    .overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, .5);
        transform: translateX(-100%);
        z-index: 998;
        transition: .3s;

        .side {
            padding-top: var(--header-height);
        }

        &.active {
            transform: translateX(0);
        }
    }

    .content {
        flex: 1;
        height: 100%;
    }

    .side-box {
        width: 30%;
        height: 100%;
        background-color: #69c0ff;
    }
}
</style>