import { ref, toRefs } from "vue"
import IconButton from "@/components/IconButton/index.vue"
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

        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeClass,
            themeIcon,
            themeChange,
        }
    }
}