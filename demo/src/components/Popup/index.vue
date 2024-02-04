<template>
    <div class="popup">
        <icon-button size="default" type="primary" @click="handleClick">popup</icon-button>
    </div>
</template>
<script>
import { Mask } from '@/components/Mask/mask'
import IconButton from '@/components/IconButton'
export default {
    name: "Popup",
    props: {},
    components: { IconButton },
    setup(props) {
        const handleClick = () => {
            Mask.open({clickToClose: true})
        }
        return {
            handleClick
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>