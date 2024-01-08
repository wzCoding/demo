<script src="./index"></script>
<template>
    <div class="page-menu">
        <div class="menu-button" :style="buttonStyle" :class="{ active: active }" @click="handleClick">
            <span :style="iconStyle">
                <svg t="1693220439194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6958" width="32" height="32">
                    <path
                        d="M473.744 541.92a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.744z m322.784 0a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16h-249.76a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.76z m-354.784 48H256v185.728h185.744V589.92z m322.784 0h-185.76v185.728h185.76V589.92zM676.528 208a152 152 0 1 1 0 304 152 152 0 0 1 0-304z m-202.784 11.136a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V235.136a16 16 0 0 1 16-16h249.744zM676.528 256a104 104 0 1 0 0 208 104 104 0 0 0 0-208z m-234.784 11.136H256v185.728h185.744V267.136z"
                        p-id="6959"></path>
                </svg>
            </span>
        </div>
        <transition name="scale">
            <div class="menu" v-show="active" :style="transformStyle">
                <div class="menu-content"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.menu-button {
    width: 3.75rem;
    height: 3.75rem;
    cursor: pointer;
    z-index: 5;
    transition: all .2s linear;
    z-index: 998;
    opacity: 0.5;
    box-shadow: 0px 5px 20px 0px var(--theme-box-shadow-color);
    background: transparent;
    outline: none;

    &.active {
        opacity: 1;
        @extend .box-gradient;

        .icon {
            fill: #fff;
        }
    }

    &:hover {
        @extend .active
    }

    span {
        .icon {
            fill: var(--theme-gradient-color-2);
            width: 2rem;
        }
    }
}

.menu {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.scale-enter-active, .scale-leave-active {
    transform: scale(1);
    transition: all var(--transition-time) cubic-bezier(0.075, 0.82, 0.165, 1);
}
.scale-enter-from, .scale-leave-to {
    transform: scale(0);
}
</style>