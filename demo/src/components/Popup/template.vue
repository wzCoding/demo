<template>
    <teleport to='body'>
        <transition name="fade">
            <div class="popup" :class="popupClass" :style="popupStyle" ref="popup" v-show="visible">
                <div class="popup-box">
                    <div class="popup-content">
                        <slot></slot>
                    </div>
                    <div class="popup-footer" v-if="confirm || cancel">
                        <icon-button v-if="confirm" type="primary" size="small" @click="handleConfirm">{{ confirmText
                        }}</icon-button>
                        <icon-button v-if="cancel" type="default" size="small" @click="handleCancel">{{ cancelText
                        }}</icon-button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { directions, setDirection } from './direction'
import { triggerEvents, addListener, removeListener } from './event'
import { findScrollElement, debounce } from "@/utils/index"

import IconButton from '@/components/IconButton'

const tirggers = Object.keys(triggerEvents)
const dirs = Object.keys(directions)

export default {
    name: "Popup",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light',
            validator(value) {
                return ['light', 'dark'].includes(value)
            }
        },
        direction: {
            type: String,
            default: 'bottom',
            validator(value) {
                return dirs.includes(value)
            }
        },
        trigger: {
            type: String,
            default: 'click',
            validator(value) {
                return tirggers.includes(value)
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
        confirm: {
            type: Boolean,
            default: false
        },
        cancel: {
            type: Boolean,
            default: false
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
    components: { IconButton },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
        const popup = ref(null)
        const visible = ref(props.show)
        const target = ref(props.target)
        const popupClass = computed(() => {
            //根据props.needArrow判断是否需要箭头
            const arrowClass = props.needArrow ? 'arrow-popup' : ''
            const popupIndex = `popup-${document.body.querySelectorAll('.popup').length}`
            return `${arrowClass} ${popupIndex}`
        })

        const handleConfirm = () => {
            visible.value = !visible.value
            emit('confirm')
        }

        const handleCancel = () => {
            visible.value = !visible.value
            emit('cancel')
        }

        const updateColor = () => {
            const defaultThemes = {
                'light': { '--popup-background': '#fff', '--popup-text': '#333' },
                'dark': { '--popup-background': '#333', '--popup-text': '#fff' },
            }
            return defaultThemes[props.theme]
        }

        const popupStyle = ref(updateColor())

        //popup的样式
        const updateStyle = (style) => {
            popupStyle.value = Object.assign({}, popupStyle.value, style)
        }

        //popup的显示和隐藏
        const triggerPopup = () => {
            setDirection({
                target: target.value,
                popup: popup.value,
                direction: props.direction,
                maxWidth: props.maxWidth,
            }).then(res => {
                updateStyle(res)
                visible.value = !visible.value
            })
        }

        // 处理外部点击事件，关闭popup
        const clickOutSide = (e) => {
            if (!popup.value.contains(e.target) && !target.value.contains(e.target)) {
                if (visible.value) visible.value = false
            }
        }

        // 处理滚动事件，重新计算popup位置
        const handleScroll = debounce(
            () => {
                setDirection({
                    target: target.value,
                    popup: popup.value,
                    direction: props.direction,
                    maxWidth: props.maxWidth
                }).then(res => {
                    updateStyle(res)
                })
            },
            30
        )

        const unScrollWatch = watch(visible, (newVal) => {
            const [scrollEl] = findScrollElement(target.value)
            if (newVal) {
                scrollEl && addListener('scroll', scrollEl, handleScroll)
            } else {
                scrollEl && removeListener('scroll', scrollEl, handleScroll)
            }
        })

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
                updateStyle(res)
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

            unScrollWatch()
        })
        return {
            popupStyle,
            popupClass,
            popup,
            visible,
            handleConfirm,
            handleCancel
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>