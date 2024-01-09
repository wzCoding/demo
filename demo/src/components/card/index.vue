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
export default {
    name: 'Card',
    props: {
        borderAnimation: { type: Boolean, default: false },
        backgroundAnimation: { type: Boolean, default: false },
        autoSize: { type: Boolean, default: false },
        size: { type: String, default: "128" },
        title: { type: String, default: "" },
    },
    emits: ["cardClick"],
    setup(props, { emit }) {
        const cardStyle = computed(() => {
            const size = props.size.match(/\d+/)[0];
            return {
                "width": `${size}px`,
                "height": `${size}px`
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