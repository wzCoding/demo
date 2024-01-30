<template>
    <div class="code-demo">
        <div class="code-info">
            <slot>
                <h4 class="code-desc">{{ desc }}</h4>
            </slot>
            <icon-button class="code-open" @btn-click="openCode">
                <icon-svg size="24">
                    <icon-code></icon-code>
                </icon-svg>
            </icon-button>
        </div>
        <transition name="rotate-in">
            <pre v-show="showCode">
                <code autodetect v-for="code in hljsCode" :key="code.id">
                    {{ code.code }}
                </code>
            </pre>
        </transition>
    </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import IconButton from '@/components/IconButton'
import IconSvg from '@/components/IconSvg'
import IconCode from '@/assets/images/svg/code.vue'

import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/atom-one-dark.css' //默认样式主题

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', html)
hljs.registerLanguage('css', css)

export default {
    name: 'CodeDemo',
    props: {
        desc: {
            type: String,
            default: ''
        },
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
                return {
                    code: item,
                    id: `code-${index}`
                }
            })
        })
        onMounted(() => {
            document.querySelectorAll('.code-demo pre code').forEach((block) => {
                hljs.highlightElement(block)
                block.innerHTML = block.innerHTML.trim()
            })

        })
        return { hljsCode, showCode, openCode }
    }
}
</script>
<style lang="scss" scoped>
.code-demo {
    width: 100%;

    .code-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;

        .code-desc {
            color: var(--theme-text-color);
        }
    }

    code.hljs {
        color: var(--theme-code-color);
        background-color: var(--theme-code-background);
        font-family: FangYuan;
    }

}
</style>