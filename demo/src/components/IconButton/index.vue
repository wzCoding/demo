<template>
    <button class="icon-btn" :style="btnStyle" :class="btnClass" @click="buttonClick($event)">
        <slot>
            <span v-if="btnIcon" class="icon">
                <img :src="btnIcon" alt="icon">
            </span>
        </slot>
        <span v-if="text" class="text">{{ text }}</span>
    </button>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed } from "vue"
import { convertCssUnit } from '@/utils/index'
export default {
    name: "IconButton",
    props: {
        //图标的位置
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
        },
        size: {
            type: String,
            default: "" // 默认为 ''，表示自定义，也可以是 'small'、'default'、'large'尺寸
        },
        type: {
            type: String,
            default: "" // 默认为 ''，表示自定义，也可以是 'default'、'primary'、'success'、'warning'、'danger'类型
        }
    },
    emits: ["click"],
    setup(props, { emit }) {
        const btnIcon = computed(() => {
            let resource = ''
            if (props.icon) {
                resource = props.icon.includes('/img/') ? props.icon : require(`../../assets/images/${props.icon}`)
            }
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
            return convertCssUnit(props.gap)
        })
        const btnClass = computed(() => {
            let _class = []
            if (props.size) _class.push(`size-${props.size}`)
            if (props.type) _class.push(`type-${props.type}`)
            return _class.join(" ")
        })
        const btnStyle = computed(() => {
            return {
                flexDirection: iconDirection.value,
                gap: ["top", "bottom"].includes(props.direction) ? `${itemGap.value} 0` : `0 ${itemGap.value}`
            }
        })
        const buttonClick = (e) => {
            emit("click", e)
        }
        return {
            btnIcon,
            btnClass,
            btnStyle,
            buttonClick
        }
    }
}
</script>
