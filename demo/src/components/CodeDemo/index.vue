<template>
    <div class="code-demo">
        <pre >
            <code autodetect v-for="code in hljsCode" :key="code.id">
                {{ code.code }}
            </code>
        </pre>
    </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
    name: 'CodeDemo',
    props: {
        code: {
            type: [String, Array],
            default: ''
        }
    },
    setup(props) {

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
                hljs.highlightBlock(block)
                block.innerHTML = block.innerHTML.trim()
            })
          
        })
        return { hljsCode }
    }
}
</script>
<style lang="scss" scoped>
.code-demo {
    code.hljs{
        color:var(--theme-code-color);
        background-color: var(--theme-code-background);
        font-family: FangYuan;
    }

}
</style>