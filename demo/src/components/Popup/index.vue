<template>
    <div class="popup">
        <Mask click-to-close></Mask>
    </div>
</template>
<script>
import Mask from '@/components/Mask'
export default {
    name:"Popup",
    components:{
        Mask
    },
    setup(props){
        return {}
    }
}
</script>
<style lang="scss" scoped src="./index.scss"> </style>