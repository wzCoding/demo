<template>
    <teleport :to='container'>
        <div class="popup-container">
            <div class="popup" v-show="visible" :style="styles" ref="popup">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>
<script>
import { ref, onMounted, reactive, computed } from 'vue'
import { convertCssUnit } from '@/utils/index'
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
                // The value must match one of these strings
                return ['top', 'right', 'left', 'bottom'].includes(value)
            }
        },
        trigger: {
            type: String,
            default: 'click'
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
        const visible = ref(props.show)
        const target = ref(props.target)
        const arrowSize = 10
        const styles = reactive({
            width: convertCssUnit(props.width),
            height: convertCssUnit(props.height),
        })
        const container = computed(() => {
            return document.body.querySelector('.popup-container') ? '.popup-container' : 'body'
        })
        onMounted(() => {
            if (typeof target.value === 'string') target.value = document.getElementsByClassName(target.value)[0] || document.getElementById(target.value)
            const { left, top, width, height } = target.value.getBoundingClientRect()
            const popupWidth = popup.value.getBoundingClientRect().width
            const popupHeight = popup.value.getBoundingClientRect().height
            const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2)
            console.log('arrowLength;', arrowLength)
            console.log(`left:${left}, top:${top}, width:${width}, height:${height}`)
            console.log(`popupWidth:${popupWidth}, popupHeight:${popupHeight}`)
            if (['top', 'bottom'].includes(props.direction)) {
                styles.left = `${(left + width / 2) - popupWidth / 2}px`
                styles['--arrow-left'] = `${(popupWidth / 2 - arrowSize / 2).toFixed(2)}px`
                if (props.direction === 'top') {
                    styles['top'] = `${top - (popupHeight + arrowLength)}px`
                    styles['--arrow-top'] = `${popupHeight - arrowSize / 2}px`
                    styles['--arrow-rotate'] = '-45deg'
                }
                if (props.direction === 'bottom') {
                    styles['top'] = `${top + (height + arrowLength)}px`
                    styles['--arrow-top'] = `-${arrowSize / 2}px`
                    styles['--arrow-rotate'] = '135deg'
                }
            } else if (['left', 'right'].includes(props.direction)) {
                styles.top = `${top + height / 2}px`
                styles.left = `${(left + width / 2) - popupWidth / 2}px`
                styles['--arrow-top'] = `${(popupHeight / 2 - arrowLength / 2).toFixed(2)}px`

            }


            if (props.trigger === 'click') {
                target.value.addEventListener('click', () => {
                    console.log('click')
                    visible.value = !visible.value
                })
            }
            if (props.trigger === 'hover') {
                target.value.addEventListener('mouseenter', () => {
                    console.log('hover-enter')
                })
                target.value.addEventListener('mouseleave', () => {
                    console.log('hover-leave')
                })
            }
        })

        return {
            styles,
            popup,
            visible,
            container
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>