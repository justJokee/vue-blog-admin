/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { articleSchema, httpRes } from '@/types/'
type REQ = articleSchema['req']
export default {
  // 获取文章列表
  getArticles<RES = articleSchema['res']>(payload: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/article/gets', payload)
  },
  // 获取文章详情
  getArticle<RES = articleSchema['res']>(payload: REQ): Promise<httpRes<RES>> {
    return http('get', '/api/front/article/detail', payload)
  },
  // 存储文章
  saveArticle<RES = articleSchema['res']>(payload: REQ): Promise<httpRes<RES>> {
    return http('post', '/api/admin/article/save', payload)
  }
}
