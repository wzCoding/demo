<template>
    <div class="page-menu">
        <div class="menu-button" :style="buttonStyle" :class="{ active: visible }" @click="handleButonClick">
            <icon-button class="menu-icon" :style="iconStyle">
                <icon-svg size="32" :name="title" />
            </icon-button>
        </div>
        <transition name="scale">
            <div class="menu" v-show="visible" :style="transformStyle">
                <div class="menu-content">
                    <div class="menu-box">
                        <Card v-for="menu in menulist" :key="menu.title" width="fit-content" backgroundAnimation
                            :title="menu.titleCN" :class="{ active: menu.active }" @click="handleMenuClick(menu)" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed, ref } from 'vue'
import Card from '@/components/Card'
import IconButton from '../IconButton'
import IconSvg from '../IconSvg'

export default {
    name: "PageMneu",
    props: {
        position: {
            type: String,
            default: 'top-left',
            validator: (value) => {
                return ['top-left', 'bottom-left', 'bottom-right'].includes(value)
            }
        },
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        menus: {
            type: Array,
            default: () => []
        },
        active: {
            type: [String, Number],
            default: 0
        }
    },
    components: { IconButton, IconSvg, Card },
    emits: ["visibleChange", "menuClick"],
    setup(props, { emit }) {
        const [direction, align] = props.position.split('-')
        const radiusReverse = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left',
        }
        const buttonStyle = computed(() => {
            return {
                "position": "absolute",
                [direction]: 0,
                [align]: 0,
                [`border-${radiusReverse[direction]}-${radiusReverse[align]}-radius`]: '100%'
            }
        })
        const iconStyle = computed(() => {
            return {
                "position": "absolute",
                [direction]: '8px',
                [align]: '8px',
            }
        })
        const transformStyle = computed(() => {
            return {
                "transform-origin": `${direction} ${align}`,
            }
        })

        const active = ref(props.active)
        const menulist = computed(() => {
            return props.menus.map((item, index) => {
                return { ...item, active: index === active.value }
            })
        })
        const setActive = (menu) => {
            menulist.value.forEach((item, index) => {
                if (menu.title == item.title) {
                    active.value = index
                }
            })
        }
        const visible = ref(props.show || false)
        const handleButonClick = () => {
            emit("visibleChange", visible)
        }

        const handleMenuClick = (menu) => {
            setActive(menu)
            emit("menuClick", menu, visible)
            console.log(props.title)
        }

        return {
            visible,
            buttonStyle,
            iconStyle,
            transformStyle,
            menulist,
            handleButonClick,
            handleMenuClick
        }
    }
}
</script>