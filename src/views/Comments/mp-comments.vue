<template>
  <div class="mp-comments">
    <div class="mp-comments__header">
      <div class="header-filter">
        <mp-articles-filter v-model="filters" />
      </div>
      <div class="header-handle">
        <n-space>
          <n-button type="info" @click="filterComments(true)">筛选</n-button>
          <n-button type="error" :disabled="!dels?.length" @click="preDeleteComments(dels, true)">批量删除</n-button>
        </n-space>
      </div>
    </div>
    <div class="mp-comments__body">
      <n-data-table
        remote
        children-key="reply"
        :columns="columns"
        :data="comments"
        :pagination="pagination"
        :row-key="(row) => row._id"
        :checked-row-keys="dels"
        @update:checked-row-keys="handleCheck"
      />
    </div>
    <n-modal v-model:show="modalShow">
      <n-card :title="replyTitle" style="width: 40%">
        <div class="admin-reply">
          <n-input v-model:value="replyContent" placeholder="请输入回复内容" />
        </div>
        <template #footer>
          <n-space justify="end">
            <n-button @click="modalShow = false">取消</n-button>
            <n-button type="info" @click="submitReply">确认</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h, computed } from 'vue'
import { useDialog, NSpace, NButton, useMessage, DataTableColumns } from 'naive-ui'
import { useRoute } from 'vue-router'
import { commentSchema } from '@/types/'
import { formatDate } from '@/utils/formatDate'
import mpArticlesFilter from './Components/mp-comments-filter.vue'
import api from '@/api/'
const $route = useRoute()
const $dialog = useDialog()
const $message = useMessage()
// 评论和留言均按照一级留言进行分页查询，因此 total为一级评论数量，totalAll为表数据总数
const totalAll = ref(0)
const modalShow = ref(false)
const replyTarget = ref<Partial<commentSchema['res']>>()
const replyContent = ref('')
// 评论模式  1：回复 0：增加文章一级评论
const replyMode = ref(1)
const pagination = reactive({
  page: 1,
  defaultPageSize: 10,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page
    getComments()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    getComments()
  },
  prefix() {
    return `总评论数为：${totalAll.value}`
  }
})
const dels = ref<string[]>()
const comments = ref<Partial<commentSchema['res']>[]>()
const filters = ref({
  keyword: undefined,
  articleId: undefined
})
const columns: DataTableColumns = [
  {
    type: 'selection'
  },
  {
    title: '昵称',
    key: 'name',
    width: 200,
    render(row) {
      const text: any = row.name
      return h(
        'span',
        {
          style: {
            color: row.admin ? '#eaa156' : 'inherit'
          }
        },
        text
      )
    },
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '评论内容',
    key: 'content',
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '文章id',
    key: 'articleId',
    width: 120
  },
  {
    title: '点赞',
    key: 'like'
  },
  {
    title: '子级回复数量',
    key: 'replyTotal',
    align: 'center',
    render(row) {
      let text: any = '-'
      if (Reflect.has(row, 'replyTotal')) text = row.replyTotal
      return h('span', null, text)
    }
  },
  {
    title: '@',
    key: 'aite',
    render(row) {
      let text: any = '-'
      if (Reflect.has(row, 'aite') && row.aite) text = row.aite
      return h('span', null, text)
    }
  },
  {
    title: '管理员',
    key: 'admin',
    align: 'center',
    render(row) {
      const text = row.admin ? '是' : '否'
      return h(
        'span',
        {
          style: {
            color: row.admin ? '#eaa156' : 'inherit'
          }
        },
        text
      )
    }
  },
  {
    title: '评论时间',
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
                  replyMode.value = 1
                  replyTarget.value = row
                  modalShow.value = true
                }
              },
              {
                default: () => '回复'
              }
            ),
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'info',
                onClick() {
                  replyMode.value = 0
                  replyTarget.value = row
                  modalShow.value = true
                }
              },
              {
                default: () => '文章评论'
              }
            ),
            h(
              NButton,
              {
                text: true,
                size: 'tiny',
                type: 'error',
                onClick() {
                  preDeleteComments(row)
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
getComments()

const replyTitle = computed(() => {
  if (replyMode.value) return '回复 ' + replyTarget.value?.name + '：'
  else return '新增评论：'
})
function getComments() {
  // 判断是否存在筛选条件
  const filter = Object.keys(filters.value).some((key) => {
    const cur = filters.value[key as keyof typeof filters.value]
    return cur !== undefined && cur !== null && cur !== ''
  })

  if (filter) filterComments()
  else fetchComments()
}
// 直接获取评论列表
async function fetchComments() {
  const params: any = {}
  if ($route.params.articleId) params.articleId = $route.params.articleId
  const {
    data,
    status,
    total,
    totalAll: _total
  } = await api.getComments({
    page: pagination.page,
    limit: pagination.pageSize,
    ...params
  })
  if (status === 200) {
    comments.value = data
    pagination.itemCount = total as number
    totalAll.value = _total as number
  }
}
// 筛选评论
async function filterComments(btnTrigger?: boolean) {
  if (btnTrigger) pagination.page = 1
  const params: any = {}
  for (let key in filters.value) {
    const k = key as keyof typeof filters.value
    if (filters.value[k] !== undefined && filters.value[k] !== null && filters.value[k] !== '') {
      params[k] = filters.value[k]
    }
  }
  if ($route.params.articleId) params.articleId = $route.params.articleId

  const { status, data, total } = await api.searchComments({
    ...params,
    page: pagination.page,
    limit: pagination.pageSize
  })
  if (status === 200) {
    comments.value = data
    pagination.itemCount = total as number
    totalAll.value = total as number
  }
}
// 提交回复
async function submitReply() {
  if (!replyContent.value) return
  // 回复一级评论或者二级评论，均将一级评论作为父id
  const parentId = replyTarget.value?.parentId ? replyTarget.value?.parentId : replyTarget.value?._id
  const { status } = await api.saveComments({
    articleId: replyTarget.value?.articleId,
    name: import.meta.env.VITE_REPLY_NAME,
    imgUrl: import.meta.env.VITE_REPLY_IMGURL,
    email: import.meta.env.VITE_REPLY_EMAIL,
    link: import.meta.env.VITE_REPLY_LINK,
    content: replyContent.value,
    parentId: replyMode.value ? parentId : null,
    aite: replyMode.value ? replyTarget.value?.name : null
  })

  if (status === 200) {
    modalShow.value = false
    replyContent.value = ''
    $message.success(replyMode.value ? '评论成功' : '回复成功')
    getComments()
  }
}
function handleCheck(val: any) {
  dels.value = val
}

async function delComment(delId: any) {
  let articleIds: any
  if (typeof delId === 'string') {
    articleIds = comments.value?.find((item) => item._id === delId)?.articleId
  } else {
    articleIds = []
    delId.forEach((_id: string) => {
      const id = comments.value?.find((item) => item._id === _id)?.articleId
      articleIds.push(id)
    })
  }
  const { status } = await api.delComment({
    id: delId,
    articleId: articleIds
  })
  if (status === 200) {
    dels.value = []
    $message.success('删除评论成功')
    getComments()
  }
}
function preDeleteComments(dels: any, batch: boolean = false) {
  $dialog.warning({
    title: '警告',
    content: '您确定删除么？',
    positiveText: '确定',
    negativeText: '再想想',
    onPositiveClick() {
      const id = batch ? dels : dels._id
      delComment(id)
    }
  })
}
</script>

<style lang="scss">
.mp-comments {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .header-filter {
      width: 80%;
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
