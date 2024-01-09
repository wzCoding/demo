<template>
    <header class="header">
        <div class="header-main">
            <div class="header-left">
                <slot name="left">
                    <IconButton class="header-title" :icon="titleIcon" :text="title"/>
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="headerLinks.length">
                        <div class="header-links">
                            <a v-for="item in  headerLinks " :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <IconButton :icon="item.icon" :text="item.title" />
                            </a>
                        </div>
                    </template>
                    <template v-if="themeControl">
                        <div class="theme-control">
                            <div class="theme-btn" :class="themeClass">
                                <IconButton v-for=" item  in  themeIcon " :key="item.theme" :icon="item.icon"
                                    :class="item.theme" gap="0" @click="themeChange(item.toChangeTheme)" />
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
import IconButton from "@/components/IconButton"
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
    setup() {
        const themeStore = useThemeStore()
        const themeClass = computed(() => themeStore.theme)
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
            themeStore.toggleTheme(theme)
        }

        return {
            themeClass,
            themeIcon,
            themeChange,
        }
    }
}
</script>