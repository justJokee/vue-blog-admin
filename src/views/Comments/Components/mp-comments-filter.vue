<template>
  <div class="mp-comments-filter">
    <n-form inline :label-width="90" :model="conditions" label-placement="left">
      <n-form-item label="昵称 / 内容：">
        <n-input v-model:value="conditions.keyword" placeholder="请输入标题或正文内容" />
      </n-form-item>
      <n-form-item label="设备id：">
        <n-input v-model:value="conditions.articleId" placeholder="请输入标题或正文内容" />
      </n-form-item>
      <!-- <n-form-item label="数据结构："> -->
      <!-- <n-select v-model:value="conditions.structure" :options="structureOptions" clearable /> -->
      <!-- </n-form-item> -->
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { articleSchema } from '@/types/'
interface propsType {
  modelValue: Partial<articleSchema['req']>
}
interface emitesType {
  (e: 'update:modelValue', value: Partial<articleSchema['req']>): void
}
defineProps<propsType>()
const emits = defineEmits<emitesType>()
const conditions = ref({
  keyword: undefined,
  articleId: undefined
  // structure: 1
})
watch(conditions.value, () => {
  emits('update:modelValue', conditions.value)
})

// const structureOptions = [
//   { label: '树状结构', value: 1 },
//   { label: '一维列表', value: 0 }
// ]
</script>

<style lang="scss">
.mp-articles-filter {
  .n-form {
    .n-form-item {
      width: 200px;
      margin-right: 12px;
    }
  }
}
</style>
