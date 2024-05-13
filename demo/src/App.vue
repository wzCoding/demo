<template>
  <Transition name="rotate-in">
    <PageHeader v-show="isHome" themeControl></PageHeader>
  </Transition>
  <Transition name="rotate-in">
    <component :is="isHome ? Home : PageContainer" />
  </Transition>
  <PageFooter></PageFooter>
</template>
<script setup>
import PageHeader from '@/layout/page-header/index.vue'
import PageContainer from '@/layout/page-container/index.vue'
import PageFooter from '@/layout/page-footer/index.vue'
import Home from '@/views/home/home.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const isHome = computed(() => {
  return route.path == "/"
})
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

body {
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: "FangYuan";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  perspective: 1000px;
  background-color: var(--theme-page-background);
}
</style>
