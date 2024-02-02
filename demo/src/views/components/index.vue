<template>
    <div class="components-button components-page" @click="handleClick">
        <div class="item">
            <div class="display-area">
                <icon-button size="default" type="default">button</icon-button>
                <icon-button size="default" type="primary">button</icon-button>
                <icon-button size="default" type="success">button</icon-button>
                <icon-button size="default" type="warning">button</icon-button>
                <icon-button size="default" type="danger">button</icon-button>
            </div>
            <code-demo :desc="examples[0].desc" :type="examples[0].type" :code="examples[0].code"></code-demo>
        </div>
        <div class="item">
            <div class="display-area">
                <icon-button size="small" type="default">button</icon-button>
                <icon-button size="default" type="primary">button</icon-button>
                <icon-button size="large" type="success">button</icon-button>
                <icon-button size="default" type="warning">button</icon-button>
                <icon-button size="small" type="danger">button</icon-button>
            </div>
            <code-demo :desc="examples[1].desc" :type="examples[1].type" :code="examples[1].code"></code-demo>
        </div>
        <div class="item">
            <div class="display-area">
                <icon-button size="default" type="default">
                    <icon-svg><icon-comp /></icon-svg>
                    组件
                </icon-button>
                <icon-button size="default" type="primary">
                    <icon-svg><icon-info /></icon-svg>
                    info
                </icon-button>
                <icon-button size="default" type="success">
                    <icon-svg><icon-success /></icon-svg>
                    success
                </icon-button>
                <icon-button size="default" type="warning">
                    <icon-svg><icon-warning /></icon-svg>
                    warning
                </icon-button>
                <icon-button size="default" type="danger">
                    <icon-svg><icon-error /></icon-svg>
                    error
                </icon-button>
            </div>
            <code-demo :desc="examples[2].desc" :type="examples[2].type" :code="examples[2].code"></code-demo>
        </div>
    </div>
</template>
<script setup>
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo'
import IconSvg from '@/components/IconSvg'
import { Message } from '@/components/Message'

import IconComp from '@/assets/images/svg/comp.vue'
import IconInfo from '@/assets/images/svg/info.vue'
import IconSuccess from '@/assets/images/svg/success.vue'
import IconWarning from '@/assets/images/svg/warning.vue'
import IconError from '@/assets/images/svg/error.vue'

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
            `<icon-button size="default" type="default">button</icon-button>
<icon-button size="default" type="primary">button</icon-button>
<icon-button size="default" type="success">button</icon-button>
<icon-button size="default" type="warning">button</icon-button>
<icon-button size="default" type="danger">button</icon-button>`,
        type: "html",
    },
    {
        desc: "调整尺寸",
        code:
            `<icon-button size="small" type="default">button</icon-button>
<icon-button size="default" type="primary">button</icon-button>
<icon-button size="large" type="success">button</icon-button>
<icon-button size="default" type="warning">button</icon-button>
<icon-button size="small" type="danger">button</icon-button>`,
        type: "html",
    },
    {
        desc: "添加图标",
        code:
            `<icon-button size="default" type="default">
    <icon-svg><icon-comp/></icon-svg>
    组件
</icon-button>
<icon-button size="default" type="primary">
    <icon-svg><icon-info/></icon-svg>
    info
</icon-button>
<icon-button size="default" type="success">
    <icon-svg><icon-success/></icon-svg>
    success
</icon-button>
<icon-button size="default" type="warning">
    <icon-svg><icon-warning/></icon-svg>
    warning
</icon-button>
<icon-button size="default" type="danger">
    <icon-svg><icon-error/></icon-svg>
    error
</icon-button>`,
        type: "html",
    },
]
</script>
<style lang="scss" scoped>
.display-area {
    min-height: 160px !important;

    &:nth-child(1) {
        gap: 1rem;
    }
}
</style>