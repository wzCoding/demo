<template>
    <div class="popup">
        
    </div>
</template>
<script>
import { onMounted } from 'vue'
import IconButton from '@/components/IconButton'
export default {
    name: "Popup",
    props: {
        show:{
            type:Boolean,
            default:false
        },
        direction:{
            type:String,
            default:'bottom'
        },
        
    },
    components: {
        IconButton
    },
    setup(props) {
       
        
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>