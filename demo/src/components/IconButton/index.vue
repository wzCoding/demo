<template>
    <div class="icon-btn" :style="styleObj">
        <span v-if="btnIcon" class="icon">
            <slot name="icon">
                <img :src="btnIcon" alt="icon">
            </slot>
        </span>
        <span v-if="text" class="text">{{ text }}</span>
        <slot></slot>
    </div>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed } from "vue"
export default {
    name: "IconButton",
    props: {
        //图标的方向
        direction: {
            type: String,
            default: "left",
            validator: (value) => {
                return ["top", "right", "left", "bottom"].includes(value)
            }
        },
        //使用的图标
        icon: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        //文字与图标的间隙
        gap: {
            type: String,
            default: "5"
        }
    },
    setup(props) {
        const btnIcon = computed(() => {
            let resource = ''
            if (props.icon) resource = props.icon.includes('/img/') ? props.icon : require(`../../assets/images/${props.icon}`)
            return resource
        })
        const iconDirection = computed(() => {
            const flexs = {
                "top": "column",
                "left": "row",
                "right": "row-reverse",
                "bottom": "column-reverse"
            }
            return flexs[props.direction]
        })
        const itemGap = computed(() => {
            return props.gap.includes('px') ? props.gap : `${props.gap}px`
        })
        const styleObj = computed(() => {
            return {
                flexDirection: iconDirection.value,
                gap: ["top", "bottom"].includes(props.direction) ? `${itemGap.value} 0` : `0 ${itemGap.value}`
            }
        })
        return {
            btnIcon,
            styleObj
        }
    }
}
</script>
