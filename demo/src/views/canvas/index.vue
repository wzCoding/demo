<template>
    <div class="canvas" id="waves">{{ count }}</div>
</template>
<script>
import { ref } from 'vue';
import { Timer } from '@/utils/timer';

export default {
    name: "waves",
    setup(props){
        const timer = new Timer();
        const count = ref(0)
        timer.interval(()=>{
            count.value++
            if(count.value >= 5){
                timer.stop()
            }
        })
        return{
            count
        }
    }
}
</script>
<style lang="scss" scoped></style>