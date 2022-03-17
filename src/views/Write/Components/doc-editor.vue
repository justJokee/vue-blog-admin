<template>
  <div class="mp-doc">
    <button @click="jump">555</button>
    <div class="mp-doc__workspace">
      <div class="workspace__info">
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
          <n-form-item label="标签" path="tags">
            <n-cascader
              class="workspace__info-tags"
              v-model:value="article.tag"
              check-strategy="child"
              expand-trigger="click"
              multiple
              :show-path="false"
              :options="recommandTags"
            />
            <n-input v-model:value="customTag" placeholder="自定义标签" class="workspace__info-customtag">
              <template #suffix>
                <i class="el-icon-plus" @click="addCustomTag" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="封面图">
            <n-upload
              :custom-request="customRequest"
              :default-file-list="defaultFileList"
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
      <div class="workspace__editor">
        <div class="workspace__editor-content">
          <comp-editor v-model="content" :init-value="initValue" @change="handleChange" />
        </div>
        <div class="workspace__editor-catalog">
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { articleType, catalogField } from '@/types/'
import { FormRules } from 'naive-ui'
import { recommandTags } from '@/utils/recommandTags'
import TreeFolder from '@/views/Components/tree-folder.vue'
import generateHTree from '@/utils/generateHTree'
import api from '@/api/qiniu'
import { onBeforeRouteUpdate } from 'vue-router'
import router from '@/router/'
const customTag = ref('')
const catalogs = ref<Array<catalogField>>([])
// import api from '@/api/article'
const article = reactive<articleType>({
  original: 1,
  title: '',
  abstract: '',
  headerPic: '',
  publish: 1,
  content: '',
  tag: []
})
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
const content = ref('')
const defaultFileList: UploadFileInfo[] = [
  {
    id: '',
    name: '',
    status: 'finished',
    url: 'https://qiniu.mapblog.cn/images/1647256724041.jpeg'
  }
]
let qiniuToken: string = ''

function addCustomTag() {
  article.tag.push(customTag.value)
  customTag.value = ''
}
function handleChange(html: string) {
  const folder = generateHTree(html)
  catalogs.value = folder
  console.log('计算树结构----->>>>', folder)
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
      onFinish()
    } else onError()
    console.log(file, data, qiniuToken)
  } catch (e) {
    onError()
  }
}
function jump() {
  router.push({
    name: 'doc',
    params: {
      articleId: 12
    }
  })
}
onMounted(() => {})
onBeforeRouteUpdate((to, from) => {
  console.log('router---拦截---', to, from)
})
// const initValue = ref(
//   '<p>js</p><pre class="language-javascript ql-syntax"><code><span class="hljs-keyword">const</span> a = <span class="hljs-number">111</span>\n</code></pre><p>css</p><pre class="language-css ql-syntax"><code>.css {\n  font-size: 12px;\n}\n</code></pre>'
// )
const initValue = ref('')
</script>
<style lang="scss">
.mp-doc {
  display: flex;

  &__workspace {
    width: 75%;
    margin: 0 auto;

    .workspace__info {
      &-tags {
        width: 50%;
      }
      &-customtag {
        margin-left: 20px;
        width: 130px;
        [class^='el-icon-'] {
          cursor: pointer;
        }
      }
    }
    .workspace__editor {
      display: flex;
      align-items: flex-start;
      &-content {
        flex: 0 0 auto;
        width: 75%;
      }
      &-catalog {
        padding: 12px;
        width: 25%;
        // min-height: 250px;
        margin-left: 16px;
        border-left: 1px solid #e8e8e8;
      }
    }
  }
  &__catalog {
    width: 20%;
  }
}
</style>
