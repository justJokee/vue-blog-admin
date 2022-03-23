/**
 * @desc 文档分类
 * @author justJokee
 */

import http from '@/http/'
import { categorySchema, httpRes } from '@/types/'
type REQ = categorySchema['req']
export default {
  // 获取文章列表
  getCategory<RES = categorySchema['res']>(payload?: REQ): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/category/get', payload)
  }
}
