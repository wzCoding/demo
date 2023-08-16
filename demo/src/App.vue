<template>
  <PageHeader themeControl></PageHeader>
  <RouterView />
</template>
<script setup>
import PageHeader from '@/layout/page-header/index.vue'
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

*,
::before,
::after {
    box-sizing: border-box;
}

body{
    overflow: hidden;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: "FangYuan";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
