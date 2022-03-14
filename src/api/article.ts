/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { articleSaveParams, httpRes } from '@/types/'
export default {
  // 获取文章列表
  getArticles(payload: any): Promise<httpRes> {
    return http.get('/api/front/article/gets', payload)
  },
  // 存储文章
  saveArticle(payload: articleSaveParams): Promise<httpRes> {
    return http.get('/api/front/article/save', payload)
  }
}
