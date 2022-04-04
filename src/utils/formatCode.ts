/**
 * @desc 添加代码块处理逻辑
 * @author justJokee
 */
import type { Quill } from 'quill'
import type { Ref } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // o
import 'tippy.js/themes/light.css'
const languages = [
  { label: '标记语言', value: 'markup' },
  { label: 'pug', value: 'pug' },
  { label: 'css', value: 'css' },
  { label: 'sass', value: 'sass' },
  { label: 'javascript', value: 'javascript' },
  { label: 'typescript', value: 'typescript' },
  { label: 'Bash', value: 'bash' },
  { label: 'jsx', value: 'jsx' },
  { label: 'tsx', value: 'tsx' },
  { label: 'java', value: 'java' },
  { label: 'python', value: 'python' },
  { label: 'rust', value: 'rust' },
  { label: 'ruby', value: 'ruby' }
]
let binder: any = null
let lisStr = ''
languages.forEach((li) => {
  lisStr += `<li data-lang='language-${li.value}'>${li.label}</li>`
})
export default function handleSelectLanguage(quill: Quill, IS_CODING: Ref<boolean>): void {
  tippy('.ql-code-block', {
    content: `<ul class = "language-list">${lisStr}</ul>`,
    allowHTML: true,
    trigger: 'click',
    theme: 'light',
    interactive: true,
    placement: 'bottom',
    onMount(instance) {
      // ...
      const node = document.querySelector('.language-list')
      binder = handler.bind(null, instance, quill)
      node?.addEventListener('click', binder, false)
    },
    onShow() {
      if (!IS_CODING.value) return false
    },
    onDestroy() {}
  })
}

function handler(instance: any, quill: Quill, event: MouseEvent): void {
  const dataset = (event.target as HTMLElement).dataset
  const qq = document.querySelector('.language-list')
  qq?.removeEventListener('click', binder, false)
  quill.format('code-block', dataset.lang, 'silent')
  instance.hide()
}
