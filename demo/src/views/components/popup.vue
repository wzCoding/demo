<template>
    <div class="components-popup components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
                <template v-for="example in item.options" :key="example.target">
                    <icon-button :class="example.target" size=default type="primary" :text="example.trigger" />
                    <Popup :direction="example.direction" :target="example.target" :trigger="example.trigger"
                        :confirm="example.confirm || false" :cancel="example.cancel || false"
                        :placement="example.placement || 'outside'" :fullScreen="example.fullScreen || false"
                        :needArrow="example.needArrow || true" :modal="example.modal || false">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus numquam reprehenderit neque
                            non
                        </span>
                    </Popup>
                </template>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import Popup from '@/components/Popup/template'
import IconButton from '@/components/IconButton'
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
        code: `<Popup direction="top" target="click-btn" trigger="click"></Popup>
<Popup direction="top" target="hover-btn" trigger="hover"></Popup>`,
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
        code: `<Popup direction="top" target="click-btn-options" trigger="click" confirm=true cancel=true></Popup>`,
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
                modal: true
            }
        ],
        code: `<Popup direction="top" target="click-btn-fullScreen" trigger="click" placement="inside" fullScreen></Popup>`,
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