import { ref,toRefs, computed } from "vue"
import { useRouter } from "vue-router"
import { ArrowLeft } from "@element-plus/icons-vue"

export default {
    name: "menuBar",
    props: {
        mode: {
            type: String,
            default: "vertical",
            validator: (value) => {
                return ["vertical", "horizontal"].includes(value)
            }
        },
        collapse: {
            type: Boolean,
            default: false
        },
        open: {
            type: Array,
            default: []
        },
        active: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            default: [],
            require: true
        }
    },
    setup(props) {
        const menuMode = ref("vertical")
        const menuCollapse = ref(false)
        const openMenu = ["1"]
        const activeMenu = "1-1"
        const menus = ref([])
        const collapseClass = ref("")
        const ctrlArrow = ref("left-arrow")
        const ctrlMenu = () => {
            menuCollapse.value = !menuCollapse.value
            ctrlArrow.value = menuCollapse.value ? "right-arrow" : "left-arrow"
        }

        // const getMenus = async (api) => {
        //     const res = await service.post(api, { id: "menu" })
        //     menus.value = res.data.map(item => {
        //         item.icon = require(`../../assets/images/${item.icon}`)
        //         return item
        //     })
        // }
        // getMenus()

        const router = useRouter()
        const toPage = (path) => {
            if (path) router.push(path)
        }
        return {
            menuMode,
            menuCollapse,
            openMenu,
            activeMenu,
            menus,
            collapseClass,
            ctrlArrow,
            ctrlMenu,
            toPage
        }
    }
}
