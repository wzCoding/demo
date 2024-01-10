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
            if (typeof props.size === 'number') {
                return {
                    width: `${props.size}px`,
                    height: `${props.size}px`
                }
            }
            return {
                width: props.size.includes('px') ? `${props.size}` : `${props.size}px`,
                height: props.size.includes('px') ? `${props.size}` : `${props.size}px`,
            }
        })
        return { iconName, styles };
    }
}
</script>
