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
            type: String,
            default: ""
        },
        headerLinks: {
            type: Array,
            default() {
                return [
                    {
                        name:"Github",
                        icon:"",
                        link:""
                    }
                ]
            }
        }
    },
    components:{
        iconButton
    },
    setup(props) {
        const { title, titleIcon, themeControl, headerLinks } = toRefs(props)
        return {
            title,
            titleIcon,
            themeControl,
            headerLinks,
        }
    }
}