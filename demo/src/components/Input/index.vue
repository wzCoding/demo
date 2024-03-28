<template>
    <div class="ease-input input-container" :class="[sizeClass, { focus }]" tabindex="0" @click="handleClick"
        @foucs="handleFocus">
        <input type="text" ref="input" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur">
        <slot></slot>
    </div>
</template>
<script>
import { ref } from 'vue'

export default {
    name: 'EaseInput',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 140
        },
        clearable: {
            type: Boolean,
            default: true
        },
        showWordLimit: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        focusColor: {
            type: String,
            default: '#409eff'
        },
    },
    emits: ['focus', 'blur', 'input', 'change'],
    setup(props, { emit }) {
        const sizeClass = `size-${props.size}`
        const focus = ref(false)
        const input = ref(null)
        const handleClick = () => {
            focus.value = true
            input.value.focus()
        }
        const handleFocus = () => {
            focus.value = true
        }
        const handleBlur = () => {
            focus.value = false
        }
        const handleInput = (e) => {

        }
        const handleChange = (e) => {
        }
        const handleClear = () => {
        }
        return {
            input,
            focus,
            sizeClass,
            handleClick,
            handleFocus,
            handleBlur,
            handleInput,
            handleChange,
            handleClear
        }
    }
}
</script>
<style src="./index.scss" lang="scss" scoped></style>
