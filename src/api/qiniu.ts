/**
 * @desc 七牛云
 * @author justJokee
 */

import http from '@/http/'
import { qiniuSchema, httpRes } from '@/types/'
type REQ = qiniuSchema['req']

export default {
  // 获取上传token
  getQiniuToken<RES = qiniuSchema['res']>(payload?: REQ): Promise<httpRes<RES>> {
    return http('get', '/api/front/qiniu/getToken', payload)
  },

  // 获取上传token
  qiniuUpload<RES = any>(payload: REQ): Promise<httpRes<RES>> {
    return new Promise((resolve, reject) => {
      const { file, key, token } = payload
      const observable = window.qiniu.upload(file, key, token)
      observable.subscribe({
        // 接收上传进度信息
        // next(res: any) {},
        error(err: any) {
          reject(err)
        },
        complete(res: any) {
          resolve({
            status: 200,
            data: res,
            info: '七牛云图片上传成功'
          })
        }
      })
    })
  }
}
