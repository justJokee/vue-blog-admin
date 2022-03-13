<template>
  <div class="comp-editor">
    <div id="editor" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Quill, { generateCreate } from '@/utils/quillHack'
import 'quill/dist/quill.snow.css'
import handleSelectLanguage from '@/utils/tippy'
import editorToolbarOptions from '@/utils/editorToolbarOptions'
interface propsType {
  modelValue: string
  initValue?: string
}

interface emitsType {
  (e: 'update:modelValue', content: string): void
}

const props = defineProps<propsType>()
const emit = defineEmits<emitsType>()
console.log(props, emit)

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
  // 初始值
  if (props.initValue) {
    quill.clipboard.dangerouslyPasteHTML(props.initValue)
  }
  // tippy
  handleSelectLanguage(quill, IS_CODING)
  const el = document.querySelector('#editor > .ql-editor')
  quill.on('text-change', function () {
    content = (el as Element).innerHTML
    console.log('富文本html--->>>>', { str: el?.innerHTML })
    content = compileCodeBlock(content, initCodeBlockConfig)
    emit('update:modelValue', content)
  })
  // setTimeout(() => {
  //   // 正则判断维护map映射
  //   quill.clipboard.dangerouslyPasteHTML(
  //     '<pre class="language-js ql-syntax" data-lang="js"><!--language-->//zheshi<code><span class="hljs-string">const a = \'这是一个666测试\'</span>\n</code></pre><pre>.css{font-size:12px;}</pre>'
  //   )
  // }, 10000)
})

watch(
  () => props.initValue,
  (initValue: string | undefined) => {
    if (initValue && quill) {
      console.log('监听触发初始化--->>>>>')
      quill.clipboard.dangerouslyPasteHTML(initValue)
    }
  }
)
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
    console.log('codeBlocks=======>>>>>>', initCodeBlockConfig)
  }
  return content
}
</script>
<style lang="scss"></style>
