<template>
  <div class="layout-notice" @click="go">
    <n-badge :max="100" :value="$store.state.unreadNewsTotal">
      <i class="el-icon-message-solid" />
    </n-badge>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/'
import { useRouter } from 'vue-router'
const $store = useStore()
const $router = useRouter()

$store.dispatch('getUnreadNewsTotal')
function go() {
  $router.push({ name: 'news' })
}
</script>

<style lang="scss">
@import '@/style/index.scss';

.layout-notice {
  cursor: pointer;
  .el-icon-message-solid {
    font-size: 24px;
    @include themeify() {
      color: themed('color-notice');
    }
  }
}
</style>
