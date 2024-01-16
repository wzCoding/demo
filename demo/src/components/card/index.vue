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
import { useThemeStore } from '@/store/useThemeStore';
export default {
    name: 'Card',
    props: {
        borderAnimation: { type: Boolean, default: false },
        backgroundAnimation: { type: Boolean, default: false },
        width: { type: [String, Number], default: '128' },
        height: { type: [String, Number], default: '' },
        title: { type: String, default: "" },
        effect: { type: String, default: "auto" }
    },
    emits: ["cardClick"],
    setup(props, { emit }) {
        const themeStore = useThemeStore();
        const cardEffect = computed(()=>{
             return props.effect === 'auto' ? (themeStore.theme || 'light') : props.effect;
        })
        const cardStyle = computed(() => {
            const width = convertCssUnit(props.width);
            const height = convertCssUnit(props.height);
            return {
                width,
                height
            }
        })
        const cardClass = computed(() => {
            return {
                "border-animation": props.borderAnimation,
                "background-animation": props.backgroundAnimation,
                [`effect-${cardEffect.value}`]: cardEffect.value
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