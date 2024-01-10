<template>
    <div class="page-menu">
        <div class="menu-button" :style="buttonStyle" :class="{ active: active }" @click="handleButonClick">
            <icon-button class="menu-icon" :style="iconStyle">
                <icon-svg size="32">
                    <component :is="IconMenu"></component>
                </icon-svg>
            </icon-button>
        </div>
        <transition name="scale">
            <div class="menu" v-show="active" :style="transformStyle">
                <div class="menu-content">
                    <Card :auto-size="true" :border-animation="true" :background-animation="true" title="waves"
                        @cardClick="handleMenuClick" />
                </div>
            </div>
        </transition>
    </div>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { computed, ref } from 'vue'
import Card from '../Card'
import IconButton from '../IconButton'
import IconSvg from '../IconSvg'
//引入svg图标
import IconMenu from '@/assets/images/svg/menu.vue'

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
        visible: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => []
        }
    },
    components: { IconButton, IconSvg, Card },
    emits: ["visibleChange", "menuClick"],
    setup(props, { emit }) {
        const [direction, align] = props.position.split('-')
        const borderReverse = {
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
                [`border-${borderReverse[direction]}-${borderReverse[align]}-radius`]: '100%'
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
        const active = ref(props.visible || false)
        const handleButonClick = () => {
            emit("visibleChange", active)
        }

        const handleMenuClick = () => {
            emit("menuClick", active)
        }

        return {
            active,
            buttonStyle,
            iconStyle,
            transformStyle,
            close,
            handleButonClick,
            handleMenuClick,
            IconMenu
        }
    }
}
</script>