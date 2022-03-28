<template>
  <div class="mp-messages-filter">
    <n-form inline :label-width="90" :model="conditions" label-placement="left">
      <n-form-item label="昵称 / 内容：">
        <n-input v-model:value="conditions.keyword" placeholder="请输入标题或正文内容" />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { msgBoardSchema } from '@/types/'
interface propsType {
  modelValue: Partial<msgBoardSchema['req']>
}
interface emitesType {
  (e: 'update:modelValue', value: Partial<msgBoardSchema['req']>): void
}
defineProps<propsType>()
const emits = defineEmits<emitesType>()
const conditions = ref({
  keyword: undefined
})
watch(conditions.value, () => {
  emits('update:modelValue', conditions.value)
})
</script>

<style lang="scss">
.mp-messages-filter {
  .n-form {
    .n-form-item {
      margin-right: 12px;
    }
  }
}
</style>
