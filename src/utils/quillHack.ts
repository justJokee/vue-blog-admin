/**
 * @desc quill编辑器魔改
 * @author justJokee
 */

import Quill from 'quill'

const codeBlock = Quill.import('formats/code-block')

export function generateCreate(map: any) {
  // 覆写code-block的创建dom方法，为了加上不同语言的class前缀
  codeBlock.create = function (value: string) {
    const domNode = document.createElement('pre')
    // value若为true，则证明此方法在编辑器初始化代码块时调用（自动调用）
    if (typeof value === 'boolean') {
      console.log('这是map----->>>>', map)
      //
    }
    // 手动加入代码块，value此时为配置的语言类名
    else {
      domNode.setAttribute('class', value + ' ql-syntax')
    }
    console.log('dom被创建了--->>>>', domNode, value)
    return domNode
  }
}

export default Quill
