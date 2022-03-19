<template>
  <div class="layout-user">
    <n-avatar round size="large" :src="userInfo.avator" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
const $store = useStore()
const userInfo = $store.state.userInfo
</script>

<style lang="scss"></style>
