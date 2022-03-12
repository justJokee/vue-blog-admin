<template>
  <div class="comp-editor">
    <div id="editor" />
  </div>
</template>

<script setup lang="ts">
import 'quill/dist/quill.snow.css'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // o
import 'tippy.js/themes/light.css'

import { nextTick } from 'vue'
import Quill from 'quill'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image'] // 链接、图片
]

window.hljs.configure({
  // optionally configure hljs
  languages: ['javascript', 'ruby', 'python', 'css']
})

var codeBlock = Quill.import('formats/code-block')
codeBlock.create = function (value: string) {
  let domNode = document.createElement('pre')

  domNode.setAttribute('class', value + ' ql-syntax')
  console.log('dom被创建了--->>>>', domNode, value)
  return domNode
}

nextTick(() => {
  const quill = new Quill('#editor', {
    modules: {
      syntax: true, // Include syntax module

      toolbar: {
        container: toolbarOptions,
        handlers: {
          'code-block': function (value: boolean) {
            console.log('打开或者关闭--->>>>', value)
            if (!value) {
              // 光标跳出代码块
              quill.insertText(quill.getLength() + 1, '\n', 'silent')
              // 必须加下边这行赋值语句，否则代码块选中状态不会清空
              quill.setContents(quill.getContents())
              // 移动光标至最新位置
              quill.setSelection(quill.getLength(), 0)

              console.log('这是content--->>>>', quill.getContents())
            }
            return false
          }
        }
      }
    },
    theme: 'snow'
  })
  function handleSelectLanguage(instance: any, event: MouseEvent) {
    console.log('点击的事件--->>>', instance, (event.target as HTMLElement).dataset)
    const dataset = (event.target as HTMLElement).dataset
    const qq = document.querySelector('.xixi')
    qq?.removeEventListener('click', binder, false)
    quill.format('code-block', dataset.lang, 'silent')
    instance.hide()
  }
  let binder: any = null
  // <li>css</li>
  tippy('.ql-code-block', {
    content: `<ul class = "xixi"><li data-lang='language-javascript'>javascript</li><li data-lang='language-css'>css</li></ul>`,
    allowHTML: true,
    trigger: 'click',
    theme: 'light',
    interactive: true,

    onMount(instance) {
      // ...
      console.log('poper穿件成功--->>>', document.querySelector('.xixi'))
      const qq = document.querySelector('.xixi')
      binder = handleSelectLanguage.bind(null, instance)
      qq?.addEventListener('click', binder, false)
    },
    onDestroy() {}
  })
  const el = document.querySelector('#editor > .ql-editor')
  quill.on('text-change', function () {
    console.log('获得取得时间：：：；', { str: el?.innerHTML })
    console.log('监听content--->>>>', quill.getContents())
  })
  setTimeout(() => {
    // 正则判断维护map映射
    quill.clipboard.dangerouslyPasteHTML(
      0,
      '<pre class="language-js ql-syntax" data-lang="js"><!--language-->//zheshi<code><span class="hljs-string">const a = \'这是一个666测试\'</span>\n</code></pre><pre>.css{font-size:12px;}</pre>'
    )
  }, 5000)
})
</script>

<style lang="scss"></style>
