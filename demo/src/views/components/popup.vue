<template>
    <div class="components-popup components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
                <template v-for="example in item.options" :key="example.target">
                    <e-button :class="example.target" size=default type="primary" :text="example.trigger" />
                    <e-popup :direction="example.direction" :target="example.target" :trigger="example.trigger"
                        :confirm="example.confirm || false" :cancel="example.cancel || false"
                        :placement="example.placement || 'outside'" :fullScreen="example.fullScreen || false"
                        :needArrow="example.needArrow || true" :modal="example.modal || false" :width="example.width || 'auto'">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus numquam reprehenderit neque
                            non
                        </span>
                    </e-popup>
                </template>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import EPopup from '@/components/Popup/template'
import EButton from '@/components/Button'
import CodeDemo from '@/components/CodeDemo'
const examples = [
    {
        desc: "普通popup",
        options: [
            {
                trigger: "click",
                direction: "top",
                target: "click-btn"
            },
            {
                trigger: "hover",
                direction: "top",
                target: "hover-btn"
            },
        ],
        code: `<e-popup direction="top" target="click-btn" trigger="click"></e-popup>
<e-popup direction="top" target="hover-btn" trigger="hover"></e-popup>`,
        type: "html",

    },
    {
        desc: "popup 带操作按钮",
        options: [
            {
                trigger: "click",
                direction: "top",
                target: "click-btn-options",
                confirm: true,
                cancel: true

            }
        ],
        code: `<e-popup direction="top" target="click-btn-options" trigger="click" confirm=true cancel=true></e-popup>`,
        type: "html",
    },
    {
        desc: "popup 全屏",
        options: [
            {
                trigger: "click",
                direction: "center",
                target: "click-btn-fullScreen",
                needArrow: true,
                placement: "inside",
                fullScreen: true,
                modal: true,
                width:300
            }
        ],
        code: `<e-popup direction="top" target="click-btn-fullScreen" trigger="click" placement="inside" fullScreen></e-popup>`,
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