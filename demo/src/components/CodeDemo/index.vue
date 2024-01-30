<template>
    <div class="code-demo">
        <div class="code-info">
            <slot>
                <h4 class="code-desc">{{ desc }}</h4>
            </slot>
            <icon-button class="code-open" @click="openCode">
                <icon-svg size="32">
                    <icon-code></icon-code>
                </icon-svg>
            </icon-button>
        </div>
        <pre>
            <code autodetect v-for="code in hljsCode" :key="code.id">
                {{ code.code }}
            </code>
        </pre>
    </div>
</template>
<script>
import { computed, onMounted } from 'vue'
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
        }
    },
    components: { IconButton, IconSvg, IconCode },
    setup(props) {
        const openCode = () => {
            console.log('打开代码')
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
        return { hljsCode, openCode }
    }
}
</script>
<style lang="scss" scoped>
.code-demo {
    width: 100%;

    code.hljs {
        color: var(--theme-code-color);
        background-color: var(--theme-code-background);
        font-family: FangYuan;
    }

}
</style>