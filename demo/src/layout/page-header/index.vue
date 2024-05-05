<template>
    <header class="header">
        <div class="header-main">
            <div class="header-left">
                <slot name="left">
                    <e-button class="header-title" :icon="titleIcon" :text="title" />
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="headerLinks.length">
                        <div class="header-links">
                            <a v-for="item in  headerLinks " :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <e-button :text="item.title">
                                    <e-svg size="24" color="#fff" :name="item.icon" />
                                </e-button>
                            </a>
                        </div>
                    </template>
                    <template v-if="themeControl">
                        <div class="theme-control">
                            <div class="theme-btn" :class="themeClass">
                                <e-button v-for=" item in themeIcon " :key="item.theme" :class="item.theme" gap="0"
                                    @click="themeChange($event,item.toChangeTheme)">
                                    <e-svg size="24" :color="item.color" :name="item.theme" />
                                </e-button>
                            </div>
                        </div>
                    </template>
                </slot>
            </div>
        </div>
    </header>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed } from "vue"
import { useThemeStore } from "@/store/useThemeStore"
import EButton from "@/components/Button"
import ESvg from "@/components/Svg"

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
                        icon: "blog",
                        path: "https://wzcoding.github.io/blog/",
                    },
                    {
                        title: "Github",
                        icon: "github",
                        path: "https://github.com/wzCoding?tab=repositories",
                    }
                ]
            }
        }
    },
    components: {
        EButton,
        ESvg
    },
    setup() {
        const themeStore = useThemeStore()
        const themeClass = computed(() => themeStore.theme)
        const themeIcon = [
            {
                theme: "light",
                color: "#f19b3d",
                toChangeTheme: "dark"
            },
            {
                theme: "dark",
                color: "#0c81e4",
                toChangeTheme: ""
            }
        ]
        const themeChange = (event,theme) => {
            themeStore.toggleTheme(event,theme)
        }

        return {
            themeClass,
            themeIcon,
            themeChange,
        }
    }
}
</script>