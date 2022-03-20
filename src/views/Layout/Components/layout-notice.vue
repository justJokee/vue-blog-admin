<template>
  <div class="layout-notice">
    <n-badge dot>
      <i class="el-icon-message-solid" />
    </n-badge>
  </div>
</template>

<script setup lang="ts">
// import echarts from '@/utils/echarts'
// echarts.init()
// import { useStore } from '@/store'
// const $store = useStore()
// const userInfo = $store.state.userInfo
</script>

<style lang="scss">
@import '@/style/index.scss';

.layout-notice {
  .el-icon-message-solid {
    font-size: 24px;
    @include themeify() {
      color: themed('color-notice');
    }
  }
}
</style>
