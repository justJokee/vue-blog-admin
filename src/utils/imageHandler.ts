/**
 * @desc quill编辑器image handler
 * @param {*} value
 * @author justJokee
 */
import api from '@/api/qiniu'
import { Quill, RangeStatic } from 'quill'
let el: HTMLInputElement
export function imageHandler(value: boolean, quill: Quill) {
  el = document.createElement('input')
  el.type = 'file'
  el.accept = '.png,.jpg,.jpeg,.svg,.gif,.bmp,.webp'
  el.addEventListener('change', handleUpload.bind(null, quill), false)
  el.click()
  return value
}

async function handleUpload(quill: Quill) {
  try {
    const { data, status } = await api.getQiniuToken()
    if (status === 200) {
      if (el.files && el.files.length) {
        const extension = /.*\.(.*)$/g.exec(el.value)
        const uploadRes = await api.qiniuUpload({
          token: data.token,
          key: `images/${Date.now()}.${extension ? extension[1] : 'png'}`,
          file: el.files[0]
        })
        const index = (quill.getSelection() as RangeStatic).index
        quill.insertEmbed(index, 'image', import.meta.env.VITE_BASE_URL_QINIU + uploadRes.data.key)
        quill.setSelection(index + 1, 0)
      }
    }
  } catch (e: any) {
    throw new Error(e)
  }
}
