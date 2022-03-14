<template>
  <div class="comp-editor">
    <div id="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Quill, { generateCreate, reInitIndex } from '@/utils/quillHack'
import 'quill/dist/quill.snow.css'
import handleSelectLanguage from '@/utils/tippy'
import editorToolbarOptions from '@/utils/editorToolbarOptions'
import { imageHandler } from '@/utils/imageHandler'

interface propsType {
  modelValue: string
  initValue?: string
}

interface emitsType {
  (e: 'update:modelValue', content: string): void
}

const props = defineProps<propsType>()
const emit = defineEmits<emitsType>()

const toolbarOptions = editorToolbarOptions
const initCodeBlockConfig: any = {}
// 添加code-block
const IS_CODING = ref(false)
// quill实例
let quill: Quill
let content: string = ''
window.hljs.configure({
  // optionally configure hljs
  languages: ['javascript', 'ruby', 'python', 'css']
})
// 魔改quill
generateCreate(initCodeBlockConfig)

onMounted(() => {
  quill = new Quill('#editor', {
    modules: {
      syntax: true, // Include syntax module
      clipboard: {
        // 解决html回显莫名其妙出现的</br>,原因不明，未深究
        matchVisual: false
      },
      toolbar: {
        container: toolbarOptions,
        handlers: {
          'code-block': (value: boolean) => {
            IS_CODING.value = value
            if (!value) {
              // 光标跳出代码块
              quill.insertText(quill.getLength() + 1, '\n', 'silent')
              // 必须在下一个宏任务中移动光标至最新位置，否则代码块选中状态不会清空
              setTimeout(() => {
                quill.setSelection(quill.getLength(), 0)
              }, 0)
            }
            return false
          }
        }
      }
    },
    theme: 'snow'
  })
  const toolbar = quill.getModule('toolbar')
  toolbar.addHandler('image', imageHandler.bind(null, true, quill))
  // 初始值
  if (props.initValue) {
    initEditorValue(props.initValue)
  }
  // tippy
  handleSelectLanguage(quill, IS_CODING)
  const el = document.querySelector('#editor > .ql-editor')
  quill.on('text-change', function () {
    content = (el as Element).innerHTML
    console.log('富文本html--->>>>', { str: el?.innerHTML })
    content = compileCodeBlock(content)
    emit('update:modelValue', content)
  })
})

watch(
  () => props.initValue,
  (initValue: string | undefined) => {
    if (initValue && quill) {
      initEditorValue(initValue)
    }
  }
)
// 初始化编辑器数据（回显）
function initEditorValue(initValue: string) {
  // 生成language映射
  compileCodeBlock(initValue, initCodeBlockConfig)
  quill.clipboard.dangerouslyPasteHTML(initValue)
  reInitIndex()
}
function compileCodeBlock(content: string, initCodeBlockConfig?: any): string {
  const codeBlockReg = /<pre\s+class\s*=\s*"(.*?)"(?:.|\s)*?<\/pre>/g
  // 初始化赋值行为，解析存储代码块语言
  if (initCodeBlockConfig) {
    const blocks = content.match(codeBlockReg)
    console.log('这是blocks--->>>>>', blocks)

    if (blocks && blocks.length) {
      blocks.forEach((pre, index) => {
        codeBlockReg.lastIndex = 0
        const execArr = codeBlockReg.exec(pre)

        if (execArr && execArr.length) {
          const classNames = execArr[1].match(/(language-\S+)/g)
          const language = classNames && classNames.length ? classNames[0] : ''
          initCodeBlockConfig[index] = language
        }
      })
    }
  }
  // 由编辑器产出的html字符串
  else {
    content = content.replace(/<pre\s+(.|\s)*?>/g, '$&<code>').replace(/<\/pre/g, '</code>$&')
  }
  return content
}
</script>
<style lang="scss">
.comp-editor {
}
</style>
