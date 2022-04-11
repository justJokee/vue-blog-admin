/**
 * @desc 编辑器产出富文本的本地存储操作
 * @author justJokee
 */

const richTextKey = 'rich-text'

export function getText() {
  if (localStorage.getItem(richTextKey)) {
    return localStorage.getItem(richTextKey)
  }
}
export function setText(text: string) {
  if (text) {
    localStorage.setItem(richTextKey, text)
  }
}
export function removeText() {
  localStorage.removeItem(richTextKey)
}
