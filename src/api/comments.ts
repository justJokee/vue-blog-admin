/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { commentSchema, httpRes } from '@/types/'
type REQ = commentSchema['req']
export default {
  // 获取文章列表
  getComments<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/comments/get', payload)
  },

  // 筛选文章
  searchComments<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/admin/comments/search', payload)
  }
}
