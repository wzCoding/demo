<style lang="scss" src="./index.scss" scoped></style>
<template>
    <div class="card card-box" :class="cardClass" :style="cardStyle" @click="handleClick">
        <slot>
            <span class="card-title">{{ title }}</span>
        </slot>
    </div>
</template>
<script>
import { computed } from 'vue';
import { convertCssUnit } from '@/utils/index'
export default {
    name: 'Card',
    props: {
        borderAnimation: { type: Boolean, default: false },
        backgroundAnimation: { type: Boolean, default: false },
        autoSize: { type: Boolean, default: false },
        width: { type: [String, Number], default: "100%" },
        height: { type: [String, Number], default: "" },
        title: { type: String, default: "" },
    },
    emits: ["cardClick"],
    setup(props, { emit }) {
        const cardStyle = computed(() => {
            const width = convertCssUnit(props.width);
            const height = convertCssUnit(props.height);
            return {
                "width": width,
                "height": height
            }
        })
        const cardClass = computed(() => {
            return {
                "border-animation": props.borderAnimation,
                "background-animation": props.backgroundAnimation,
                "auto-size": props.autoSize
            }
        })
        const handleClick = () => {
            emit("cardClick");
        }
        return {
            cardStyle,
            cardClass,
            handleClick
        }
    }
}
</script>