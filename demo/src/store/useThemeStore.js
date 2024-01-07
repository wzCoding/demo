import { ref } from "vue"
import { defineStore } from "pinia"
import { setStorageCache, getStorageCache } from "@/utils"

let first = true
const defaultTheme = ""
const themeKey = "demo-theme"

export const useThemeStore = defineStore("theme", () => {
    const theme = ref(getStorageCache(themeKey) || defaultTheme)
    
    if(first){
        first = false
        if(theme.value !== defaultTheme) toggleTheme(theme.value)
    }

    function toggleTheme(name) {
        theme.value = name
        document.documentElement.setAttribute('theme', name)
        setStorageCache(themeKey, theme.value)
    }

    return { theme, toggleTheme }
})
