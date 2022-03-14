/**
 * @desc 七牛云
 * @author justJokee
 */

import http from '@/http/'
import { qiniuUploadParams, httpRes } from '@/types/'
export default {
  // 获取上传token
  getQiniuToken(payload?: any): Promise<httpRes> {
    return http.get('/api/front/qiniu/getToken', payload)
  },
  // 七牛云上传图片
  qiniuUpload(payload: qiniuUploadParams): Promise<httpRes> {
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
