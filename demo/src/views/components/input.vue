<template>
    <div class="components-input components-page">
        <div class="item" v-for="item in examples" :key="item.desc">
            <div class="display-area">
                <e-input v-if="!item.size && !item.state" v-model="item.value" :clearable="item.options.clearable"
                    :placeholder="item.options.placeholder" :maxlength="item.options.maxlength"
                    :show-word-limit="item.options.showWordLimit" :suffix-icon="item.options.suffixIcon"
                    :prefix-icon="item.options.prefixIcon" :disabled="item.options.disabled"
                    :readonly="item.options.readonly" size="default" @input="handleInput">
                </e-input>
                <template v-else-if="item.size">
                    <e-input v-for="size in item.size" :key="size" v-model="item.value"
                        :clearable="item.options.clearable" :placeholder="item.options.placeholder"
                        :maxlength="item.options.maxlength" :show-word-limit="item.options.showWordLimit"
                        :suffix-icon="item.options.suffixIcon" :prefix-icon="item.options.prefixIcon"
                        :disabled="item.options.disabled" :readonly="item.options.readonly" :size="size"
                        @input="handleInput">
                    </e-input>
                </template>
                <template v-else-if="item.state">
                    <e-input v-for="state in item.state" :key="state.id" v-model="item.value"
                        :clearable="item.options.clearable" :placeholder="item.options.placeholder"
                        :maxlength="item.options.maxlength" :show-word-limit="item.options.showWordLimit"
                        :suffix-icon="item.options.suffixIcon" :prefix-icon="item.options.prefixIcon"
                        :disabled="state.disabled" :readonly="state.readonly" size="default" @input="handleInput">
                    </e-input>
                </template>
            </div>
            <code-demo :desc="item.desc" :type="item.type" :code="item.code" />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import EInput from '@/components/Input/index'
import CodeDemo from '@/components/CodeDemo'
const examples = [
    {
        desc: "普通 Input",
        value: ref('123'),
        options: {
            placeholder: '请输入内容',
            clearable: false,
            maxlength: 140,
            showWordLimit: false,
            suffixIcon: '',
            prefixIcon: '',
            disabled: false,
            readonly: false,
            size: 'default',
        },
        code: `<e-input v-model="ref('123')"></e-input>`,
        type: "html",
    },
    {
        desc: "Input 清除按钮",
        value: ref('123456'),
        options: {
            placeholder: '请输入内容',
            clearable: true,
            maxlength: 140,
            showWordLimit: false,
            suffixIcon: '',
            prefixIcon: '',
            disabled: false,
            readonly: false,
            size: 'default',
        },
        code: `<e-input v-model="ref('123456')" clearable></e-input>`,
        type: "html",
    },
    {
        desc: "Input 长度限制",
        value: ref('1234567890'),
        options: {
            placeholder: '请输入内容',
            clearable: false,
            maxlength: 10,
            showWordLimit: true,
            suffixIcon: '',
            prefixIcon: '',
            disabled: false,
            readonly: false,
            size: 'default',
        },
        code: `<e-input v-model="ref('123456')" clearable maxlength='10' show-word-limit></e-input>`,
        type: "html",
    },
    {
        desc: "Input 尺寸",
        value: ref('123456'),
        options: {
            placeholder: '请输入内容',
            clearable: false,
            maxlength: 140,
            showWordLimit: false,
            suffixIcon: '',
            prefixIcon: '',
            disabled: false,
            readonly: false,
            size: 'default',
        },
        size: ['small', 'default', 'large'],
        code: `<e-input v-model="ref('123456')" size=small></e-input>
<e-input v-model="ref('123456')" size=default></e-input>
<e-input v-model="ref('123456')" size=large></e-input>`,
        type: "html",
    },
    {
        desc: "Input 只读和禁用",
        value: ref('123456'),
        options: {
            placeholder: '请输入内容',
            clearable: false,
            maxlength: 140,
            showWordLimit: false,
            suffixIcon: '',
            prefixIcon: '',
            size: 'default',
        },
        state: [{ readonly: true, disabled: false, id: 0 }, { readonly: false, disabled: true, id: 1 }],
        code: `<e-input v-model="ref('123456')" readonly></e-input>
<e-input v-model="ref('123456')" disabled></e-input>`,
        type: "html",
    },
    {
        desc: "Input 图标",
        value: ref('123456'),
        options: {
            placeholder: '请输入内容',
            clearable: false,
            maxlength: 140,
            showWordLimit: false,
            suffixIcon: 'components',
            prefixIcon: 'css',
            readonly: false,
            disabled: false,
            size: 'default',
        },
        code: `<e-input v-model="ref('123456')" suffix='components'></e-input>
        <e-input v-model="ref('123456')" prefix='css'></e-input>`,
        type: "html",
    },
]
const handleInput = (val) => {
    console.log(val)
}
</script>
<style lang="scss" scoped>
.item:nth-child(4),
.item:nth-child(5) {
    .display-area {
        gap: 1rem;
    }
}
</style>
