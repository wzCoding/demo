import { createApp } from 'vue'
import { debounce, getElementPosition } from '@/utils/index'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './mock'
import './assets/css/theme.css'

const app = createApp(App)

app.directive("tip", {
    mounted(el, binding) {
        console.log(el)
        console.log(this)
        const moblieWidth = 768
        const pageWidth = document.documentElement.clientWidth
        if (!binding.arg || binding.arg !== "mobile") {
            render()
        } else {
            if (pageWidth <= moblieWidth) {
                render()
            } else {
                window.onresize = debounce((e) => {
                    const width = document.documentElement.clientWidth
                    console.log(width)
                    if (width < moblieWidth) {
                        render()
                    }
                }, 2000)
            }
        }
        function render() {
            const toolTip = document.createElement("div")

            toolTip.className = "toolTip"
            toolTip.innerText = binding.value
            toolTip.setAttribute("tip",binding.value)
            el.setAttribute("tip",binding.value)
            const styleObj = {
                "position": "absolute",
                "z-index": "9999",
                "top": `${getElementPosition(el).y}px`,
                "left": `${getElementPosition(el).x}px`
            }
            for (let item in styleObj) {
                toolTip.style[item] = styleObj[item]
            }
            document.body.appendChild(toolTip)
        }
    },
    unmounted(el, binding) {

    },

})
app.use(ElementPlus)
app.use(router)

app.mount('#app')





