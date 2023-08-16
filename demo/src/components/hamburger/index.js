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
        }
    },
    emits: ["hamburgerClick"],
    setup(props, { emit }) {
        const { type } = toRefs(props)
        const hamburgerActive = ref(false)
        const handleClick = () => {
            hamburgerActive.value = !hamburgerActive.value
            emit("hamburgerClick", hamburgerActive.value)
        }
        const hamburgerClass = computed(() => {
            return {
                [type.value]: type.value,
                active: hamburgerActive.value
            }
        })
        return {
            hamburgerClass,
            handleClick
        }
    }
}