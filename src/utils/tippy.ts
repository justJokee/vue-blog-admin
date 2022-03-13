import type { Quill } from 'quill'
import type { Ref } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // o
import 'tippy.js/themes/light.css'

let binder: any = null

export default function handleSelectLanguage(quill: Quill, IS_CODING: Ref<boolean>): void {
  tippy('.ql-code-block', {
    content: `<ul class = "xixi"><li data-lang='language-javascript'>javascript</li><li data-lang='language-css'>css</li></ul>`,
    allowHTML: true,
    trigger: 'click',
    theme: 'light',
    interactive: true,

    onMount(instance) {
      // ...
      const node = document.querySelector('.xixi')
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
  console.log('点击的事件--->>>', instance, (event.target as HTMLElement).dataset)
  const dataset = (event.target as HTMLElement).dataset
  const qq = document.querySelector('.xixi')
  qq?.removeEventListener('click', binder, false)
  quill.format('code-block', dataset.lang, 'silent')
  instance.hide()
}
