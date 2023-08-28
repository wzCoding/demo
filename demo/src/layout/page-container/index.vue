<script src="./index"></script>
<template>
    <main class="main">
        <div class="back" @click="back">
            <span>×</span>
        </div>
        <div class="menu-button" :class="{ active: menuActive }" @click="showMenu">
            <span>
                <svg t="1693220439194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6958" width="32" height="32">
                    <path
                        d="M473.744 541.92a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.744z m322.784 0a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16h-249.76a16 16 0 0 1-16-16V557.92a16 16 0 0 1 16-16h249.76z m-354.784 48H256v185.728h185.744V589.92z m322.784 0h-185.76v185.728h185.76V589.92zM676.528 208a152 152 0 1 1 0 304 152 152 0 0 1 0-304z m-202.784 11.136a16 16 0 0 1 16 16v249.728a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V235.136a16 16 0 0 1 16-16h249.744zM676.528 256a104 104 0 1 0 0 208 104 104 0 0 0 0-208z m-234.784 11.136H256v185.728h185.744V267.136z"
                        p-id="6959"></path>
                </svg>
            </span>
        </div>
        <div class="menu" :class="{ active: menuActive }">

            <div class="menu-content"></div>
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
    box-shadow: 0px 0px 35px -5px var(--theme-box-shadow-color);
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
        padding: 0 5px 5px 5px;
        color: #fff;
        border: 0;
        font-size: 1.5rem;
        border-radius: 0 0 15px 15px;
        -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
        z-index: 998;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        @extend .box-gradient;
    }

    .menu-button {
        position: absolute;
        left: 0;
        top: 0;
        width: 3.75rem;
        height: 3.75rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
        transition: all .2s linear;
        z-index:998;
        opacity: 0.5;
        border-bottom-right-radius: 100%;
        box-shadow: 0px 5px 20px 0px var(--theme-box-shadow-color);
        background: transparent;
        &.active {
            opacity: 1;
            @extend .box-gradient;
            .icon{
                fill:#fff;
            }
        }
        &:hover {
            @extend .active
        }
        span {
            padding: 0 5px 5px 0;
            
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
        transform: scale(0);
        transform-origin: top left;
        transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        
        &.active {
            transform: scale(1);
        }
    }

    .content {
        flex: 1;
        height: 100%;
    }

    &::before {
        content: "";
        position: absolute;
        bottom: -300px;
        left: -200px;
        width: 700px;
        height: 700px;
        background: -webkit-radial-gradient(rgba(230, 18, 188, 0.2), transparent 65%);
        background: -o-radial-gradient(rgba(230, 18, 188, 0.2), transparent 65%);
        background: radial-gradient(rgba(230, 18, 188, 0.2), transparent 65%);
        border-radius: 50%;
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        top: -300px;
        right: -200px;
        width: 700px;
        height: 700px;
        background: -webkit-radial-gradient(rgba(10, 27, 216, 0.2), transparent 65%);
        background: -o-radial-gradient(rgba(10, 27, 216, 0.2), transparent 65%);
        background: radial-gradient(rgba(10, 27, 216, 0.2), transparent 65%);
        border-radius: 50%;
        z-index: -1;
    }
}</style>