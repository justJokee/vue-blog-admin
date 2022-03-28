/**
 * @desc 留言板管理
 * @author justJokee
 */

import http from '@/http/'
import { msgBoardSchema, httpRes } from '@/types/'
type REQ = msgBoardSchema['req']
export default {
  // 获取留言（树形结构）
  getMessages<RES = msgBoardSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/messageBoard/gets', payload)
  },
  // 筛选评论
  searchMessages<RES = msgBoardSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/admin/messageBoard/search', payload)
  },
  // 回复评论
  saveMessage<RES = msgBoardSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    console.log('这是payloda-->>', payload)
    return http('post', '/api/admin/messageBoard/save', payload)
  },
  // 删除评论
  delMessages<RES = msgBoardSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('delete', '/api/admin/messageBoard/del', payload)
  }
}
