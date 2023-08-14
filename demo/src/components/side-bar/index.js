import { ref, toRefs, computed } from "vue"
import { useRouter } from "vue-router"
import iconButton from "@components/icon-button/index.vue"
export default {
    name: "SideBar",
    // props: {
    //     mode: {
    //         type: String,
    //         default: "vertical",
    //         validator: (value) => {
    //             return ["vertical", "horizontal"].includes(value)
    //         }
    //     },
    //     collapse: { type: Boolean, default: false },
    //     uniqueOpen: { type: Boolean, default: false },
    //     defaultActive: { type: String, default: "" },
    //     data: {
    //         type: Array,
    //         default() {
    //             return []
    //         },
    //         require: true
    //     }
    // },
    // emits: ['ctrlMenu'],
    // components: {
    //     ArrowLeft
    // },
    // setup(props, { emit }) {

    //     const { mode, collapse, uniqueOpen, defaultActive } = toRefs(props)
    //     const menus = computed(() => {
    //         return props.data.map(item => {
    //             if (!item.icon.includes('/')) {
    //                 item.icon = require(`../../assets/images/${item.icon}`)
    //             }
    //             return item
    //         })
    //     })
    //     const ctrlArrow = ref("left-arrow")
    //     const collapseClass = ref("")
    //     const ctrlMenu = () => {
    //         emit('ctrlMenu',collapse)
    //         ctrlArrow.value = !collapse.value ? "right-arrow" : "left-arrow"
    //     }

    //     const router = useRouter()
    //     const toPage = (path) => {
    //         if (path) router.push(path)
    //     }
    //     return {
    //         mode,
    //         collapse,
    //         uniqueOpen,
    //         defaultActive,
    //         menus,
    //         ctrlArrow,
    //         collapseClass,
    //         ctrlMenu,
    //         toPage
    //     }
    // }
}
