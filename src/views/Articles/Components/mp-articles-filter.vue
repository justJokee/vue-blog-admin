<template>
  <div class="mp-articles-filter">
    <n-form inline :label-width="60" :model="conditions">
      <n-form-item label="标题/内容：">
        <n-input v-model:value="conditions.keyword" placeholder="请输入标题或正文内容" />
      </n-form-item>

      <n-form-item label="是否发布：">
        <n-select v-model:value="conditions.publish" :options="publishOptions" clearable />
      </n-form-item>
      <n-form-item label="分类：" path="original">
        <n-select v-model:value="conditions.categoryId" :options="categoryOptions" />
      </n-form-item>
      <n-form-item label="是否原创：" path="original">
        <n-select v-model:value="conditions.original" :options="originalOptions" />
      </n-form-item>
      <n-form-item label="是否编辑中：" path="original">
        <n-select v-model:value="conditions.editing" :options="editingOptions" />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { SelectOption } from 'naive-ui'
import { articleSchema } from '@/types/'
import { useStore } from '@/store/'
const $store = useStore()
const conditions = ref<Partial<articleSchema['req']>>({
  keyword: undefined,
  publish: undefined,
  categoryId: undefined,
  original: undefined,
  editing: undefined
})
const publishOptions = [
  { label: '发布', value: 1 },
  { label: '未发布', value: 0 }
]
const categoryOptions = $store.state.categories.map((item) => {
  return {
    label: item.name,
    value: item._id
  }
})
const originalOptions = [
  { label: '原创', value: 1 },
  { label: '转载', value: 0 }
]
const editingOptions = [
  { label: '编辑中', value: 1 },
  { label: '未编辑', value: 0 }
]
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
