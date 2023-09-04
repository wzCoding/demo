<template>
    <div class="card">
        <input v-model="val" type=text id="myInput" @input="callback">
    </div>
</template>
<script>
import { throttle, debounce } from '@/utils'
import { ref } from 'vue';
export default {
    name: "card",
    setup() {
        const val = ref("")
        const callback = debounce(()=>{
            alert("throttle: " + val.value)
        },3000)
        return {
            val,
            callback
        }
    }
}
</script>
<style lang="scss" scoped>
.card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input[type=text] {
        padding: .5rem 1rem;
        outline: none;
        border: 1px solid #000;
        border-radius: 3px;
    }

    input[type=text]:focus {
        border-color: #409eff;
        box-shadow: 0 0 3px #69c0ff;
    }
}
</style>