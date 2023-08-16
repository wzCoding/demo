import { ref, toRefs, computed } from "vue"
import { useRouter } from "vue-router"
import IconButton from '@/components/icon-button/index.vue'
export default {
    name: "SideBar",
    props: {
        isShow: { type: Boolean, default: false },
        data: {
            type: Array,
            default() {
                return []
            },
            require: true
        }
    },
    emits: ['update:isShow'],
    components: { IconButton },
    setup(props, { emit }) {
        const { isShow, data } = toRefs(props)
        const showDrawer = ref(false)
        const sideBarActive = ref(false)
        const handleClick = () => {
            emit('update:isShow', isShow)
            // showDrawer.value = !showDrawer.value
            sideBarActive.value = !sideBarActive.value
        }
       
        const router = useRouter()
        const toPage = (path) => {
            if (!path) return
            path.match(/^http/g) ? window.open(path) : router.push(path)
        }
        const handleClose = () => {
            sideBarActive.value = !sideBarActive.value
        }
        return {
            isShow,
            showDrawer,
            sideBarActive,
            data,
            handleClick,
            handleClose,
            toPage,
        }
    }
}
