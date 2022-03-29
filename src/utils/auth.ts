/**
 * @desc 权限信息处理
 * @author justJokee
 */

import cookie from 'js-cookie'
const u_k: string = 'u-i'
// 设置登录信息
export function setUserInfo(info: any) {
  if (!info) return
  cookie.set(u_k, window.btoa(JSON.stringify(info)), {
    expires: new Date(Date.now() + 4 * 60 * 60 * 1000)
  })
}
// 获取登录信息
export function getUserInfo() {
  const info = cookie.get(u_k)
  if (info) {
    return JSON.parse(window.atob(info))
  }
}
// 清空登录信息
export function removeUserInfo() {
  cookie.remove(u_k)
}
