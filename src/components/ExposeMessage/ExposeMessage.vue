<template>
  <div />
</template>
<script setup lang="ts">
import { useMessage } from 'naive-ui'
const $message = useMessage()
// 挂载至全局
window.$message = $message
</script>
