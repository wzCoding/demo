<template>
    <div class="components-message components-page">
       
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
.message-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 10px;
}


</style>