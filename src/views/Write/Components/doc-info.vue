<template>
  <n-modal :show="show" @updata:show="updateShow">
    <n-card :title="title" style="width: 40%">
      <div class="doc-info">
        <n-form
          ref="formRef"
          label-align="left"
          label-placement="left"
          :label-width="60"
          :model="article"
          :rules="rules"
          size="medium"
        >
          <n-form-item label="标题" path="title">
            <n-input v-model:value="article.title" placeholder="标题" />
          </n-form-item>
          <n-form-item label="概要" path="abstract">
            <n-input v-model:value="article.abstract" placeholder="概要" />
          </n-form-item>
          <n-form-item label="标签" path="tag">
            <div class="doc-info__tag">
              <n-cascader
                class="workspace__info-tags"
                v-model:value="article.tag"
                check-strategy="child"
                expand-trigger="click"
                multiple
                :show-path="false"
                :options="recommandTags"
              />
              <n-input v-model:value="customTag" placeholder="自定义标签" class="doc-info__ctag">
                <template #suffix>
                  <i class="el-icon-plus" @click="addCustomTag" />
                </template>
              </n-input>
            </div>
          </n-form-item>
          <n-form-item label="封面图">
            <n-upload
              :on-remove="handleRemove"
              :on-update:file-list="handleFileListUpdate"
              :file-list="fileList"
              list-type="image-card"
              accept=".png,.jpg,.jpeg,.svg,.gif,.bmp,.webp"
              :max="1"
            >
              点击上传
            </n-upload>
          </n-form-item>
          <n-form-item label="分类">
            <n-select v-model:value="article.categoryId" :options="categoriesOptions" />
          </n-form-item>
          <n-form-item label="原创">
            <n-radio-group v-model:value="article.original" name="radiogroup">
              <!-- <n-space> -->
              <n-radio :value="1">原创</n-radio>
              <n-radio :value="0">转载</n-radio>
              <!-- </n-space> -->
            </n-radio-group>
          </n-form-item>
          <n-form-item v-if="props.edit" label="上下线">
            <n-radio-group v-model:value="article.publish" name="radiogroup">
              <n-radio :value="1">上线（发布）</n-radio>
              <n-radio :value="0">下线（未发布）</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-form>
      </div>
      <div class="doc-handle">
        <n-space justify="end">
          <n-button @click="handleCancel">取消</n-button>
          <n-spin size="small" :show="fetching">
            <n-button type="info" @click="submit">确定</n-button>
          </n-spin>
        </n-space>
      </div>
    </n-card>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/'
import type { UploadFileInfo, FormRules, SelectOption } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { articleSchema } from '@/types/'
import { recommandTags } from '@/utils/recommandTags'
import api from '@/api/'

interface propsType {
  edit?: number
  articleId?: number
  publish?: number
  show: boolean
  initData?: Partial<articleSchema['res']>
}
interface emitsProps {
  (e: 'update:show', show: boolean): void
  (e: 'update:edit-info', info: Partial<articleSchema['res']>): void
}
const props = withDefaults(defineProps<propsType>(), {
  edit: 1,
  publish: 1
})

const emit = defineEmits<emitsProps>()
// defineExpose({ submit })
const $router = useRouter()
const $store = useStore()
const $message = useMessage()
const customTag = ref('')
const fetching = ref(false)
const title = computed(() => {
  return props.edit ? '编辑文档' : '新建文档'
})
const article = ref<Partial<articleSchema['res']>>({
  original: 1,
  title: '',
  abstract: '',
  headerPic: '',
  publish: 1,
  tag: [],
  categoryId: ''
})
const categoriesOptions = ref<SelectOption[]>()
// article.value
const rules: FormRules = {
  title: {
    required: true,
    message: '请输入标题',
    trigger: ['input', 'blur']
  },
  abstract: {
    required: true,
    message: '请输入概要',
    trigger: ['input', 'blur']
  }
}
const fileList = ref<UploadFileInfo[]>([])
let qiniuToken: string = ''

