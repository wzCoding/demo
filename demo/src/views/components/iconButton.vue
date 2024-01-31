<template>
    <div class="iconButton-page">
        <div class="item">
            <div class="display-area">
                <icon-button size="default" type="default">button</icon-button>
                <icon-button size="default" type="primary">button</icon-button>
                <icon-button size="default" type="success">button</icon-button>
                <icon-button size="default" type="warning">button</icon-button>
                <icon-button size="default" type="danger">button</icon-button>
            </div>
            <code-demo></code-demo>
        </div>
        <div class="item">
            <div class="display-area">
            </div>
            <code-demo></code-demo>
        </div>
        <div class="item">
            <div class="display-area">
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
    }
]
</script>
<style lang="scss" scoped>
.iconButton-page {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    
    .item {
        background-color: var(--theme-page-background);
        .display-area {
            min-height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:nth-child(1) {
                justify-content: center;
                gap: 1.25rem;
            }
        }
    }
}
</style>