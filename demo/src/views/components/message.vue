<template>
    <div class="message-page">
        <icon-button size="small" type="default">
            button
        </icon-button>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Message } from '@/components/Message';
import CodeDemo from '@/components/CodeDemo';
import IconButton from '@/components/IconButton';
const examples = [
    {
        desc: "通过自定义指令 v-loading 使用",
        id: "loading-area1",
        direction: { show: true, zIndex: 901 },
        code: `<div v-loading="true"></div>`,
        mode: "direction"
    },
    {
        desc: "通过服务方式使用",
        id: "loading-area2",
        code: [
            `Loading.service({
    zIndex: 901,
    target: '#loading-area3', 
    show: true,
    text: "加载中......",
})`,
        ],
        mode: "service"
    },
    {
        desc: "更改颜色",
        id: "loading-area3",
        code: [
            `Loading.service({
    zIndex: 901,
    target: '#loading-area3', 
    show: true,
    background: 'rgba(214, 255, 255, 0.5)', 
    color: ['green', 'yellowgreen']
})`,
        ],
        mode: "service"
    },
    {
        desc: "使用自定义加载样式",
        id: "loading-area4",
        code: [
            `Loading.service({
    zIndex: 901,
    target: '#loading-area3', 
    show: true,
    customClass: 'custom-class'
})`,
        ],
        mode: "service"
    }
]
const openCode = (param)=>{
    param.open.value = !param.open.value
}

</script>
<style lang="scss" scoped>
.loading-page {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    gap: 1px;
    background-color: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;

    .item {
        display: grid;
        background-color: var(--theme-page-background);

        .display-area {
            min-height: 300px;
        }

        .info-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: var(--theme-text-color);
            padding-top: .5rem;

            .desc {
                width: 100%;
                padding: 0 1em;
            }
        }
    }
}


</style>