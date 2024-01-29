<template>
    <div class="loading-page">
        <div class="item" v-for="item in examples" :key="item.id">
            <div v-if="item.mode === 'direction'" class="display-area" v-loading="item.direction"></div>
            <div v-else-if="item.mode === 'service'" class="display-area" :id="item.id"></div>
            <div class="info-area">
                <span class="desc">{{ item.desc }}</span>
                <code-demo :code="item.code"></code-demo>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Loading } from '@/components/Loading';
import CodeDemo from '@/components/CodeDemo';
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
    show: true
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
    background: 'rgba(214, 255, 255, 0.5)', 
    color: ['green', 'yellowgreen'],
    customClass: 'custom-class'
})`,
        ],
        mode: "service"
    }
]
onMounted(() => {
    Loading.service({ target: "#loading-area2", show: true, zIndex: 901, })
    Loading.service({ target: "#loading-area3", show: true, zIndex: 901, background: 'rgba(214, 255, 255, 0.5)', color: ['green', 'yellowgreen'] })
    Loading.service({ target: "#loading-area4", show: true, zIndex: 901, })
})

</script>
<style lang="scss" scoped>
.loading-page {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    gap: 1px;
    background-color: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;

    .item {
        display: grid;
        grid-template-rows: 3fr 1fr;
        background-color: var(--theme-page-background);

        .info-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: var(--theme-text-color);

            .desc {
                padding-bottom: 0.25rem;
            }
        }
    }
}
</style>