<template>
    <Transition name="fade">
        <div class="loading-mask" v-show="show">
            <div class="loading-spinner">
                <div class="loading-circle"></div>
                <div v-if="text" class="loading-text">{{ text }}</div>
            </div>
        </div>
    </Transition>
</template>
<script>
import { toRefs } from 'vue';
export default {
    name: "Loading",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "Loading......"
        }
    },
    setup(props) {
        return toRefs(props);
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.loading-mask {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-spinner {
        --circle-width: 48px;
        --circle-height: 48px;
        --border-width: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .loading-text {
            @extend .text-gradient;
            font-size: 1.2rem;
            font-weight: 600;
            text-shadow: 0 0 10px var(--theme-gradient-color-1), 0 0 10px var(--theme-gradient-color-2);
            padding-top: 10px;
        }

        .loading-circle {
            width: var(--circle-width);
            height: var(--circle-height);
            border: var(--border-width) solid;
            border-color: var(--theme-gradient-color-1) var(--theme-gradient-color-1) transparent transparent;
            border-radius: 50%;
            box-shadow: 0 0 calc(var(--border-width) * 3) var(--theme-gradient-color-1);
            position: relative;
            animation: rotation-forward 1s linear infinite;
        }

        .loading-circle::before,
        .loading-circle::after {
            content: "";
            display: block;
            border: var(--border-width) solid;
            border-color: var(--theme-gradient-color-1) transparent transparent var(--theme-gradient-color-1);
            border-radius: 50%;
            position: absolute;
            inset: 0;
            margin: auto;
        }

        .loading-circle::before {
            width: calc(var(--circle-width) - var(--border-width) * 5);
            height: calc(var(--circle-height) - var(--border-width) * 5);
            box-shadow: 0 0 calc(var(--border-width) * 3) var(--theme-gradient-color-1);
            animation: rotation-reverse 0.5s linear infinite;
        }

        .loading-circle::after {
            width: calc(var(--circle-width) - var(--border-width) * 2.5);
            height: calc(var(--circle-height) - var(--border-width) * 2.5);
            border-color: transparent transparent var(--theme-gradient-color-2) var(--theme-gradient-color-2);
            box-shadow: 0 0 calc(var(--border-width) * 3) var(--theme-gradient-color-2);
            animation: rotation-forward 0.75s linear infinite;
        }

        @keyframes rotation-forward {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes rotation-reverse {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(-360deg);
            }
        }
    }
}
</style>