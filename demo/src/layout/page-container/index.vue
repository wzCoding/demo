<script src="./index"></script>
<template>
    <main class="main">
        <div class="aside" v-show="hasAside">
          
        </div>
        <div class="content">
            <slot></slot>
          
            <div>{{ state }}</div>
        </div>
    </main>
</template>
<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .aside {
        width: 30%;
        height: 100%;
    }

    .content {
        flex: 1;
        height: 100%;
    }
}
</style>