<template>
    <Transition name="fade" :id="id" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave">
        <div class="message-box" :class="messageClass" :style="messageStyle" v-show="show" @[mouseEnter]="clearTimer"
            @[mouseLeave]="startTimer">
            <div class="message-content">
                <div class="message-icon">
                    <svg v-if="type == `info`" t="1699546203064" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5007" width="200" height="200">
                        <path
                            d="M512 981.333333c-123.733333 0-243.2-51.2-332.8-136.533333C93.866667 755.2 42.666667 635.733333 42.666667 512c0-123.733333 51.2-243.2 136.533333-332.8C268.8 93.866667 388.266667 42.666667 512 42.666667c123.733333 0 243.2 51.2 332.8 136.533333 85.333333 89.6 136.533333 209.066667 136.533333 332.8 0 123.733333-51.2 243.2-136.533333 332.8-89.6 85.333333-209.066667 136.533333-332.8 136.533333z m0-533.333333c-34.133333 0-64 29.866667-64 64v213.333333c0 34.133333 29.866667 64 64 64s64-29.866667 64-64v-213.333333c0-34.133333-29.866667-64-64-64z m0-213.333333c-17.066667 0-34.133333 8.533333-46.933333 17.066666-12.8 12.8-17.066667 29.866667-17.066667 46.933334 0 17.066667 8.533333 34.133333 17.066667 46.933333 12.8 12.8 29.866667 17.066667 46.933333 17.066667 17.066667 0 34.133333-8.533333 46.933333-17.066667 12.8-12.8 17.066667-29.866667 17.066667-46.933333 0-17.066667-8.533333-34.133333-17.066667-46.933334-12.8-8.533333-29.866667-17.066667-46.933333-17.066666z"
                            p-id="5008"></path>
                    </svg>
                    <svg v-if="type == `success`" t="1699976921174" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4282" width="200" height="200"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m193.194667 218.331428L447.21981 581.315048l-103.936-107.812572-52.662858 50.761143 156.379429 162.230857 310.662095-319.683047-52.467809-50.956191z" p-id="4283"></path></svg>
                    <svg v-if="type == `warning`" t="1699950180664" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2286" width="200" height="200">
                        <path
                            d="M545.718857 130.608762c11.337143 6.265905 20.699429 15.555048 26.989714 26.819048l345.014858 617.667047a68.87619 68.87619 0 0 1-26.989715 93.915429c-10.313143 5.705143-21.942857 8.704-33.718857 8.704H166.985143A69.266286 69.266286 0 0 1 97.52381 808.643048c0-11.751619 2.998857-23.28381 8.752761-33.548191l344.990477-617.642667a69.656381 69.656381 0 0 1 94.451809-26.819047z m0.999619 539.867428h-69.461333v69.071239h69.485714V670.47619z m0-298.374095h-69.461333v252.318476h69.485714V372.102095z"
                            p-id="2287"></path>
                    </svg>
                    <svg v-if="type == `error`" t="1699951420065" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3269" width="200" height="200">
                        <path
                            d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m129.29219 233.447619l-129.267809 129.29219-129.316571-129.29219-51.736381 51.736381 129.316571 129.267809-129.316571 129.316571 51.736381 51.736381L512 563.687619l129.29219 129.316571 51.736381-51.73638L563.687619 512l129.316571-129.29219-51.73638-51.736381z"
                            p-id="3270"></path>
                    </svg>
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
const gap = 20;
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
                return ["info","success","warning", "error"].includes(value);
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
            mouseLeave
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
.message-success{
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

            .icon {
                fill: var(--color);
                width: 100%;
                height: 100%;
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