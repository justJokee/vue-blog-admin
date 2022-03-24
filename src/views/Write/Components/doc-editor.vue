<template>
  <div class="doc-editor">
    <div class="doc-editor__header">
      <div class="header__info">
        <i class="el-icon-edit" />
        <div>
          <div class="info-title">
            <span>{{ article.title }}</span>
          </div>
          <div class="info-update">
            <span>最后编辑于 {{ formatDate(article.updateTime) }}</span>
          </div>
        </div>
      </div>
      <div class="header__handle">
        <n-space>
          <n-button type="info" v-if="!article.publish" @click="submit(0)">保存</n-button>
          <n-button type="info" @click="submit(1)">{{ handleText }}</n-button>
        </n-space>

        <n-popover trigger="click" placement="bottom">
          <template #trigger>
            <div class="header__handle-trigger">
              <i class="el-icon-more" />
            </div>
          </template>
          <div class="header__popover">
            <ul>
              <li :title="article.title">
                <span>标题：</span>
                <span>{{ article.title }}</span>
              </li>
              <li :title="article.abstract">
                <span>概要：</span>
                <span>{{ article.abstract }}</span>
              </li>
              <li>
                <span>分类：</span>
                <span>{{ category }}</span>
              </li>
              <li>
                <span>版权：</span>
                <span>{{ article.original ? '原创' : '转载' }}</span>
              </li>
              <li>
                <span>标签：</span>
                <span>{{ article.tag?.join('，') }}</span>
              </li>
              <hr />
              <li class="header__popover-time">
                <span>创建时间：</span>
                <span>{{ formatDate(article.createTime) }}</span>
              </li>
              <li class="header__popover-time">
                <span>最新编辑：</span>
                <span>{{ formatDate(article.updateTime) }}</span>
              </li>
              <li style="text-align: right">
                <n-button @click="showModal">编辑</n-button>
              </li>
            </ul>
          </div>
        </n-popover>
        <doc-info
          :edit="1"
          :show="show"
          :init-data="article"
          @update:show="updateShow"
          @update:editInfo="updateArticleInfo"
        />
      </div>
    </div>

    <div class="doc-editor__content">
      <div class="doc-editor__body">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/'
import { DropdownOption } from 'naive-ui'
import { articleSchema, flatTree } from '@/types/'
import { formatDate } from '@/utils/formatDate'
import TreeFolder from '@/views/Components/tree-folder.vue'
import generateHTree from '@/utils/generateHTree'
import docInfo from './doc-info.vue'
import api from '@/api'

const $route = useRoute()
const $store = useStore()
const show = ref(false)
const initValue = ref('')
const content = ref('')
const catalogs = ref<flatTree[]>([])
const options = ref<DropdownOption[]>()
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
const handleText = computed(() => {
  if (article.value.publish) return '更新'
  return '发布'
})
onMounted(() => {
  getArticle()
})
watch($route, () => {
  getArticle()
})

const category = computed(() => {
  let category = ''
  $store.state.categories.some((item) => {
    if (item._id === article.value.categoryId) {
      category = item.name
    }
  })
  return category
})
async function submit(publish?: number) {
  console.log(publish)
  // const { status, data } = api
}
async function getArticle() {
  const { status, data } = await api.getArticle({
    articleId: parseInt($route.params.articleId as string),
    publish: parseInt($route.params.publish as string)
  })
  if (status === 200) {
    article.value = data
    initValue.value = data.content
    generateOptions()
  }
}
function generateOptions() {
  options.value = [
    {
      key: 'true',
      label: `标题：${article.value.title}`
    }
  ]
}
function handleChange(html: string) {
  const folder = generateHTree(html)
  catalogs.value = folder
}
function showModal() {
  show.value = true
}
function updateShow(val: boolean) {
  show.value = val
}
function updateArticleInfo(info: Partial<articleSchema['res']>) {
  article.value = Object.assign(article.value, info)
}
</script>
<style lang="scss">
@import '@/style/index.scss';

.doc-editor {
  &__content {
    display: flex;
    align-items: flex-start;
    margin-top: 18px;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px 16px 0;
    border-bottom: 1px solid #f5f5f5;
    .header__info {
      display: flex;
      align-items: center;
      .el-icon-edit {
        font-size: 18px;
        margin-right: 12px;
      }
      .info-title {
        padding: 4px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .info-update {
        font-size: 12px;
        @include themeify() {
          color: themed('color-text-comment');
        }
      }
    }
    .header__handle {
      display: flex;
      align-items: center;
      &-trigger {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        padding: 4px;
        border: 1px solid #ccc;
        margin-left: 18px;
      }
    }
  }

  &__body {
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
.header__popover {
  width: 300px;
  padding: 10px;
  li {
    padding: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &-time {
    font-size: 12px;
    @include themeify() {
      color: themed('color-text-comment');
    }
  }
  hr {
    border: none;
    height: 1px;
    background: #f5f5f5;
  }
}
</style>
