import { ref } from "vue"
import { defineStore } from "pinia"
import { setStorageCache, getStorageCache } from "@/utils"

let hasTheme = false
const defaultTheme = ""
const themeKey = "demo-theme"

function viewTransition(callback = null) {
    if (!document.startViewTransition) {
        return callback
    }
    return function (reverse = false, event = null) {
        //获取点击事件的页面坐标，从点击位置开始过渡
        const x = event ? event.clientX : document.body.clientWidth / 2
        const y = event ? event.clientY : document.body.clientHeight / 2

        //获取过渡动画的半径
        const endRadius = Math.hypot(
            Math.max(x, document.body.clientWidth - x),
            Math.max(y, document.body.clientHeight - y)
        );
        //剪裁路径
        const path = [`circle(0 at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        const transition = document.startViewTransition(() => {
            // 过渡动画执行完毕后的回调函数
            callback && callback(reverse)
        })
        transition.ready.then(() => {
            //使用 animate 动画函数执行过渡动画
            document.documentElement.animate(
                {
                    clipPath: reverse ? path.reverse() : path,
                },
                {
                    duration: 300,
                    easing: 'ease-in',
                    pseudoElement: reverse ? '::view-transition-old(root)' : '::view-transition-new(root)',
                }
            )
        })
    }
}
//theme切换回调
function themeCallback(theme) {
    document.documentElement.setAttribute('theme', theme)
    setStorageCache(themeKey, theme)
}
//theme切换过渡方法
const themeFunc = viewTransition(themeCallback)

export const useThemeStore = defineStore("theme", () => {
    const theme = ref(getStorageCache(themeKey) || defaultTheme)
    if (!hasTheme) {
        if (theme.value !== defaultTheme) toggleTheme(theme.value)
        hasTheme = true
    }

    function toggleTheme(event, name) {
        theme.value = name
        if (hasTheme) {
            themeFunc(theme.value, event)
        }
    }

    return { theme, toggleTheme }
})
