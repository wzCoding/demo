<template>
    <div class="select-container" :class="selectClass">
        <div class="select-input">
            <e-input v-model="selectValue" readonly :focus-element="name" :placeholder="placeholder" :class="inputClass">
                <template #suffix>
                    <div class="select-icon" :class="{ active: arrowActive }">
                        <e-svg size="16" name="arrowdown" color="#999"/>
                    </div>
                </template>
            </e-input>
        </div>
        <e-popup :name="name" :direction="direction" :target-gap="popupGap" :need-arrow="false" :self-click="false"
            :target="inputClass" :width="inputClass" @show="handleShow" @close="handleClose">
            <template #default>
                <div class="options-container">
                    <div v-for="option in selectOptions" :key="option.value" class="select-option"
                        :class="{ active: option.active, disabled: option.disabled }" @click="optionClick(option)">{{
        option.label }}</div>
                </div>
            </template>
        </e-popup>
    </div>
</template>
<script>
import { ref, computed } from 'vue'
import EPopup from '../Popup/template.vue'
import EInput from '../Input'
import ESvg from '../Svg'
export default {
    name: 'ESelect',
    props: {
        modelValue: {
            type: [String, Boolean, Number, Object, Array],
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        name: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    components: { EPopup, EInput,ESvg },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const direction = 'bottom'
        const popupGap = 8
        const inputClass = props.name ? `${props.name}-input` : ''
        const selectClass = props.name ? `${props.name}-select` : ''
        const selectValue = ref(props.modelValue)
        const arrowActive = ref(false)
        const selectOptions = computed(() => {
            if (!props.options.length) {
                return [{ label: '暂无数据', value: 'no-data', disabled: true }]
            }
            return props.options.map(item => {
                const option = typeof item === 'string' ? { label: item, value: item } : item
                option.active = option.value === selectValue.value
                option.disabled = option.disabled || false
                return option
            })

        })
        const optionClick = (option) => {
            emit('update:modelValue', option.value)
            emit('change', option.value)
            selectValue.value = option.value
            arrowActive.value = false
        }
        const handleShow = () => {
            arrowActive.value = true
        }
        const handleClose = () => {
            arrowActive.value = false
        }
        return {
            selectValue,
            selectClass,
            inputClass,
            arrowActive,
            direction,
            popupGap,
            selectOptions,
            optionClick,
            handleShow,
            handleClose
        }
    }
}

</script>
<style src="./index.scss" lang="scss" scoped></style>