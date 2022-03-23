<template>
  <div class="doc-editor">
    <div class="doc-editor__content">
      <comp-editor v-model="content" :init-value="initValue" @change="handleChange" />
    </div>
    <div class="doc-editor__catalog">
      <div class="catlog__title">
        <i class="el-icon-guide" />
        大纲
      </div>
      <div class="catlog__content">
        <tree-folder :catalogs="catalogs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { articleSchema, flatTree } from '@/types/'
import TreeFolder from '@/views/Components/tree-folder.vue'
import generateHTree from '@/utils/generateHTree'
import api from '@/api'

const $route = useRoute()
const initValue = ref('')
const content = ref('')
const catalogs = ref<flatTree[]>([])
const article = ref<Partial<articleSchema['res']>>({
  original: 1,
  title: '',
  abstract: '',
  headerPic: '',
  publish: 1,
  tag: [],
  categoryId: '',
  content: ''
})

onMounted(async () => {
  const { status, data } = await api.getArticle({
    articleId: parseInt($route.params.articleId as string),
    publish: 0
  })
  if (status === 200) {
    article.value = data
    initValue.value = data.content
  }
})

function handleChange(html: string) {
  const folder = generateHTree(html)
  catalogs.value = folder
  console.log('计算树结构----->>>>', folder)
}
</script>
<style lang="scss">
.doc-editor {
  display: flex;
  align-items: flex-start;
  &__content {
    flex: 1 1 auto;
  }
  &__catalog {
    width: 240px;
    flex: 1 1 auto;
    padding: 12px;
    margin-left: 24px;
    border-left: 1px solid #e8e8e8;
  }
}
</style>
