<template>
  <div class="mp-news-filter">
    <n-form inline :label-width="80" :model="conditions" label-placement="left">
      <n-form-item label="是否已读：" path="original">
        <n-select v-model:value="conditions.read" :options="readOptions" clearable />
      </n-form-item>
      <n-form-item label="消息类型：">
        <n-select v-model:value="conditions.type" :options="typeOptions" clearable />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { newsSchema } from '@/types/'
interface propsType {
  modelValue: Partial<newsSchema['req']>
}
interface emitesType {
  (e: 'update:modelValue', value: Partial<newsSchema['req']>): void
}
defineProps<propsType>()
const emits = defineEmits<emitesType>()
const conditions = ref({
  type: undefined,
  read: 0
})
watch(conditions.value, () => {
  emits('update:modelValue', conditions.value)
})
const typeOptions = [
  { label: 'pv', value: 'pv' },
  { label: '留言', value: 'msgboard' },
  { label: '评论', value: 'comment' }
]
const readOptions = [
  { label: '未读', value: 0 },
  { label: '已读', value: 1 }
]
</script>

<style lang="scss">
.mp-news-filter {
  .n-form {
    .n-form-item {
      width: 240px;
      margin-right: 12px;
    }
  }
}
</style>
