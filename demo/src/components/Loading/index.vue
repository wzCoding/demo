<template>
    <Transition name="fade">
        <Mask :styles="styles" :fullScreen="fullScreen" class="loading-mask">
            <div class="loading-spinner">
                <div :class="spinnerClass"></div>
            </div>
            <div v-if="text" class="loading-text">{{ text }}</div>
        </Mask>
    </Transition>
</template>
<style src="./index.scss" lang="scss"></style>
<script>
import { computed } from 'vue'
import Mask from '@/components/Mask'
export default {
    name: "Loading",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "Loading......"
        },
        zIndex: {
            type: [String, Number],
            default: "999"
        },
        fullScreen:{
            type: Boolean,
            default: false
        },
        background: {
            type: String,
            default: "rgba(0, 0, 0, 0.5)"
        },
        customClass: {
            type: String,
            default: ""
        },
        color: {
            type: [String, Array],
            default: ''
        }
    },
    components: { Mask },
    setup(props) {
        const spinnerClass = computed(() => {
            return props.customClass ? props.customClass : 'loading-circle'
        })
        const styles = computed(() => {
            const style = {
                zIndex: props.zIndex,
                backgroundColor: props.background
            }
            if (typeof props.color === 'object') {
                for (let i = 0; i < props.color.length; i++) {
                    style[`--border-color${i + 1}`] = props.color[i]
                }
            } else if (props.color && typeof props.color === 'string') {
                style[`--border-color1`] = props.color
            }
            return style
        })
        return { spinnerClass, styles }
    }
}
</script>
