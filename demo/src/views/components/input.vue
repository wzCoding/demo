<template>
    <div class="components-input components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
               <e-input></e-input>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import EInput from '@/components/Input/index'
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
]
</script>
