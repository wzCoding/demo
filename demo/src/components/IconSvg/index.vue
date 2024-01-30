<template>
    <svg xmlns="http://www.w3.org/2000/svg" :style="styles" viewBox="0 0 1024 1024" :aria-labelledby="iconName"
        role="presentation">
        <g :fill="iconColor">
            <slot></slot>
        </g>
    </svg>
</template>
<script>
import { computed } from 'vue';
import { convertCssUnit } from '@/utils/index'
import { useThemeStore } from '@/store/useThemeStore';
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
            default: 'box'
        },
    },
    setup(props) {
        const defaultColors = {'theme-text':'--theme-text-color','theme-gradient':'--theme-gradient-color-2'}
        const iconName = `icon-${props.name}`;
        const iconColor = computed(() => {
            if (defaultColors[props.color]) {
                const themeStore = useThemeStore();
                return themeStore.theme !== undefined && getComputedStyle(document.documentElement).getPropertyValue(defaultColors[props.color])
            }
            return props.color
        })
        const styles = computed(() => {
            const size = convertCssUnit(props.size);
            return {
                width: size,
                height: size
            }
        })

        return { iconName, iconColor, styles };
    }
}
</script>
