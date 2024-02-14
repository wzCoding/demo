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
import { ref, onMounted, computed } from 'vue'
import { triggerEvents,directions, setDirection } from './direction'
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
            return props.needArrow ? 'has-arrow' : ''
        })
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

            const events = triggerEvents[props.trigger]
            for(const e of events){
                target.value.addEventListener(e, () => {
                    visible.value = !visible.value
                })
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