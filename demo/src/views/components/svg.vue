<template>
    <div class="components-svg components-page">
        <div class="item">
            <div class="display-area">
                <icon-svg>
                    <About />
                </icon-svg>
                <icon-svg>
                    <Comp />
                </icon-svg>
                <icon-svg>
                    <Css />
                </icon-svg>
                <icon-svg>
                    <Chart />
                </icon-svg>
            </div>
            <code-demo :desc="examples[0].desc" :type="examples[0].type" :code="examples[0].code" />
        </div>
        <div class="item">
            <div class="display-area">
                <icon-svg name="about" />
                <icon-svg name="comp" />
                <icon-svg name="css" />
                <icon-svg name="chart" />
            </div>
            <code-demo :desc="examples[1].desc" :type="examples[1].type" :code="examples[1].code" />
        </div>
        <div class="item">
            <div class="display-area">
                <icon-svg name="about" color=yellowgreen size=24 />
                <icon-svg name="comp" color=#db7093 size=36 />
                <icon-svg name="css" color=#add8e6 size=48 />
                <icon-svg name="chart" color=#daa520 size=56 />
            </div>
            <code-demo :desc="examples[2].desc" :type="examples[2].type" :code="examples[2].code" />
        </div>
    </div>
</template>
<script setup>
import CodeDemo from '@/components/CodeDemo'
import IconSvg from '@/components/IconSvg'
import About from '@/assets/images/svg/about.vue'
import Comp from '@/assets/images/svg/comp.vue'
import Css from '@/assets/images/svg/css.vue'
import Chart from '@/assets/images/svg/chart.vue'
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
import Comp from '@/assets/images/svg/comp.vue'
import Css from '@/assets/images/svg/css.vue'
import Chart from '@/assets/images/svg/chart.vue'

<icon-svg><About /></icon-svg>
<icon-svg><Comp /></icon-svg>
<icon-svg><Css /></icon-svg>
<icon-svg><Chart /></icon-svg>`
        ],
        type: 'html'
    },
    {
        desc: "通过 name 属性引用图标",
        code:
            `<icon-svg name="about" />
<icon-svg name="comp"/>
<icon-svg name="css"/>
<icon-svg name="canvas"/>`,
        type: 'html'
    },
    {
        desc: "调整尺寸和颜色",
        code:
`<icon-svg name="about" color=yellowgreen size=24 />
<icon-svg name="comp" color=#db7093 size=36 />
<icon-svg name="css" color=#add8e6 size=48 />
<icon-svg name="chart" color=#daa520 size=56 />`,
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