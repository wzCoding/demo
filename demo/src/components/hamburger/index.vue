<script src="./index"></script>
<template>
    <div class="hamburger" @click="handleClick">
        <div class="hamburger-button" :class="hamburgerClass">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.hamburger {
    .hamburger-button {
        --hamburger-width: 1.5rem;
        padding: 10px;
        display: flex;
        flex-direction: column;
        cursor: pointer;

        span {
            position: relative;
            display: block;
            width: var(--hamburger-width);
            height: 3px;
            border-radius: 3px;
            transition: all .1s linear;
            @extend .background-gradient;

            &:nth-child(1) {
                top: -4px;
            }

            &:nth-child(3) {
                top: 4px;
            }
        }

        &.center {
            align-items: center;
            span{
                width: var(--hamburger-width) !important;
            }
        }

        &.left {
            align-items: flex-start;
        }

        &.right {
            align-items: flex-end;
        }

        &.active {
            span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            span:nth-child(2) {
                background: transparent;
            }

            span:nth-child(3) {
                width: var(--hamburger-width) !important;
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }

        &.primary {
            span:nth-child(1) {
                top: -4px;
                width: var(--hamburger-width);
            }

            span:nth-child(2) {
                width: calc(var(--hamburger-width) - 10px);
            }

            span:nth-child(3) {
                top: 4px;
                width: calc(var(--hamburger-width) - 5px)
            }

            &:hover {
                span {
                    width: var(--hamburger-width);
                }
            }
        }
    }
}</style>