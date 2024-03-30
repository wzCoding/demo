<template>
    <div class="components-popup components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
                <e-select :name="item.name" v-model="item.value" :options="item.options"></e-select>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import ESelect from '@/components/Select/index'
import CodeDemo from '@/components/CodeDemo'
const examples = [
    {
        desc: "普通 Select",
        value: "",
        name: "normal",
        options: ['0001', '0002', '0003', '0004', '0005'],
        code: `const options = ['0001', '0002', '0003', '0004', '0005']
<e-select name=my-select value='0001' options='options'></e-select>`,
        type: "html",
    },
    {
        desc: "Select 禁用选项",
        value: "",
        name: "diaabled",
        options: [{ label: '0001', value: '0001' }, { label: '0002', value: '0002', disabled: true }, { label: '0003', value: '0003' }],
        code: `const options = [{ label: '0001', value: '0001' }, { label: '0002', value: '0002', disabled: true }, { label: '0003', value: '0003' }]
<e-select name=my-select value='0001' options='options'></e-select>`,
        type: "html",
    },
]
</script>
