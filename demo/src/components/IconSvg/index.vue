<template>
    <svg xmlns="http://www.w3.org/2000/svg" :style="styles" viewBox="0 0 1024 1024" :aria-labelledby="iconName"
        role="presentation">
        <g :fill="color">
            <slot></slot>
        </g>
    </svg>
</template>
<script>
import { computed } from 'vue';
import { convertCssUnit } from '@/utils/index'
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
        const iconName = `icon-${props.name}`;
        const styles = computed(() => {
            const size = convertCssUnit(props.size);
            return {
                width: size,
                height: size
            }
        })
        return { iconName, styles };
    }
}
</script>
