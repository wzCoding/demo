<template>
    <div class="components-iconButton components-page">
        <div class="item">
            <div class="display-area">
                <icon-button size="default" type="default" @click="handleClick">button</icon-button>
                <icon-button size="default" type="primary" @click="handleClick">button</icon-button>
                <icon-button size="default" type="success" @click="handleClick">button</icon-button>
                <icon-button size="default" type="warning" @click="handleClick">button</icon-button>
                <icon-button size="default" type="danger" @click="handleClick">button</icon-button>
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
                <icon-button size="small" type="default">button</icon-button>
                <icon-button size="default" type="primary">button</icon-button>
                <icon-button size="large" type="success">button</icon-button>
                <icon-button size="default" type="warning" @click="handleClick">button</icon-button>
                <icon-button size="small" type="danger" @click="handleClick">button</icon-button>
            </div>
            <code-demo></code-demo>
        </div>
        <div class="item">
            <div class="display-area">
            </div>
            <code-demo></code-demo>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import IconButton from '@/components/IconButton'
import CodeDemo from '@/components/CodeDemo';
const handleClick = ($event) => {

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
`<icon-button size="default" type="default"></icon-button>`,
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