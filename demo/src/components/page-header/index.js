import { ref, toRefs, computed } from "vue"
import iconButton from '@/components/icon-button/index.vue'
export default {
    name: "pageHeader",
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
        iconButton
    },
    setup(props) {
        const { title, titleIcon, themeControl, headerLinks } = toRefs(props)
        const themeClass = ref("")
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
              console.log(themeClass.value)
              document.querySelector("html").setAttribute("theme",theme)
        }
        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeClass,
            themeIcons,
            themeChange
        }
    }
}