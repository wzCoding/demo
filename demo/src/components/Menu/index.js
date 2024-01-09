import { computed, ref } from 'vue'
import Card from '@/components/card'
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
        },
        menus:{
            type: Array,
            default: () => []
        }
    },
    components: { Card },
    emits: ["visibleChange","menuClick"],
    setup(props, { emit }) {
        const [direction, align] = props.position.split('-')
        const borderReverse = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left',
        }
        const buttonStyle = computed(() => {
            return {
                "position": "absolute",
                [direction]: 0,
                [align]: 0,
                [`border-${borderReverse[direction]}-${borderReverse[align]}-radius`]:'100%'
            }
        })
        const iconStyle = computed(() => {
            return {
                "position": "absolute",
                [direction]: '8px',
                [align]: '8px',
            }
        })
        const transformStyle = computed(() => {
            return {
                "transform-origin": `${direction} ${align}`,
            }
        })
        const active = ref(props.visible || false)
        const handleButonClick = () => {
            emit("visibleChange", active)
        }

        const handleMenuClick = () => {
            emit("menuClick",active)
        }
        
        return {
            active,
            buttonStyle,
            iconStyle,
            transformStyle,
            close,
            handleButonClick,
            handleMenuClick
        }
    }
}