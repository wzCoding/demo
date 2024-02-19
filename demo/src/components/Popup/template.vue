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
import { triggerEvents, addListener, removeListener } from './event'


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
                return Object.keys(directions).includes(value)
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
        maxWidth: {
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

        const triggerPopup = () => {
            setDirection({
                target: target.value,
                popup: popup.value,
                direction: props.direction,
                maxWidth: props.maxWidth,
            }).then(res => {
                popupStyle.value = res
                visible.value = !visible.value
            })
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
            setDirection({
                target: target.value,
                popup: popup.value,
                direction: props.direction,
                maxWidth: props.maxWidth
            }).then(res => {
                popupStyle.value = res
            })

            // set events
            addListener(props.trigger, target.value, triggerPopup)

            if (props.trigger === 'click') {
                addListener(props.trigger, document.body, clickOutSide, true)
            }

        })

        //组件卸载时移除事件监听
        onUnmounted(() => {
            // remove events
            removeListener(props.trigger, target.value, triggerPopup)

            if (props.trigger === 'click') {
                removeListener(props.trigger, document.body, clickOutSide, true)
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