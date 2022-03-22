/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { countSchema, deviceSchema, historySchema, commentSchema, viewersCountSchema, httpRes } from '@/types/'

export default {
  // 资源统计
  count<RES = countSchema['res']>(payload?: countSchema['req']): Promise<httpRes<RES>> {
    return http('get', '/api/admin/count', payload)
  },
  // 获取访客设备信息
  getDevice<RES = deviceSchema['res']>(payload?: deviceSchema['req']): Promise<httpRes<RES>> {
    return http('get', '/api/front/viewer/getDevice', payload)
  },
  // 获取访客历史记录
  getHistory<RES = historySchema['res']>(payload: historySchema['req']): Promise<httpRes<RES[]>> {
    return http('get', '/api/admin/viewer/history', payload)
  },
  // 获取访客历史记录
  getComments<RES = commentSchema['res']>(payload: commentSchema['req']): Promise<httpRes<RES[]>> {
    return http('get', '/api/front/comments/get', payload)
  },
  // 获取访客历史记录
  getViewersCount<RES = viewersCountSchema['res']>(payload?: viewersCountSchema['req']): Promise<httpRes<RES>> {
    return http('get', '/api/front/admin/count', payload)
  }
}
