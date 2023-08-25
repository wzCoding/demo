<template>
  <PageHeader themeControl></PageHeader>
  <pageContainer >
      <RouterView />
  </pageContainer>
  <PageFooter></PageFooter>
</template>
<script setup>
import PageHeader from '@/layout/page-header/index.vue'
import pageContainer from '@/layout/page-container/index.vue';
import PageFooter from '@/layout/page-footer/index.vue'
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
