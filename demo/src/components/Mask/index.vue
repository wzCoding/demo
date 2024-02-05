<template>
    <div class="mask" :style="maskStyles" @click="handleClick">
        <slot></slot>
    </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
    name: 'Mask',
    props: {
        show: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: [String, Number],
            default: 1000
        },
        fullScreen: {
            type: Boolean,
            default: false
        },
        opacity: {
            type: [String, Number],
            default: 1
        },
        background: {
            type: String,
            default: 'rgba(0,0,0,0.5)'
        },
        styles: {
            type: Object,
            default: () => ({})
        },
        clickToClose: {
            type: Boolean,
            default: false
        }
    },
    emits: ['closeMask'],
    setup(props, { emit, expose }) {
        const showMask = ref(props.show)
        const display = computed(() => showMask.value ? "flex" : "none")
        const handleClick = ($event) => {
            if (props.clickToClose && $event.target.className === 'mask') {
                showMask.value = false
                emit('closeMask')
                return
            }
            return
        }
        const maskStyles = computed(() => {
            const style = {
                zIndex: `${props.zIndex}`,
                opacity: props.opacity,
                backgroundColor: props.background,
                display: display.value,
                inset: display.value == "none" ? "unset" : "0",
                position: props.fullScreen ? "fixed" : "absolute"
            }
            if (props.styles) {
                return Object.assign(style, props.styles)
            }
            return style
        })
        expose({ showMask })
        return {
            maskStyles,
            handleClick
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>