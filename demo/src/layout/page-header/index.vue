<template>
    <header class="header">
        <div class="header-main">
            <div class="header-left">
                <slot name="left">
                    <icon-button class="header-title" :icon="titleIcon" :text="title" />
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="headerLinks.length">
                        <div class="header-links">
                            <a v-for="item in  headerLinks " :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <icon-button :text="item.title">
                                    <icon-svg size="24" color="#fff">
                                        <component :is="item.icon"></component>
                                    </icon-svg>
                                </icon-button>
                            </a>
                        </div>
                    </template>
                    <template v-if="themeControl">
                        <div class="theme-control">
                            <div class="theme-btn" :class="themeClass">
                                <icon-button v-for=" item in themeIcon " :key="item.theme" :class="item.theme" gap="0"
                                    @click="themeChange(item.toChangeTheme)">
                                    <icon-svg size="24" :color="item.color">
                                        <component :is="item.icon"></component>
                                    </icon-svg>
                                </icon-button>
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
import IconSvg from "@/components/IconSvg"

//引入svg图标
import IconBlog from "@/assets/images/svg/blog.vue"
import IconGithub from "@/assets/images/svg/github.vue"
import IconLight from "@/assets/images/svg/light.vue"
import IconDark from "@/assets/images/svg/dark.vue"

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
                        icon: IconBlog,
                        path: "https://wzcoding.github.io/blog/",
                    },
                    {
                        title: "Github",
                        icon: IconGithub,
                        path: "https://github.com/wzCoding?tab=repositories",
                    }
                ]
            }
        }
    },
    components: {
        IconButton,
        IconSvg
    },
    setup() {
        const themeStore = useThemeStore()
        const themeClass = computed(() => themeStore.theme)
        const themeIcon = [
            {
                theme: "light",
                color: "#f19b3d",
                icon: IconLight,
                toChangeTheme: "dark"
            },
            {
                theme: "dark",
                color: "#0c81e4",
                icon: IconDark,
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