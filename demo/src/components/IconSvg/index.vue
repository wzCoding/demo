<template>
    <svg v-if="!errorFlag" xmlns="http://www.w3.org/2000/svg" :style="styles" viewBox="0 0 1024 1024"
        :aria-labelledby="name" role="presentation">
        <g :fill="iconColor">
            <slot>
                <component :is="icon"></component>
            </slot>
        </g>
    </svg>
</template>
<script>
import { computed, defineAsyncComponent, ref } from 'vue'
import { convertCssUnit } from '@/utils/index'
import { useThemeStore } from '@/store/useThemeStore'
export default {
    name: "IconSvg",
    props: {
        size: {
            type: [Number, String],
            default: 32
        },
        color: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const regExp = /^--\w+-?\w+/gi
        const iconColor = computed(() => {
            if (props.color.match(regExp)) {
                const themeStore = useThemeStore()
                return themeStore.theme !== undefined && getComputedStyle(document.documentElement).getPropertyValue(props.color)
            }
            return props.color
        })
        const styles = computed(() => {
            const size = convertCssUnit(props.size)
            return {
                width: size,
                height: size
            }
        })
        
        //根据 name 动态引入 svg 图标组件
        const errorFlag = ref(false)
        const icon = defineAsyncComponent({
            loader: () => import(`@/assets/images/svg/${props.name}.vue`),
            onError: (error) => {
                console.error(error)
                errorFlag.value = true
            }
        })
        return { iconColor, styles, errorFlag, icon }
    }
}
</script>
