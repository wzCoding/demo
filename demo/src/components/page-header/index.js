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
        const theme = ref("light")
        const themeIcons = [
            {
                theme: "light",
                icon: require('@/assets/images/theme/light.svg'),
            },
            {
                theme: "light",
                icon: require('@/assets/images/theme/dark.svg'),
            }
        ]

        return {
            title,
            titleIcon,
            headerLinks,
            themeControl,
            themeIcons
        }
    }
}