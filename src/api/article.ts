/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { articleType, httpRes } from '@/types/'
export default {
  // 获取文章列表
  getArticles(payload: any): Promise<httpRes> {
    return http.get('/api/front/article/gets', payload)
  },
  // 获取文章详情
  getArticle(payload: any): Promise<httpRes> {
    return http.get('/api/front/article/detail', payload)
  },
  // 存储文章
  saveArticle(payload: articleType): Promise<httpRes> {
    return http.get('/api/front/article/save', payload)
  }
}
