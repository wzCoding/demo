<template>
  <div class="home">
    <el-button type="primary" @click="start">开始探索</el-button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const start = () => {
    router.push("/card")
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
