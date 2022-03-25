import type { Quill } from 'quill'
import type { Ref } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // o
import 'tippy.js/themes/light.css'

let binder: any = null

export default function handleSelectLanguage(quill: Quill, IS_CODING: Ref<boolean>): void {
  tippy('.ql-code-block', {
    content: `<ul class = "language-list"><li data-lang='language-javascript'>javascript</li><li data-lang='language-css'>css</li></ul>`,
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
