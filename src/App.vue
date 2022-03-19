<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup lang="ts">
import { themeOverrides } from '@/utils/themeOverrides'
</script>

<style lang="scss">
#app {
}
</style>
