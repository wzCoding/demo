import { ref, toRefs, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useSideStore } from "@/store/useSideStore"
import IconButton from "@/components/IconButton/index.vue"
import Hamburger from "@/components/Hamburger/index.vue"
export default {
    name: "PageHeader",
    props: {
        title: {
            type: String,
            default: "Demo"
        },
        titleIcon: {
            type: String,
            default: "head.png"
        },
        themeControl: {
            type: Boolean,
            default: false
        },
        headerLinks: {
            type: Array,
            default() {
                return [
                    {
                        title: "Blog",
                        icon: "blog.svg",
                        path: "https://wzcoding.github.io/blog/",
                    },
                    {
                        title: "Github",
                        icon: "github.svg",
                        path: "https://github.com/wzCoding?tab=repositories",
                    }
                ]
            }
        }
    },
    components: {
        IconButton,
        Hamburger
    },
    setup(props) {
        const { title, titleIcon, themeControl, headerLinks } = toRefs(props)
        const themeClass = ref("")
        const themeIcon = [
            {
                theme: "light",
                icon: require('@/assets/images/theme/light.svg'),
                toChangeTheme: "dark"
            },
            {
                theme: "dark",
                icon: require('@/assets/images/theme/dark.svg'),
                toChangeTheme: ""
            }
        ]
        const themeChange = (theme) => {
            console.log(theme)
            themeClass.value = theme
            document.querySelector("html").setAttribute("theme", theme)
        }

        const sideStore = useSideStore()
        const { hasSide, sideActive } = storeToRefs(sideStore)
        const showSide = () => {
            sideActive.value = !sideActive.value
        }

        const router = useRouter()
        const backHome = () => {
            router.push("/")
        }

        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeClass,
            themeIcon,
            themeChange,
            showSide,
            backHome,
            hasSide,
            sideActive
        }
    }
}