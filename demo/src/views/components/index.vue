<template>
    <div class="loading-page">
        <div class="item" v-for="item in examples" :key="item.id">
            <div v-if="item.mode === 'direction'" class="display-area" v-loading="item.direction"></div>
            <div v-else-if="item.mode === 'service'" class="display-area" :id="item.id"></div>
            <code-demo :desc="item.desc" :code="item.code" @open-code ="openCode"></code-demo>
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
onMounted(() => {
    Loading.service({ target: "#loading-area2", show: true, text: "加载中......", zIndex: 901, })
    Loading.service({ target: "#loading-area3", show: true, zIndex: 901, background: 'rgba(214, 255, 255, 0.5)', color: ['green', 'yellowgreen'] })
    Loading.service({ target: "#loading-area4", show: true, zIndex: 901, customClass: 'custom-class' })
})

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

:deep(.custom-class) {
    width: 200px;
    height: 30px;
    border: 1px solid var(--theme-gradient-color-1);
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 5px var(--theme-gradient-color-1);

    &::after {
        content: '';
        position: absolute;
        inset: 3px;
        background-image: repeating-linear-gradient(to right, var(--theme-gradient-color-2), var(--theme-gradient-color-1) 8%, transparent 8%, transparent 10%);
        animation: move 4s steps(10, start) infinite;
    }

    @keyframes move {
        0% {
            transform: translate(-100%);
        }

        100% {
            transform: translate(0);
        }
    }
}
</style>