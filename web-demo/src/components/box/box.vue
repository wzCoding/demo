<script src="./box"></script>
<template>
    <div class="container">
        <div class="box">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: relative;
    height: 500px;
    perspective: 2000px;
    background-color: #eee;

    .box {
        transform-style: preserve-3d;
        width: 200px;
        height: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top:-100px;
        margin-left:-100px;
        animation: rotateBox 12s linear infinite;
        &:hover{
            animation-play-state: paused;
        }
        .face {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: transparent;
            border: 1px solid;
            
        }

        .front {
            transform: translateZ(100px);
        }

        .back {
            transform: translateZ(-100px);
        }

        .top {
            transform: rotateX(90deg) translateY(-100px);
            transform-origin: top;
        }

        .bottom {
            transform: rotateX(-90deg) translateY(100px);
            transform-origin: bottom;
        }

        .left {
            transform: rotateY(90deg) translateX(-100px);
            transform-origin: left;
        }

        .right {
            transform: rotateY(-90deg) translateX(100px);
            transform-origin: right;
        }

        @keyframes rotateBox {
            from{
                transform: rotateX(0deg) rotateY(0deg);
            }
            to{
                transform: rotate(360deg) rotateY(360deg);
            }
        }
    }
}</style>