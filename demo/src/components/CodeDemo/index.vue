<template>
    <div class="code-demo">
        <div class="code-info">
            <slot>
                <h4 class="code-desc">{{ desc }}</h4>
            </slot>
            <icon-button class="code-open" @click="openCode">
                <icon-svg size="24" color="theme-gradient">
                    <icon-code></icon-code>
                </icon-svg>
            </icon-button>
        </div>
        <transition name="rotate-in">
            <pre v-show="showCode">
                <code v-for="code in hljsCode" :key="code.id" :class="code.class" :innerHTML="code.code"></code>
            </pre>
        </transition>
    </div>
</template>
<script>
import { computed, ref } from 'vue'
import IconButton from '@/components/IconButton'
import IconSvg from '@/components/IconSvg'
import IconCode from '@/assets/images/svg/code.vue'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' //默认样式主题

export default {
    name: 'CodeDemo',
    props: {
        desc: {
            type: String,
            default: 'code demo'
        },
        type: { type: String, default: 'javascript' },
        code: {
            type: [String, Array],
            default: ''
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    emits: ['openCode'],
    components: { IconButton, IconSvg, IconCode },
    setup(props, { emit }) {
        const showCode = ref(props.open)
        const openCode = (e) => {
            emit('openCode', { open: showCode, event: e })
        }
        const hljsCode = computed(() => {
            const codes = []
            if (typeof props.code === 'string') codes.push(props.code)
            else codes.push(...props.code)
            return codes.map((item, index) => {
                const { value } = hljs.highlight(item, { language: props.type })
                return {
                    code: value.trim(),
                    class: `hljs language-${props.type}`,
                    id: `code-${index}`
                }
            })
        })

        return { hljsCode, showCode, openCode }
    }
}
</script>
<style lang="scss" src="./index.scss" scoped></style>