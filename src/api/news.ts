/**
 * @desc 消息管理
 * @author justJokee
 */

import http from '@/http/'
import { newsSchema, httpRes } from '@/types/'
type REQ = newsSchema['req']
export default {
  // 获取消息列表
  getNews<RES = newsSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/admin/news/gets', payload)
  },
  // 设置已读消息
  readNews<RES = newsSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('patch', '/api/admin/news/read', payload)
  },
  // 设置已读消息
  setAllNewsRead<RES = newsSchema['res']>(payload?: REQ): Promise<httpRes<RES[]>> {
    return http('patch', '/api/admin/news/readAll', payload)
  },
  // 删除评论
  delNews<RES = newsSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('delete', '/api/admin/news/del', payload)
  },
  // 获取未读消息数量
  getUnreadNewsTotal<RES = newsSchema['res']>(payload?: REQ): Promise<httpRes<RES>> {
    return http('get', '/api/admin/news/unReadTotal', payload)
  }
}
