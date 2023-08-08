import { toRefs, computed } from "vue"
export default {
    name: "iconButton",
    props: {
        //图标与文字的方向
        direction: {
            type: String,
            default: "vertical",
            validator: (value) => {
                return ["vertical", "horizontal"].includes(value)
            }
        },
        //展示的图标
        icon: {
            type: String,
            default: ''
        },
        //图标相对于文字的位置
        iconSite: {
            type: String,
            default: "top",
            validator: (value) => {
                return ["top", "right", "left", "bottom"].includes(value)
            }
        },
        //展示的文字
        text: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { direction, icon, iconSite, text } = toRefs(props)
        const btnIcon = computed(() => {
            let resource = ''
            if (icon.value) resource = icon.value.includes('/img/') ? icon.value : require(`../../assets/images/${icon.value}`)
            return resource
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
        const btnClass = computed(() => {
            return `btn-${direction.value}`
        })
        return {
            btnDir,
            btnIcon,
            text,
            btnClass
        }
    }
}