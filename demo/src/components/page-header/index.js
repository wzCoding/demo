import { ref, toRefs, computed } from "vue"
import IconButton from '../icon-button/index.vue'
import SideBar from "../side-bar/index.vue"
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
                        name: "Blog",
                        icon: "blog.svg",
                        link: "https://wzcoding.github.io/blog/"
                    },
                    {
                        name: "Github",
                        icon: "github.svg",
                        link: "https://github.com/wzCoding?tab=repositories"
                    }
                ]
            }
        }
    },
    components: {
        IconButton,
        SideBar
    },
    setup(props) {
        const { title, titleIcon, themeControl, headerLinks } = toRefs(props)
        const themeClass = ref("")
        const menuActive = ref(false)
        const themeIcons = [
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
              document.querySelector("html").setAttribute("theme",theme)
        }
        const showHeaderMenu =()=> {
              menuActive.value = !menuActive.value
        }
        
        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeClass,
            themeIcons,
            menuActive,
            themeChange,
            showHeaderMenu,
        }
    }
}