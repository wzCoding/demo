import { toRefs, computed } from "vue"
import { useRouter } from "vue-router"
import { ElMenu } from "element-plus"
export default {
    name: "SideBar",
    props: {
        showMenu: { type: Boolean, default: true },
        isCollapse: { type: Boolean, default: false },
        uniqueOpen: { type: Boolean, default: false },
        defaultActive: { type: String, default: "" },
        data: {
            type: Array,
            default() {
                return []
            },
            require: true
        }
    },
    emits: ['ctrlMenu'],
    components: {
        ElMenu
    },
    setup(props, { emit }) {
        const { showMenu, isCollapse, uniqueOpen, defaultActive,data } = toRefs(props)
        const menus = computed(() => {
            const result = data.value.map(item => {
                console.log(item)
                item.icon = item.icon.includes("img/") ? item.icon : require(`@/assets/images/${item.icon}`)
                return item
            })
            return result
        })
        const isSimpleMenu = computed(() => {
            let flag = true
            for (let item of data.value) {
                if (item.children) {
                    flag = false
                    break
                }
            }
            return flag
        })
        const ctrlMenu = () => {
            emit('ctrlMenu', isCollapse)
        }

        const router = useRouter()
        const toPage = (path) => {
            if (path) router.push(path)
        }

        return {
            showMenu,
            isSimpleMenu,
            isCollapse,
            uniqueOpen,
            defaultActive,
            menus,
            ctrlMenu,
            toPage
        }
    }
}
