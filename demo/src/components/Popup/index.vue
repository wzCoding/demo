<template>
    <div class="popup">
        <icon-button size="default" type="primary" @click="handleClick">popup</icon-button>
    </div>
</template>
<script>
import { onMounted } from 'vue'
import { Mask } from '@/components/Mask/mask'
import IconButton from '@/components/IconButton'
export default {
    name: "Popup",
    props: {},
    components: { IconButton },
    setup(props) {
        const handleClick = () => {
            const mask = Mask.open({
                target: ".popup",
                clickToClose: true,
                destoryOnClose: true,
                onClose:()=>{
                    console.log("close")
                }
            })
            // setTimeout(() => {
            //     mask.close()
            // },300)
        }
        
        return {
            handleClick
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>