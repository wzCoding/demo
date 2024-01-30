<template>
    <svg xmlns="http://www.w3.org/2000/svg" :style="styles" viewBox="0 0 1024 1024" :aria-labelledby="iconName"
        role="presentation">
        <g :fill="iconColor">
            <slot></slot>
        </g>
    </svg>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
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
            default: 'auto'
        },
        name: {
            type: String,
            default: 'box'
        },
    },
    setup(props) {
        const iconColor = ref(props.color)
        const iconName = `icon-${props.name}`;
        const styles = computed(() => {
            const size = convertCssUnit(props.size);
            return {
                width: size,
                height: size
            }
        })
        if (props.color === 'auto') {
            onMounted(() => {
                const themeStore = useThemeStore();
                iconColor.value = computed(() => {
                    return themeStore.theme !== undefined && getComputedStyle(document.documentElement).getPropertyValue('--theme-text-color')
                })
            })
        }

        return { iconColor,iconName, styles };
    }
}
</script>
