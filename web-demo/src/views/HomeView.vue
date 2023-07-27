<template>
  <div class="home">
      <Box></Box>
  </div>
</template>

<script>
import Box from '../components/box/box.vue'
export default {
  name: 'HomeView',
  components:{
    Box
  }
}
</script>
<style lang="scss" scoped>
.home{
  background: #000;
}
</style>
