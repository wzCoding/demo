<template>
    <teleport to='body'>
        <transition name="fade">
            <dialog class="ease-popup" :class="name" v-show="visible" ref="popup">
                <div class="popup-box">
                    <div class="popup-content">
                        <slot></slot>
                    </div>
                    <div class="popup-footer" v-if="confirm || cancel">
                        <e-button v-if="confirm" type="primary" size="small" @click="handleConfirm">{{ confirmText
                            }}</e-button>
                        <e-button v-if="cancel" type="default" size="small" @click="handleCancel">{{ cancelText
                            }}</e-button>
                    </div>
                </div>
            </dialog>
        </transition>
    </teleport>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { triggerEvents, handleEvent } from './event'
import { getElement } from '@/utils/index'
import EButton from '@/components/Button'
import EasePopup from 'ease-popup'

export default {
    name: "EPopup",
    props: {
        name: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light',
        },
        direction: {
            type: String,
            default: 'bottom'
        },
        trigger: {
            type: String,
            default: 'click',
            validator(value) {
                return triggerEvents.includes(value)
            }
        },
        modal: {
            type: Boolean,
            default: false
        },
        needArrow: {
            type: Boolean,
            default: true
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        placement: {
            type: String,
            default: 'outside'
        },
        selfClick:{
            type: Boolean,
            default: true
        },
        fullScreen: {
            type: Boolean,
            default: false
        },
        target: {
            type: [String, Object],
            default: ''
        },
        targetGap: {
            type: [String, Number],
            default: 15
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
        }
    },
    components: { EButton },
    emits: ['show', 'close', 'confirm', 'cancel'],
    setup(props, { emit }) {
        const popup = ref(null)
        const popupOptions = computed(() => {
            return {
                direction: props.direction,
                needArrow: props.needArrow,
                placement: props.placement,
                fullScreen: props.fullScreen,
                theme: props.theme,
                targetGap: props.targetGap,
                selfClick: props.selfClick,

                onHide: () => {
                    visible.value = false
                }
            }
        })
        let instance = new EasePopup(popupOptions.value)
        const handleConfirm = () => {
            instance.hide()
            emit('confirm')
        }

        const handleCancel = () => {
            instance.hide()
            emit('cancel')
        }
        const visible = ref(props.show)
        const visibleChange = () => {
            visible.value = !visible.value
            Promise.resolve(visible.value).then((res) => {
                if (res) {
                    instance[props.modal ? 'showModal' : 'show']()
                    emit('show')
                } else {
                    instance.hide()
                    emit('close')
                }
            })
        } 
        onMounted(() => {
            console.log(props.target)
            const target = getElement(props.target)
            const width = props.width === props.target ? target.clientWidth : props.width
            instance.update({ target: props.fullScreen ? document.body : target, popup: popup.value, width })

            handleEvent({
                target,
                trigger: props.trigger,
                popup: popup.value,
                handler: visibleChange,
                once: false
            })
        })

        //组件卸载时移除事件监听
        onBeforeUnmount(() => {

            const target = getElement(props.target)
            handleEvent({
                target,
                trigger: props.trigger,
                popup: popup.value,
                handler: visibleChange,
                remove: true
            })
            instance.destroy()
            instance = null
        })
        return {
            popup,
            visible,
            handleConfirm,
            handleCancel
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>