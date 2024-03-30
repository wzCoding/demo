<template>
    <div class="ease-input input-container" ref="inputContainer"
        :class="[sizeClass, { focus, clearable, disabled, readonly, showWordLimit }]" tabindex="1" @click="handleClick">
        <div v-if="prefixIcon || slots.prefix" class="prefix-icon">
            <slot name="prefix">
                <e-svg v-if="prefixIcon" :name="prefixIcon" color="#d0d2d8"></e-svg>
            </slot>
        </div>

        <input type="text" :value="inputValue" ref="input" :placeholder="placeholder" @input="handleInput"
            @change="handleChange" @compositionstart="handleCompositionStart" @compositionend="handleCompositionEnd"
            :disabled="disabled" :readonly="readonly" :maxlength="maxlength" />
        <div v-if="suffixIcon || slots.suffix" class="suffix-icon">
            <slot name="suffix">
                <e-svg v-if="suffixIcon" :name="suffixIcon" color="#d0d2d8"></e-svg>
            </slot>
        </div>
        <div v-if="showClear" class="clear" @click="handleClear"></div>
        <div v-if="showLimit" class="word-limit">{{ inputValue.length || 0 }}/{{ maxlength }}</div>
    </div>
</template>
<script>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { debounce, getElement } from '@/utils/index'
import clickOutSide from '@/utils/clickOutSide'
import ESvg from '@/components/Svg'
export default {
    name: 'EaseInput',
    props: {
        modelValue: {
            type: [String, Number, Object],
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
            type: [Number, String],
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
        suffixIcon: {
            type: String,
            default: ''
        },
        prefixIcon: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'default'
        },
        focusColor: {
            type: String,
            default: '#409eff'
        },
        focusElement: {
            type: String,
            default: ''
        }
    },
    components: { ESvg },
    emits: ['update:modelValue', 'focus', 'blur', 'input', 'change', 'clear'],
    setup(props, { emit, slots }) {
        const sizeClass = `size-${props.size}`
        const focus = ref(false)
        const input = ref(null)
        const inputValue = ref(props.modelValue)
        const inputContainer = ref(null)
        const isComposition = ref(false)
        const showClear = computed(() => {
            return props.clearable && inputValue.value && !props.readonly && !props.disabled && focus.value
        })
        const showLimit = computed(() => {
            return props.showWordLimit && props.maxlength
        })
        const cleanWatch = watch(() => props.modelValue, (val) => {
            inputValue.value = val
            emit('update:modelValue', val)
        })
        const handleClick = () => {
            input.value.focus()
            focus.value = true
            emit('focus', input.value.value)
        }
        const handleInput = debounce(() => {
            if (isComposition.value) return
            inputValue.value = input.value.value
            emit('input', input.value.value)
            emit('update:modelValue', input.value.value)
        }, 300)
        const handleChange = (e) => {
            emit('change', e.target.value)
        }
        const handleClear = (e) => {
            input.value.value = ''
            inputValue.value = ''
            emit('clear', e.target.value)
        }

        const handleCompositionStart = () => {
            isComposition.value = true
        }
        const handleCompositionEnd = () => {
            isComposition.value = false
            handleInput()
        }
        let cleanClickOutSide = null
        onMounted(() => {
            const focusElement = getElement(props.focusElement)
            const elements = [inputContainer.value, focusElement]
            cleanClickOutSide = clickOutSide(elements, () => {
                focus.value = false
                emit('blur', input.value.value)
            })
        })
        onUnmounted(() => {
            cleanClickOutSide && cleanClickOutSide()
            cleanWatch()
        })
        return {
            slots,
            input,
            inputValue,
            inputContainer,
            focus,
            sizeClass,
            showClear,
            showLimit,
            handleCompositionStart,
            handleCompositionEnd,
            handleClick,
            handleInput,
            handleChange,
            handleClear
        }
    }
}
</script>
<style src="./index.scss" lang="scss" scoped></style>
