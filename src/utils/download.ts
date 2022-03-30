/**
 * @desc download Blob
 * @author justJokee
 */
import moment from 'moment'
export function download(blob: Blob) {
  const filename = `mongodump-${moment().format('YYYY-MM-DD-HH-mm')}.zip`
  const href = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // 释放blob对象
  window.URL.revokeObjectURL(href)
}
