<template>
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
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { UploadCustomRequestOptions, UploadFileInfo, FormRules } from 'naive-ui'
import { articleSchema } from '@/types/'
import { recommandTags } from '@/utils/recommandTags'
import api from '@/api/'
interface propsType {
  edit?: number
  articleId?: number
  publish?: number
}
// type articleType = res<Partial<articleSchema['res']>>
const props = withDefaults(defineProps<propsType>(), {
  edit: 1,
  publish: 1
})
// type oo =
defineExpose({ submit })
const customTag = ref('')
const article = ref<Partial<articleSchema['res']>>({
  original: 1,
  title: '',
  abstract: '',
  headerPic: '',
  publish: 1,
  tag: [],
  content: ''
})
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
  // 编辑模式初始化
  if (props.edit) {
    const { data, status } = await api.getArticle({
      publish: props.publish,
      articleId: 1,
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
  // 编辑模式
  if (props.edit) {
    const { data, status } = await api.saveArticle(article.value)
    if (status === 200) {
      //
      console.log(data)
    }
  }
  // 添加模式
  else {
    //
  }
}
function addCustomTag() {
  article.value.tag?.push(customTag.value)
  customTag.value = ''
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
</style>
