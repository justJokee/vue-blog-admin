<template>
  <div class="mp-news">
    <div class="mp-news__header">
      <div class="header-filter">
        <mp-articles-filter v-model="filters" />
      </div>
      <div class="header-handle">
        <n-space>
          <n-button type="info" @click="getNews">筛选</n-button>
          <n-button type="warning" :disabled="!dels?.length" @click="preReadNews(dels, true)">已读选中</n-button>
          <n-button type="warning" @click="setAllNewsRead">全部已读</n-button>
          <n-button type="error" :disabled="!dels?.length" @click="preDeleteNews(dels, true)">批量删除</n-button>
        </n-space>
      </div>
    </div>
    <div class="mp-messages__body">
      <n-data-table
        remote
        :columns="columns"
        :data="news"
        :pagination="pagination"
        :row-key="(row) => row._id"
        :checked-row-keys="dels"
        @update:checked-row-keys="handleCheck"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { useStore } from '@/store/'
import { useDialog, NSpace, NButton, useMessage, DataTableColumns } from 'naive-ui'
import { newsSchema } from '@/types/'
import { formatDate } from '@/utils/formatDate'
import mpArticlesFilter from './Components/mp-news-filter.vue'
import api from '@/api/'
const $store = useStore()
const $dialog = useDialog()
const $message = useMessage()
const total = ref(0)
const pagination = reactive({
  page: 1,
  defaultPageSize: 10,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page
    getNews()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getNews()
  },
  prefix() {
    return `总条数：${total.value}`
  }
})
const typeMap: Record<string, any> = {
  pv: 'pv',
  comment: '文章评论',
  msgboard: '留言'
}
const dels = ref<string[]>()
const news = ref<Partial<newsSchema['res']>[]>()
const filters = ref({
  type: undefined,
  read: 0
})
const columns: DataTableColumns = [
  {
    type: 'selection'
  },
  {
    title: '类型',
    key: 'name',
    width: 200,
    render(row) {
      const text: any = typeMap[row.type as string]
      return h('span', null, text)
    },
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '昵称',
    key: 'name',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      const text: any = row.name ? row.name : '-'
      return h('span', null, text)
    }
  },
  {
    title: '评论/留言内容',
    key: 'content',
    ellipsis: {
      tooltip: true
    },
    render(row) {
      const text: any = row.content ? row.content : '-'
      return h('span', null, text)
    }
  },
  {
    title: '省',
    key: 'province',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '市',
    key: 'city',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '区',
    key: 'district',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '是否已读',
    key: 'read',
    align: 'center',
    render(row) {
      const text = row.read ? '已读' : '未读'
      return h('span', null, text)
    }
  },
  {
    title: '创建时间',
    key: 'date',
    width: 150,

    ellipsis: {
      tooltip: true
    },
    render(row) {
      const text = formatDate(row.date)
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
                  preReadNews(row)
                }
              },
              {
                default: () => '已读'
              }
            ),
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'error',
                onClick() {
                  preDeleteNews(row)
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
// 初始化列表
getNews()

// 直接获取消息列表
async function getNews() {
  const params: any = {}
  for (let key in filters.value) {
    const k = key as keyof typeof filters.value
    if (filters.value[k] !== undefined && filters.value[k] !== null) {
      params[k] = filters.value[k]
    }
  }

  const {
    data,
    status,
    total: _total
  } = await api.getNews({
    page: pagination.page,
    limit: pagination.pageSize,
    ...params
  })
  if (status === 200) {
    news.value = data
    pagination.itemCount = _total as number
    total.value = _total as number
  }
}
// 已读消息
async function readNews(delId: any) {
  const { status } = await api.readNews({
    id: delId
  })
  if (status === 200) {
    dels.value = []
    $message.success('设置已读消息成功')
    getNews()
    $store.dispatch('getUnreadNewsTotal')
  }
}
// 全部设置为已读消息
function setAllNewsRead() {
  $dialog.warning({
    title: '警告',
    content: '您确定设置为已读么？',
    positiveText: '确定',
    negativeText: '再想想',
    async onPositiveClick() {
      const { status } = await api.setAllNewsRead()
      if (status === 200) {
        $message.success('已成功将所有消息已读')
        getNews()
        $store.dispatch('getUnreadNewsTotal')
      }
    }
  })
}
async function delNews(delId: any) {
  const { status } = await api.delMessages({
    id: delId
  })
  if (status === 200) {
    dels.value = []
    $message.success('删除消息成功')
    getNews()
  }
}
function preReadNews(dels: any, batch: boolean = false) {
  $dialog.warning({
    title: '警告',
    content: '您确定设置为已读么？',
    positiveText: '确定',
    negativeText: '再想想',
    onPositiveClick() {
      const id = batch ? dels : dels._id
      readNews(id)
    }
  })
}
function preDeleteNews(dels: any, batch: boolean = false) {
  $dialog.warning({
    title: '警告',
    content: '您确定删除么？',
    positiveText: '确定',
    negativeText: '再想想',
    onPositiveClick() {
      const id = batch ? dels : dels._id
      delNews(id)
    }
  })
}
function handleCheck(val: any) {
  dels.value = val
}
</script>

<style lang="scss">
.mp-news {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .header-filter {
      width: 70%;
      flex: 0 1 auto;
    }
    .header-handle {
      flex: 0 1 auto;
    }
  }
}
.admin-reply {
  display: flex;
  align-items: center;
}
</style>
