<template>
    <div class="code-demo">
        <div class="code-info">
            <h4 class="code-desc">{{ desc }}</h4>
            <icon-button class="code-open" @click="openCode">
                <icon-svg size="24" color="--theme-gradient-color-2">
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
import { computed, nextTick, ref } from 'vue'
import { findScrollElement } from '@/utils/index'
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
            if (!props.code || !props.code.length) return
            showCode.value = !showCode.value
            emit('openCode', { open: showCode.value, event: e })

            if (showCode.value) {

                const codeElement = e.currentTarget.parentNode.nextSibling
                const [scrollElement] = findScrollElement(codeElement)
                const [children] = [...scrollElement.children]
                const codeDemo = scrollElement.querySelectorAll('.code-demo')

                //判断是否最后一个元素
                const isLast = [...codeDemo].indexOf(codeElement.parentNode) === codeDemo.length - 1
                //判断是否需要滚动
                const needScroll = children.clientHeight !== scrollElement.scrollHeight
                nextTick(() => {
                    // 滚动到当前元素，避免scrollIntoView方法产生改变页面高度的问题
                    if (isLast) {
                        scrollElement.scroll({
                            top: codeElement.clientHeight + scrollElement.scrollTop,
                            left: 0,
                            behavior: "smooth",
                        })
                    } else if (needScroll) {
                        codeElement.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        })
                    }
                })
            }
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