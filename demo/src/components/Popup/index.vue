<template>
    <div class="popup">
        <icon-button size="default" type="primary" @click="handleClick">popup</icon-button>
    </div>
</template>
<script>
import { h, onMounted } from 'vue'
import { Mask } from '@/components/Mask/mask'
import { Loading } from '../Loading'
import IconButton from '@/components/IconButton'
export default {
    name: "Popup",
    props: {},
    components: { IconButton },
    setup(props) {
        const handleClick = () => {
            const mask = Mask.open({
                target: ".popup"
            })
            console.log(mask)
            console.log(h(mask.vm.vnode))
        }
        onMounted(() => {
            const loading = Loading.service({
                target: ".popup",
                text: "123......",
                show: true
            })
            console.log(loading)
            setTimeout(() =>{
                loading.close()
            },2000)
        })
        
        return {
            handleClick
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>