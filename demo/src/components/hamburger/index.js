import { ref, toRefs, computed } from "vue"
export default {
    name: "Hamburger",
    props: {
        type: {
            type: String,
            default: "default",
            validator: (value) => {
                return ["default", "primary"].includes(value)
            }
        },
        active: { type: Boolean, default: null }
    },
    emits: ["hamburgerClick"],
    setup(props, { emit }) {
        const { type, active } = toRefs(props)
        const selfActive = ref(false)
        const hamburgerActive = computed(() => {
            const result = active.value !== null ? active.value : selfActive.value
            return result
        })
        const hamburgerClass = computed(() => {
            return {
                [type.value]: type.value,
                active: hamburgerActive.value
            }
        })
        const handleClick = () => {
            if (active.value == null) {
                selfActive.value = !selfActive.value
            }
            emit("hamburgerClick", hamburgerActive.value)
        }
        return {
            hamburgerClass,
            handleClick
        }
    }
}