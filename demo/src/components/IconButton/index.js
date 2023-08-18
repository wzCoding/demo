import { toRefs, computed } from "vue"
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
        const { direction, icon, text, gap } = toRefs(props)
        const btnIcon = computed(() => {
            let resource = ''
            if (icon.value) resource = icon.value.includes('/img/') ? icon.value : require(`../../assets/images/${icon.value}`)
            return resource
        })
        const iconDirection = computed(() => {
            const dirMap = {
                "top": "column",
                "left": "row",
                "right": "row-reverse",
                "bottom": "column-reverse"
            }
            return dirMap[direction.value]
        })
        const itemGap = computed(() => {
            return gap.value.includes('px') ? gap.value : `${gap.value}px`
        })
        const styleObj = computed(() => {
            return {
                flexDirection: iconDirection.value,
                gap: ["top", "bottom"].includes(direction.value) ? `${itemGap.value} 0` : `0 ${itemGap.value}`
            }
        })
        return {
            btnIcon,
            text,
            styleObj
        }
    }
}