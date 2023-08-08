import { ref, toRefs, computed } from "vue"
export default {
    name: "iconButton",
    props: {
        direction: {
            type: String,
            default: "vertical",
            validator: (value) => {
                return ["vertical", "horizontal"].includes(value)
            }
        },
        icon: {
            type: String,
            default: ''
        },
        iconSite: {
            type: String,
            default: "top",
            validator: (value) => {
                return ["top", "right", "left", "bottom"].includes(value)
            }
        },
        text: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { direction, icon, iconSite, text } = toRefs(props)
        const btnIcon = computed(() => {
            return icon.value.includes('/img/') ? icon.value : require(`../../assets/images/${icon.value}`)
        })
        const btnDir = computed(() => {
            const dirMap = {
                "vertical": "column",
                "horizontal": "row"
            }
            const siteMap = {
                "bottom": "-reverse",
                "right": "-reverse",
                "left": "",
                "top": ""
            }
            return dirMap[direction.value] + siteMap[iconSite.value]
        })
        return {
            btnDir,
            btnIcon,
            text
        }
    }
}