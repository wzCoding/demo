<template>
    <Transition name="fade" :id="id" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave">
        <div class="message-box" :class="messageClass" :style="messageStyle" v-show="show" @[mouseEnter]="clearTimer"
            @[mouseLeave]="startTimer">
            <div class="message-content">
                <div class="message-icon">
                    <icon-svg size="16">
                        <component :is="svgs[type]" />
                    </icon-svg>
                </div>
                <div class="message-text">{{ text }}</div>
            </div>
            <div v-if="showClose" class="close-button" @click="close">×</div>
            <div v-if="group" class="repeat-num">{{ repeatNum }}</div>
        </div>
    </Transition>
</template>
<script>
import { ref, toRefs, computed, nextTick, watch } from 'vue';
import { instances, getIndex, getInstance } from "./instance";
import { isMobile } from "../../utils/index"
import IconSvg from '../IconSvg/index.vue';
//引入svg图标
import IconSuccess from '@/assets/images/svg/success.vue';
import IconInfo from '@/assets/images/svg/info.vue';
import IconWarning from '@/assets/images/svg/warning.vue';
import IconError from '@/assets/images/svg/error.vue';

const gap = 20;
const svgs = {
    'success': IconSuccess,
    'info': IconInfo,
    'warning': IconWarning,
    'error': IconError
}
export default {
    name: "Message",
    props: {
        text: {
            type: String,
            default: "Hello World"
        },
        type: {
            type: String,
            default: "info",
            validator(value) {
                return Object.keys(svgs).includes(value);
            }
        },
        duration: {
            type: Number,
            default: 3000,
            validator(value) {
                return !isNaN(value);
            }
        },
        id: { type: String, default: "" },
        group: { type: Boolean, default: false },
        showClose: { type: Boolean, default: false },
        onClose: { type: Function, default: () => { } },

    },
    components: { IconSvg },
    setup(props, { expose, emit }) {
        const { type, duration, id, onClose } = toRefs(props);
        const repeatNum = ref(1);
        const show = ref(false);
        const timer = ref(0);
        const top = ref(instances[instances.length - 1] ? instances[instances.length - 1].top.value : 0);
        const mouseEnter = isMobile() ? "touchstart" : "mouseenter"
        const mouseLeave = isMobile() ? "touchend" : "mouseleave"
        const messageClass = computed(() => {
            return `message-${type.value}`
        });
        const close = () => {
            show.value = false;
            setTopValue(id.value);
            clearTimeout(timer.value);
        }
        const startTimer = () => {
            if (duration.value > 0) {
                timer.value = setTimeout(close, duration.value);
            }
        }
        const clearTimer = () => {
            clearTimeout(timer.value);
        }
        const setTopValue = (id) => {
            const { current, next } = getInstance(id);
            if (next) {
                setTopValue(next.id);
                next.top.value = current.top.value;
            }
        }
        const onBeforeEnter = (el) => {
            nextTick(() => {
                const index = getIndex(id.value);
                const { height } = el.getBoundingClientRect();
                top.value = index > 0 ? (Math.ceil(height) + gap) * index + gap : gap;
            })
        }
        const onBeforeLeave = () => {
            onClose.value();
        }
        const onAfterLeave = () => {
            repeatNum.value = 0;
            emit("destory");
        }
        const messageStyle = computed(() => {
            return {
                top: `${top.value}px`,
            }
        });
        watch(repeatNum, () => {
            clearTimer();
            startTimer();
        })
        expose({ show, top, repeatNum, close });
        startTimer();
        return {
            svgs,
            show,
            messageClass,
            messageStyle,
            repeatNum,
            close,
            onBeforeEnter,
            onBeforeLeave,
            onAfterLeave,
            startTimer,
            clearTimer,
            mouseEnter,
            mouseLeave,
        }
    }
}
</script>
<style lang="scss" scoped>
.fade-leave-active {
    animation: leave 0.6s ease-out;
}

@keyframes leave {
    100% {
        top: 0;
        opacity: 0;
    }
}

.message-info {
    --color: var(--theme-gradient-color-2);
    --background: var(--theme-page-background);
}

.message-success {
    --color: #67c23a;
    --background: #f0f9eb;
}

.message-warning {
    --color: #f1b300;
    --background: #fdf6ec;
}

.message-error {
    --color: red;
    --background: #fef0f0;
}

.message-box {
    --white-space: 2rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    width: fit-content;
    max-width: calc(100% - var(--white-space));
    padding: 0.75rem;
    background-color: var(--background);
    box-shadow: 0 0 4px var(--color);
    border: 1px solid var(--color);
    border-radius: 5px;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    color: var(--color);
    font-size: 14px;

    .message-content {
        display: flex;
        justify-content: center;
        align-items: center;
        --icon-size: 1rem;

        .message-icon {
            width: var(--icon-size);
            height: var(--icon-size);

            svg {
                fill: var(--color);
            }
        }

        .message-text {
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100vw - var(--white-space) * 3 - var(--icon-size));
            padding-left: 0.5rem;
            padding-right: 0.25rem;
        }
    }

    .close-button {
        cursor: pointer;
        padding: 0 5px;
        margin-left: 0.5rem;
    }

    .repeat-num {
        padding: 1px 5px;
        background: var(--color);
        border-radius: 5px;
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 12px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        color: var(--background);
    }
}
</style>