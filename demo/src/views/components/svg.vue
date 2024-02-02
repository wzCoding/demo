<template>
    <div class="components-svg components-page">
        <icon-svg name="about" color="red"></icon-svg>
        <icon-svg name="123"></icon-svg>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import CodeDemo from '@/components/CodeDemo';
import IconSvg from '@/components/IconSvg';
const examples = [
    {
        desc: "将 svg 图标路径复制保存在 template 模板中，并去掉路径中的 fill 属性",
        id: "loading-area1",
        direction: { show: true, zIndex: 901 },
        code: `<div v-loading="true"></div>`,
        mode: "direction"
    },
    {
        desc: "将 svg 图标模板文件导入组件，并在 svg 容器中使用",
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