<template>
    <teleport to='body'>
        <transition name="fade">
            <div class="popup" :class="popupClass" :style="popupStyle" ref="popup" v-show="visible">
                <slot></slot>
            </div>
        </transition>
    </teleport>
</template>
<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { directions, setDirection } from './direction'
import { triggerEvents } from './event'
import IconButton from '@/components/IconButton'

export default {
    name: "Popup",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: 'bottom',
            validator(value) {
                return directions.includes(value)
            }
        },
        trigger: {
            type: String,
            default: 'click',
            validator(value) {
                return Object.keys(triggerEvents).includes(value)
            }
        },
        needArrow: {
            type: Boolean,
            default: true
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        height: {
            type: [String, Number],
            default: 'auto'
        },
        target: {
            type: [String, Object],
            default: ''
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        onConfirm: {
            type: Function,
            default: () => { }
        },
        onCancel: {
            type: Function,
            default: () => { }
        }
    },
    setup(props) {
        const popup = ref(null)
        const popupStyle = ref({})
        const visible = ref(props.show)
        const target = ref(props.target)
        const popupClass = computed(() => {
            //根据props.needArrow判断是否需要箭头
            const arrowClass = props.needArrow ? 'arrow-popup' : ''
            const popupIndex = `popup-${document.body.querySelectorAll('.popup').length}`
            return `${arrowClass} ${popupIndex}`
        })

        const targetClick = () => {
            visible.value = !visible.value
        }

        const clickOutSide = (e) => {
            if (!popup.value.contains(e.target) && !target.value.contains(e.target)) {
                if (visible.value) visible.value = false
            }
        }
        onMounted(() => {

            //set target
            if (typeof target.value === 'string') {
                target.value = document.getElementsByClassName(target.value)[0] || document.getElementById(target.value)
            }

            // set direction
            popupStyle.value = setDirection({
                target: target.value,
                popup: popup.value,
                direction: props.direction,
                w: props.width,
                h: props.height
            })

            // set events
            const events = triggerEvents[props.trigger]
            for (const e of events) {
                target.value.addEventListener(e, targetClick)
            }

            if (props.trigger === 'click') {
                document.body.addEventListener('click', clickOutSide, true)
            }

        })

        //组件卸载时移除事件监听
        onUnmounted(() => {
            const events = triggerEvents[props.trigger]
            for (const e of events) {
                target.value.removeEventListener(e, targetClick)
            }
            if (props.trigger === 'click') {
                document.body.removeEventListener('click', clickOutSide, true)
            }
        })
        return {
            popupStyle,
            popupClass,
            popup,
            visible
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>