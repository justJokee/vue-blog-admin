<template>
  <div class="mp-articles">
    <div class="mp-articles__header">
      <div class="header-filter">
        <mp-articles-filter v-model="filters" />
      </div>
      <div class="header-batchdel">
        <n-space>
          <n-button type="info" @click="filterArticles(true)">筛选</n-button>
          <n-button type="error" :disabled="!dels?.length" @click="preDeleteArticle(dels, true)">批量删除</n-button>
        </n-space>
      </div>
    </div>
    <div class="mp-articles__body">
      <n-data-table
        remote
        :columns="columns"
        :data="articles"
        :pagination="pagination"
        :row-key="(row) => row._id"
        @update:checked-row-keys="handleCheck"
      />
    </div>
    <doc-info
      :edit="1"
      :show="show"
      :init-data="article"
      @update:show="updateShow"
      @update:edit-info="updateArticleInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { useDialog, NSpace, NButton, useMessage, NBadge, DataTableColumns } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/'
import { articleSchema } from '@/types/'
import { formatDate } from '@/utils/formatDate'
import docInfo from '@/views/Write/Components/doc-info.vue'
import mpArticlesFilter from './Components/mp-articles-filter.vue'
import api from '@/api/'
const $store = useStore()
const $router = useRouter()
const $dialog = useDialog()
const $message = useMessage()
const publish = ref()
const show = ref(false)
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  itemCount: 0,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page

    getArticles()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getArticles()
  }
  // prefix({ itemCount }) {
  //   return `Total is ${itemCount}.`
  // }
})
const dels = ref<string[]>()
const articles = ref<Partial<articleSchema['res']>[]>()
const article = ref<Partial<articleSchema['res']>>()
const filters = ref({
  keyword: undefined,
  publish: undefined,
  categoryId: undefined,
  original: undefined,
  editing: undefined
})

const columns: DataTableColumns = [
  {
    type: 'selection'
  },
  {
    title: '标题',
    key: 'title',
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '分类',
    key: 'age',
    render(row) {
      const item = $store.state.categories.find((item) => item._id === row.categoryId)
      return h('span', null, item?.name)
    }
  },
  // {
  //   title: '标签',
  //   key: 'tag',
  //   ellipsis: {
  //     tooltip: true
  //   },
  //   render(row) {
  //     const tags: any = row.tag
  //     const nodes = tags.map((label: string) => {
  //       return h(
  //         NTag,
  //         {
  //           style: {
  //             marginLeft: '4px'
  //           },
  //           type: 'info'
  //         },
  //         {
  //           default: () => label
  //         }
  //       )
  //     })
  //     return nodes
  //   }
  // },
  {
    title: '版权',
    key: 'original',
    render(row) {
      const text = row.original ? '原创' : '转载'
      return h('span', null, text)
    }
  },
  {
    title: '发布状态',
    key: 'original',
    render(row) {
      const text = row.publish ? '已发布' : '未发布'
      const color = row.publish ? '#67c23a' : '#E6A23C'
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(NBadge, {
            dot: true,
            color,
            style: {
              marginRight: '6px'
            }
          }),
          text
        ]
      )
    }
  },
  {
    title: '编辑状态',
    key: 'editing',
    render(row) {
      const text = row.editing ? '编辑中' : '无新编辑'
      const color = row.editing ? '#E6A23C' : '#67c23a'

      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(NBadge, {
            dot: true,
            color,
            style: {
              marginRight: '6px'
            }
          }),
          text
        ]
      )
    }
  },
  {
    title: '评论',
    key: 'commentNum',
    // width: 60,
    render(row) {
      return h(
        NButton,
        {
          text: true,
          size: 'tiny',
          type: 'info',
          onClick() {
            $router.push({
              name: 'comments',
              params: {
                articleId: row.articleId as number
              }
            })
          }
        },
        {
          default: () => row.commentNum
        }
      )
    }
  },
  {
    title: '浏览量',
    key: 'pv'
  },
  {
    title: '创建时间',
    key: 'editing',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      const text = formatDate(row.createTime)
      return h('span', null, text)
    }
  },
  {
    title: '最后编辑',
    key: 'editing',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      const text = formatDate(row.updateTime)
      return h('span', null, text)
    }
  },
  {
    title: '操作',
    key: 'handle',
    width: 170,
    render(row) {
      return h(NSpace, null, {
        default: () => {
          return [
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'info',
                onClick() {
                  $router.push({
                    name: 'doc',
                    params: {
                      articleId: row.articleId as number
                    }
                  })
                }
              },
              {
                default: () => '编辑'
              }
            ),
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'info',
                onClick() {
                  article.value = row
                  show.value = true
                }
              },
              {
                default: () => '基本信息'
              }
            ),
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'error',
                onClick() {
                  preDeleteArticle(row)
                }
              },
              {
                default: () => '删除'
              }
            )
          ]
        }
      })
    }
  }
]
getArticles()
function getArticles() {
  // 判断是否存在筛选条件
  const filter = Object.keys(filters.value).some((key) => {
    const cur = filters.value[key as keyof typeof filters.value]
    return cur !== undefined && cur !== null && cur !== ''
  })

  if (filter) filterArticles()
  else fetchArticles()
}
// 直接获取文档列表
async function fetchArticles() {
  const { status, data, total } = await api.getArticles({
    publish: publish.value,
    page: pagination.page,
    content: 0,
    limit: pagination.pageSize
  })
  if (status === 200) {
    articles.value = data
    pagination.itemCount = total as number
  }
}
// 筛选文档
async function filterArticles(btnTrigger?: boolean) {
  if (btnTrigger) pagination.page = 1
  const params: any = {}
  for (let key in filters.value) {
    const k = key as keyof typeof filters.value
    if (filters.value[k] !== undefined && filters.value[k] !== null && filters.value[k] !== '') {
      params[k] = filters.value[k]
    }
  }
  const { status, data, total } = await api.searchArticle({
    ...params,
    page: pagination.page,
    limit: pagination.pageSize
  })
  if (status === 200) {
    articles.value = data
    pagination.itemCount = total as number
  }
}
function handleCheck(val: any) {
  dels.value = val
}
function updateShow(val: boolean) {
  show.value = val
}
function updateArticleInfo(info: Partial<articleSchema['res']>) {
  article.value = Object.assign(article.value, info)
}

async function deleteArticle(dels: any) {
  const { status } = await api.delArticle({
    id: dels
  })
  if (status === 200) {
    $message.success('删除成功')
    getArticles()
  }
}
function preDeleteArticle(dels: any, batch: boolean = false) {
  $dialog.warning({
    title: '警告',
    content: '您确定删除么？',
    positiveText: '确定',
    negativeText: '再想想',
    onPositiveClick() {
      const id = batch ? dels : dels._id
      deleteArticle(id)
    }
  })
}
</script>

<style lang="scss">
.mp-articles {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .header-filter {
      width: 80%;
      flex: 0 1 auto;
    }
    .header-batchdel {
      flex: 0 1 auto;
    }
  }
}
</style>
