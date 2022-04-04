/**
 * @desc quill编辑器魔改
 * @author justJokee
 */

import Quill from 'quill'

const codeBlock = Quill.import('formats/code-block')
let timer: any = null
export function generateCreate(initCodeBlockConfig: any) {
  // 覆写code-block的创建dom方法，为了加上不同语言的class前缀
  codeBlock.create = function (value: string) {
    const domNode = document.createElement('pre')
    let language: string = ''
    // value若为true，则证明此方法在编辑器初始化代码块时调用（自动调用）
    if (typeof value === 'boolean') {
      // 获取对应的语言
      if (!timer) {
        timer = setTimeout(() => {
          // 初始化渲染完成后，挂载相应的语言class
          const pres = document.querySelectorAll('.mp-doc pre')
          if (pres.length) {
            Array.from(pres).forEach((pre, index) => {
              pre.className += `${initCodeBlockConfig[index]} line-numbers ql-syntax`
            })
          }
          timer = null
        }, 0)
      }
    }
    // 手动加入代码块，value此时为配置的语言类名
    else {
      language = value
      domNode.setAttribute('class', language + ' line-numbers ql-syntax')
    }

    return domNode
  }
}

export default Quill
