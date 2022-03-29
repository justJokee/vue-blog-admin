/**
 * @desc 系统用户管理
 * @author justJokee
 */

import http from '@/http/'
import { userSchema, httpRes } from '@/types/'
type REQ = userSchema['req']
export default {
  // 登录
  login<RES = userSchema['res']>(payload?: REQ): Promise<httpRes<RES>> {
    return http('post', '/api/admin/login', payload)
  }
}