if (!props.edit) article.value.publish = 0
onMounted(() => {
  if (!props.edit) {
    article.value.headerPic = '/img/cover/default.jpg'
    fileList.value = [
      {
        id: '',
        name: '',
        status: 'finished',
        url: '/img/cover/default.jpg'
      }
    ]
  }
})
watchEffect(() => {
  categoriesOptions.value = $store.state.categories.map((cate, index) => {
    if (index === 0) article.value.categoryId = cate._id
    return {
      label: cate.name,
      value: cate._id
    }
  })
})
// 传入初始化值情况
watch(
  () => props.initData,
  () => {
    watchInitHandler()
  }
)
// 传入articleId,让元件自己完成初始化
watch(
  () => props.articleId,
  () => {
    watchInitHandler()
  }
)
async function watchInitHandler() {
  // 编辑模式初始化
  if (props.edit) {
    if (props.articleId) {
      const { data, status } = await api.getArticle({
        publish: props.publish,
        articleId: props.articleId,
        excloudContent: 0
      })

      if (status === 200) {
        article.value = data
      }
    }

    if (props.initData) {
      for (let key in article.value) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(article.value as Record<string, any>)[key] = (props.initData as Record<string, any>)[key]
      }
    }
    fileList.value = []
    if (article.value.headerPic) {
      fileList.value = [
        {
          id: '',
          name: '',
          status: 'finished',
          url: article.value.headerPic
        }
      ]
    } else {
      fileList.value = [
        {
          id: '',
          name: '',
          status: 'finished',
          url: '/img/cover/default.jpg'
        }
      ]
      article.value.headerPic = '/img/cover/default.jpg'
    }
  }
}
async function submit() {
  fetching.value = true
  // 编辑文档
  if (props.edit) {
    const articleId = props.initData ? props.initData.articleId : props.articleId
    const { data, status } = await api.editArticle({ ...article.value, articleId })
    if (status === 200) {
      article.value = data
      emit('update:edit-info', article.value)
      emit('update:show', false)
      $message.success('文档编辑成功')
    }
  }
  // 新增文档
  else {
    const { data, status } = await api.saveArticle(article.value)
    if (status === 200) {
      emit('update:show', false)
      $message.success('新建文档成功')

      $router.push({ name: 'doc', params: { articleId: data.articleId } })
    }
  }

  fetching.value = false
}
function addCustomTag() {
  article.value.tag?.push(customTag.value)
  customTag.value = ''
}
// 图片删除事件
function handleRemove() {
  fileList.value = []
  article.value.headerPic = ''
}
function handleCancel() {
  emit('update:show', false)
}
function handleFileListUpdate(list: UploadFileInfo[]) {
  if (list.length) {
    fileList.value = [
      {
        id: '',
        status: 'uploading',
        name: ''
      }
    ]
    customRequest(list)
  }
}
function updateShow(val: boolean) {
  emit('update:show', val)
}
async function customRequest(list: UploadFileInfo[]) {
  try {
    const file = list[0]
    if (!qiniuToken) {
      const { data, status } = await api.getQiniuToken()
      if (status === 200) {
        qiniuToken = data.token
      } else return
    }

    const { data, status } = await api.qiniuUpload({
      file: file.file as File,
      key: `images/article-cover/${Date.now()}.${file.name}`,
      token: qiniuToken
    })
    if (status === 200) {
      fileList.value = [
        {
          id: data.key as string,
          status: 'finished',
          name: data.name as string,
          url: (import.meta.env.VITE_BASE_URL_QINIU + data.key) as string
        }
      ]

      article.value.headerPic = (import.meta.env.VITE_BASE_URL_QINIU + data.key) as string
    } else {
      fileList.value = [
        {
          id: '',
          status: 'error',
          name: ''
        }
      ]
    }
  } catch (e) {
    fileList.value = [
      {
        id: '',
        status: 'error',
        name: ''
      }
    ]
  }
}
</script>
<style lang="scss">
.doc-info {
  padding: 16px;
  &__tag {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  &__ctag {
    flex: 0 0 auto;
    margin-left: 20px;
    width: 140px !important;
  }
}
.doc-handle {
  padding: 0 16px;
}
</style>
