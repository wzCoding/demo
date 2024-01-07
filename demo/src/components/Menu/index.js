import { computed, ref } from 'vue'
export default {
    name: "PageMneu",
    props: {
        position: {
            type: String,
            default: 'top-left',
            validator: (value) => {
                return ['top-left', 'bottom-left', 'bottom-right'].includes(value)
            }
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ["visibleChange"],
    setup(props, { emit }) {
        // 获取位置信息
        const [direction, align] = props.position.split('-')
        const positionStyle = computed(() => {
            return {
                "position": "absolute",
                [direction]: 0,
                [align]: 0
            }
        })
        const transformStyle = computed(() => {
            return {
                "transform-origin": `${direction} ${align}`,
            }
        })
        const active = ref(props.visible || false)
        const handleClick = () => {
            emit("visibleChange", active)
        }
        return {
            active,
            positionStyle,
            transformStyle,
            handleClick
        }
    }
}