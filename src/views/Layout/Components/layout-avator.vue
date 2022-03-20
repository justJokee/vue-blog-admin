<template>
  <div class="layout-user">
    <div class="layout-user__content">
      <n-avatar round size="large" :src="userInfo.avator" />
      <span class="content-cheer">下午好，Marco !</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
const $store = useStore()
const userInfo = $store.state.userInfo
</script>

<style lang="scss">
.layout-user {
  &__content {
    display: flex;
    align-items: center;
    .content-cheer {
      margin-left: 12px;
    }
  }
}
</style>
