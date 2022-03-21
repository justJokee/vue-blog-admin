/**
 * @desc 文章操作
 * @author justJokee
 */

import http from '@/http/'
import { countSchema, deviceSchema, historySchema, httpRes } from '@/types/'

export default {
  // 获取文章列表
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
  }
}
