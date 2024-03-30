<template>
    <div class="components-button components-page" @click="handleClick">
        <div class="item">
            <div class="display-area">
                <e-button size="default" type="default">button</e-button>
                <e-button size="default" type="primary">button</e-button>
                <e-button size="default" type="success">button</e-button>
                <e-button size="default" type="warning">button</e-button>
                <e-button size="default" type="danger">button</e-button>
            </div>
            <code-demo :desc="examples[0].desc" :type="examples[0].type" :code="examples[0].code"/>
        </div>
        <div class="item">
            <div class="display-area">
                <e-button size="small" type="default">button</e-button>
                <e-button size="default" type="primary">button</e-button>
                <e-button size="large" type="success">button</e-button>
                <e-button size="default" type="warning">button</e-button>
                <e-button size="small" type="danger">button</e-button>
            </div>
            <code-demo :desc="examples[1].desc" :type="examples[1].type" :code="examples[1].code"/>
        </div>
        <div class="item">
            <div class="display-area">
                <e-button size="default" type="default">
                    <e-svg name="components"></e-svg>
                    组件
                </e-button>
                <e-button size="default" type="primary">
                    <e-svg name="info"></e-svg>
                    info
                </e-button>
                <e-button size="default" type="success">
                    <e-svg name="success"></e-svg>
                    success
                </e-button>
                <e-button size="default" type="warning">
                    <e-svg name="warning"></e-svg>
                    warning
                </e-button>
                <e-button size="default" type="danger">
                    <e-svg name="error"></e-svg>
                    error
                </e-button>
            </div>
            <code-demo :desc="examples[2].desc" :type="examples[2].type" :code="examples[2].code"/>
        </div>
    </div>
</template>
<script setup>
import EButton from '@/components/Button'
import ESvg from '@/components/Svg'
import CodeDemo from '@/components/CodeDemo'
import { Message } from '@/components/Message'

const handleClick = ($event) => {
    if ($event.target.nodeName == "BUTTON") {
        Message.info({
            text: "click Button !",
            group: true,
            showClose: true
        })
    }
}
const examples = [
    {
        desc: "普通按钮",
        code:
            `<e-button size="default" type="default">button</e-button>
<e-button size="default" type="primary">button</e-button>
<e-button size="default" type="success">button</e-button>
<e-button size="default" type="warning">button</e-button>
<e-button size="default" type="danger">button</e-button>`,
        type: "html",
    },
    {
        desc: "调整尺寸",
        code:
            `<e-button size="small" type="default">button</e-button>
<e-button size="default" type="primary">button</e-button>
<e-button size="large" type="success">button</e-button>
<e-button size="default" type="warning">button</e-button>
<e-button size="small" type="danger">button</e-button>`,
        type: "html",
    },
    {
        desc: "添加图标",
        code:
            `<e-button size="default" type="default">
    <e-svg><icon-components/></e-svg>
    组件
</e-button>
<e-button size="default" type="primary">
    <e-svg name="info"></e-svg>
    info
</e-button>
<e-button size="default" type="success">
    <e-svg name="success"></e-svg>
    success
</e-button>
<e-button size="default" type="warning">
    <e-svg name="warning"></e-svg>
    warning
</e-button>
<e-button size="default" type="danger">
    <e-svg name="danger"></e-svg>
    error
</e-button>`,
        type: "html",
    },
]
</script>
<style lang="scss" scoped>
.display-area {
    
    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>