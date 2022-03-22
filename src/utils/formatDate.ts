/**
 * @desc 时间格式化工具
 * @author justJokee
 */

import moment from 'moment'

export function formatDate(val: any) {
  return moment(val).format('YYYY-MM-DD HH:mm')
}
