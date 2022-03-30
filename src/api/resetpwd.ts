/**
 * @desc 重置密码
 * @author justJokee
 */

import http from '@/http/'

import { resetpwdSchema, httpRes } from '@/types/'
type REQ = resetpwdSchema['req']
export default {
  // 获取文章列表
  resetpwd<RES = resetpwdSchema['res']>(payload?: REQ): Promise<httpRes<RES>> {
    return http('patch', '/api/admin/pwd/reset', payload)
  }
}
