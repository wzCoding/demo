<template>
    <div class="popup" v-show="show" :style="styles" ref="popup">
        <slot></slot>
    </div>
</template>
<script>
import { ref, onMounted, nextTick, reactive } from 'vue'
import { convertCssUnit } from '@/utils/index'
import IconButton from '@/components/IconButton'
export default {
    name: "Popup",
    props: {
        show: {
            type: Boolean,
            default: true
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
        const target = ref(props.target)
        const arrowSize = 10
        const styles = reactive({
            width: convertCssUnit(props.width),
            height: convertCssUnit(props.height),
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
                styles.top = `${top + height / 2}px`
                styles.left = `${(left + width / 2) - popupWidth}px`
                styles['--arrow-left'] = `${(popupWidth / 2 - arrowLength / 2).toFixed(2)}px`
                styles['--arrow-top'] = `${(popupHeight / 2 - arrowLength / 2).toFixed(2)}px`
                styles['--arrow-rotate'] = '135deg'
                if (props.direction === 'top') {
                    styles['--arrow-top'] = `${popupHeight - arrowSize / 2}px`
                }
                if (props.direction === 'bottom') {
                    styles['--arrow-top'] = `-${arrowSize / 2}px`
                }
            } else if (['left', 'right'].includes(props.direction)) {
                styles.top = `${top + height / 2}px`
                styles.left = `${(left + width / 2) - popupWidth / 2}px`
                styles['--arrow-top'] = `${(popupHeight / 2 - arrowLength / 2).toFixed(2)}px`

            }


            if (props.trigger === 'click') {
                target.value.addEventListener('click', () => {
                    console.log('click')
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
            popup
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>