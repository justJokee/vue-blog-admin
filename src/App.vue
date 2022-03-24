<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import api from '@/api/'
import { themeOverrides } from '@/utils/themeOverrides'
import { useStore } from '@/store/'
const $store = useStore()
onMounted(async () => {
  const { status, data } = await api.getCategory()
  if (status === 200) {
    $store.commit('setCategories', data)
  }
})
</script>

<style lang="scss">
#app {
}
</style>
