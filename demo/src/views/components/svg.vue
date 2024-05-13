<template>
    <div class="components-svg components-page">
        <div class="item">
            <div class="display-area">
                <e-svg color="--theme-text-color">
                    <About />
                </e-svg >
                <e-svg color="--theme-text-color">
                    <components />
                </e-svg>
                <e-svg color="--theme-text-color">
                    <demo />
                </e-svg>
                <e-svg color="--theme-text-color">
                    <Charts />
                </e-svg>
            </div>
            <code-demo :desc="examples[0].desc" :type="examples[0].type" :code="examples[0].code" />
        </div>
        <div class="item">
            <div class="display-area">
                <e-svg name="about" color="--theme-text-color" />
                <e-svg name="components" color="--theme-text-color"/>
                <e-svg name="demo" color="--theme-text-color"/>
                <e-svg name="charts" color="--theme-text-color"/>
            </div>
            <code-demo :desc="examples[1].desc" :type="examples[1].type" :code="examples[1].code" />
        </div>
        <div class="item">
            <div class="display-area">
                <e-svg name="about" color=yellowgreen size=24 />
                <e-svg name="components" color=#db7093 size=36 />
                <e-svg name="demo" color=#add8e6 size=48 />
                <e-svg name="charts" color=#daa520 size=56 />
            </div>
            <code-demo :desc="examples[2].desc" :type="examples[2].type" :code="examples[2].code" />
        </div>
    </div>
</template>
<script setup>
import CodeDemo from '@/components/CodeDemo'
import ESvg from '@/components/Svg'
import About from '@/assets/images/svg/about.vue'
import components from '@/assets/images/svg/components.vue'
import demo from '@/assets/images/svg/demo.vue'
import Charts from '@/assets/images/svg/charts.vue'
const examples = [
    {
        desc: "将 svg 图标路径 path 保存在 .vue 模板中",
        code: [
            `// About.vue 图标文件
<template>
    <path d="xxx......"  />
</template>`,
            `// 引入 .vue 图标文件并使用
import About from '@/assets/images/svg/about.vue'
import components from '@/assets/images/svg/components.vue'
import demo from '@/assets/images/svg/demo.vue'
import Charts from '@/assets/images/svg/chart.vue'

<e-svg><About /></e-svg>
<e-svg><components /></e-svg>
<e-svg><demo /></e-svg>
<e-svg><Charts /></e-svg>`
        ],
        type: 'html'
    },
    {
        desc: "通过 name 属性引用图标",
        code:
            `<e-svg name="about" />
<e-svg name="components"/>
<e-svg name="demo"/>
<e-svg name="canvas"/>`,
        type: 'html'
    },
    {
        desc: "调整尺寸和颜色",
        code:
`<e-svg name="about" color=yellowgreen size=24 />
<e-svg name="components" color=#db7093 size=36 />
<e-svg name="demo" color=#add8e6 size=48 />
<e-svg name="charts" color=#daa520 size=56 />`,
        type: 'html'
    }
]
</script>
<style lang="scss" scoped>
.display-area {

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>