/**
 * @desc 数据库备份
 * @author justJokee
 */

import http from '@/http/'
type REQ = any
export default {
  // 获取文章列表
  mongodump<RES = any>(payload?: REQ): Promise<RES> {
    return http('post', '/api/admin/mongodump', payload, {
      responseType: 'blob'
    })
  }
}
