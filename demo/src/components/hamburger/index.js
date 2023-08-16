import { ToRefs, toRefs } from "vue"
export default {
    name: "Hamburger",
    props: {
        type: {
            type: String,
            default: "default"
        }
    },
    setup(props) {
        const { type } = toRefs(props)
        return {
            type
        }
    }
}