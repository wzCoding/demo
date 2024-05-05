import { ref } from "vue"
import { defineStore } from "pinia"
import { setStorageCache, getStorageCache,viewTransition } from "@/utils"

let first = true
const defaultTheme = ""
const themeKey = "demo-theme"

export const useThemeStore = defineStore("theme", () => {
    const theme = ref(getStorageCache(themeKey) || defaultTheme)
    
    if(first){
        if(theme.value !== defaultTheme) toggleTheme(theme.value)
        first = false
    }
    
    function toggleTheme(event,name) {
        theme.value = name
        if(!first){
            viewTransition(event,()=>{
                document.documentElement.setAttribute('theme', name)
                setStorageCache(themeKey, theme.value)
            },theme.value)
        }
    }
    
    return { theme, toggleTheme }
})
