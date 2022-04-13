/**
 * @desc 编辑器产出富文本的本地存储操作
 * @author justJokee
 */

const richTextKey = 'rich-text'

export function getText(_id: string) {
  const key = `${richTextKey}_${_id}`
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key)
  }
}
export function setText(_id: string, text: string) {
  if (text) {
    const key = `${richTextKey}_${_id}`
    localStorage.setItem(key, text)
  }
}
export function removeText(_id: string) {
  const key = `${richTextKey}_${_id}`
  localStorage.removeItem(key)
}
