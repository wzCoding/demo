<template>
    <div class="popup">
        <Mask click-to-close></Mask>
    </div>
</template>
<script>
import Mask from '@/components/Mask'
export default {
    name:"Popup",
    props:{},
    components:{
        Mask
    },
    setup(props){
        console.log(Mask)
        return {}
    }
}
</script>
<style lang="scss" scoped src="./index.scss"> </style>