import { ref, toRefs, watch, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
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
        headerLinks.value.forEach(item => {
             item.tip = ref(false)
        })
        
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

        const hamburgerActive = ref(false)
        const showMenu = () => {
            hamburgerActive.value = !hamburgerActive.value
        }


        const router = useRouter()
        const backHome = () => {
            router.push("/")
        }

        const route = useRoute()
        const headerMenuClass = ref("")
        watch(route, (newRoute) => {
            headerMenuClass.value = newRoute.path !== "/" && newRoute.name !== "home" ? "drawer-menu" : ""
        })

        const showToolTip = (e,tip) => {
            const el = e.target.querySelector(".text")
            const displayStyle = getComputedStyle(el).display
            tip.value = displayStyle == "none"
        }
        const hideToolTip = (tip) => {
            tip.value = false
        }
        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeClass,
            themeIcon,
            hamburgerActive,
            headerMenuClass,
            themeChange,
            showMenu,
            showToolTip,
            hideToolTip,
            backHome
        }
    }
}