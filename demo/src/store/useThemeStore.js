import { ref } from "vue"
import { defineStore } from "pinia"
import { setStorageCache, getStorageCache,viewTransition } from "@/utils"

let hasTheme = false
const defaultTheme = ""
const themeKey = "demo-theme"

export const useThemeStore = defineStore("theme", () => {
    const theme = ref(getStorageCache(themeKey) || defaultTheme)
    if(!hasTheme){
        if(theme.value !== defaultTheme) toggleTheme(theme.value)
        hasTheme = true
    }
    
    function toggleTheme(event,name) {
        theme.value = name
        if(hasTheme){
            viewTransition(event,()=>{
                document.documentElement.setAttribute('theme', name)
                setStorageCache(themeKey, theme.value)
            },theme.value)
        }
    }
    
    return { theme, toggleTheme }
})
