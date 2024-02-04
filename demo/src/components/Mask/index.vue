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
    setup(props) {
        const handleClick = ($event) => {
            if (props.clickToClose && $event.target.className === 'mask') {
                close()
                return
            }
            return
        }
        const close = () => {
            maskShow.value = "none"
        }
        const maskShow = ref("flex")
        const maskStyles = computed(() => {
            const style = {
                zIndex: `${props.zIndex}`,
                opacity: props.opacity,
                backgroundColor: props.background,
                display: maskShow.value,
                position: props.fullScreen ? "fixed" : "absolute"
            }
            if (props.styles) {
                return Object.assign(style, props.styles)
            }
            return style
        })
        return {
            maskStyles,
            handleClick
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>