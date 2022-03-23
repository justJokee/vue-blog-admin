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
              :custom-request="customRequest"
              v-model:file-list="fileList"
              list-type="image-card"
              accept=".png,.jpg,.jpeg,.svg,.gif,.bmp,.webp"
              :max="1"
            >
              点击上传
            </n-upload>
          </n-form-item>
          <n-form-item label="分类" path="original">
            <n-select v-model:value="article.categoryId" :options="categoriesOptions" />
          </n-form-item>
          <n-form-item label="原创" path="original">
            <n-radio-group v-model:value="article.original" name="radiogroup">
              <!-- <n-space> -->
              <n-radio :value="1">原创</n-radio>
              <n-radio :value="0">转载</n-radio>
              <!-- </n-space> -->
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
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { UploadCustomRequestOptions, UploadFileInfo, FormRules, SelectOption } from 'naive-ui'
import { articleSchema, categorySchema } from '@/types/'
import { recommandTags } from '@/utils/recommandTags'
import api from '@/api/'
interface propsType {
  edit?: number
  articleId?: number
  publish?: number
  show: boolean
}
interface emitsProps {
  (e: 'update:show', show: boolean): void
}
// type articleType = res<Partial<articleSchema['res']>>
const props = withDefaults(defineProps<propsType>(), {
  edit: 1,
  publish: 1
})
const emit = defineEmits<emitsProps>()
// defineExpose({ submit })
const $router = useRouter()
const customTag = ref('')
const fetching = ref(false)
const title = computed(() => {
  return props.edit ? '编辑文档' : '新建文档'
})
const categories = ref<categorySchema['res'][]>()
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
onMounted(async () => {
  const { status, data } = await api.getCategory()
  if (status === 200) {
    categories.value = data

    categoriesOptions.value = data.map((cate, index) => {
      if (index === 0) article.value.categoryId = cate._id
      return {
        label: cate.name,
        value: cate._id
      }
    })
  }
})
watchEffect(async (onInvalidate) => {
  onInvalidate(() => {})
  // 编辑模式初始化
  if (props.edit && props.articleId) {
    const { data, status } = await api.getArticle({
      publish: props.publish,
      articleId: props.articleId,
      excloudContent: 0
    })

    if (status === 200) {
      article.value = data
      fileList.value = [
        {
          id: '',
          name: '',
          status: 'finished',
          url: data.headerPic
        }
      ]
    }
  }
})
async function submit() {
  fetching.value = true
  // 编辑文档
  if (props.edit) {
    const { data, status } = await api.saveArticle(article.value)
    if (status === 200) {
      //
      console.log(data)
    }
  }
  // 新增文档
  else {
    //
    const { data, status } = await api.saveArticle(article.value)
    if (status === 200) {
      emit('update:show', false)
      $router.push({ name: 'doc', params: { articleId: data.articleId } })

      console.log('文档存储成功--->>>>', data)
    }
  }

  fetching.value = false
}
function addCustomTag() {
  article.value.tag?.push(customTag.value)
  customTag.value = ''
}
function handleCancel() {
  emit('update:show', false)
}
function updateShow(val: boolean) {
  emit('update:show', val)
}
async function customRequest({ file, onFinish, onError }: UploadCustomRequestOptions) {
  try {
    if (!qiniuToken) {
      const { data, status } = await api.getQiniuToken()
      if (status === 200) {
        qiniuToken = data.token
      } else return
    }
    console.log(file, qiniuToken)

    const { data, status } = await api.qiniuUpload({
      file: file.file as File,
      key: `image/${file.name}`,
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
      onFinish()
    } else onError()
    console.log(file, data, qiniuToken)
  } catch (e) {
    onError()
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
