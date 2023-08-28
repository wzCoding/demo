<script src="./index"></script>
<template>
    <main class="main">
        <div class="back" @click="back">
            <span>×</span>
        </div>
        <div class="content">
            <RouterView />
        </div>
    </main>
</template>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.main {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0px 0px 35px -5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    top: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    z-index: 997;
    background-color: var(--theme-page-background);

    .back {
        position: absolute;
        top: 0;
        right: 25px;
        padding:0 5px 5px 5px;
        color: #fff;
        border: 0;
        font-size:1.5rem;
        border-radius: 0 0 15px 15px;
        -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
        z-index: 998;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        @extend .box-gradient;
        
        img{
            width: 1rem;
        }
    }

    .content {
        flex: 1;
        height: 100%;
    }
}
</style>