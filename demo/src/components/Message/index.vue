<template>
    <Transition name="fade" :id="id" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave">
        <div class="message-box" :class="messageClass" :style="messageStyle" v-show="show" @[mouseEnter]="clearTimer"
            @[mouseLeave]="startTimer">
            <div class="message-content">
                <div class="message-icon">
                    <icon-svg size="16" :name="type" />
                </div>
                <div class="message-text">{{ text }}</div>
            </div>
            <div v-if="showClose" class="close-button" @click="close">×</div>
            <div v-if="group" class="repeat-num">{{ repeatNum }}</div>
        </div>
    </Transition>
</template>
<script>
import { ref, toRefs, computed, nextTick, watch } from 'vue'
import { instances, getIndex, getInstance } from "./instance"
import { isMobile } from "../../utils/index"
import IconSvg from '../IconSvg/index.vue'

const gap = 20

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
                return ['success', 'info', 'warning', 'error'].includes(value)
            }
        },
        duration: {
            type: Number,
            default: 3000,
            validator(value) {
                return !isNaN(value)
            }
        },
        id: { type: String, default: "" },
        group: { type: Boolean, default: false },
        showClose: { type: Boolean, default: false },
        onClose: { type: Function, default: () => { } },

    },
    components: { IconSvg },
    setup(props, { expose, emit }) {
        const { type, duration, id, onClose } = toRefs(props)
        const repeatNum = ref(1)
        const show = ref(false)
        const timer = ref(0)
        const top = ref(instances[instances.length - 1] ? instances[instances.length - 1].top.value : 0)
        const mouseEnter = isMobile() ? "touchstart" : "mouseenter"
        const mouseLeave = isMobile() ? "touchend" : "mouseleave"
        const messageClass = computed(() => {
            return `message-${type.value}`
        })
        const close = () => {
            show.value = false
            setTopValue(id.value)
            clearTimeout(timer.value)
        }
        const startTimer = () => {
            if (duration.value > 0) {
                timer.value = setTimeout(close, duration.value)
            }
        }
        const clearTimer = () => {
            clearTimeout(timer.value)
        }
        const setTopValue = (id) => {
            const { current, next } = getInstance(id)
            if (next) {
                setTopValue(next.id)
                next.top.value = current.top.value
            }
        }
        const onBeforeEnter = (el) => {
            nextTick(() => {
                const index = getIndex(id.value)
                const { height } = el.getBoundingClientRect()
                top.value = index > 0 ? (Math.ceil(height) + gap) * index + gap : gap
            })
        }
        const onBeforeLeave = () => {
            onClose.value()
        }
        const onAfterLeave = () => {
            repeatNum.value = 0
            emit("destory")
        }
        const messageStyle = computed(() => {
            return {
                top: `${top.value}px`,
            }
        })
        watch(repeatNum, () => {
            clearTimer()
            startTimer()
        })
        expose({ show, top, repeatNum, close })
        startTimer()
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
            mouseLeave,
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>