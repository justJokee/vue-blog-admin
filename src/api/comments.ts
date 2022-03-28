/**
 * @desc 文档评论管理
 * @author justJokee
 */

import http from '@/http/'
import { commentSchema, httpRes } from '@/types/'
type REQ = commentSchema['req']
export default {
  // 获取评论（树形结构）
  getComments<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/comments/get', payload)
  },
  // 筛选评论
  searchComments<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/admin/comments/search', payload)
  },
  // 回复评论
  saveComments<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    console.log('这是payloda-->>', payload)
    return http('post', '/api/admin/comments/save', payload)
  },
  // 删除评论
  delComment<RES = commentSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('delete', '/api/admin/comments/del', payload)
  }
}
