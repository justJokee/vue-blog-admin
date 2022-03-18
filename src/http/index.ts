import axios, { Method } from 'axios'
import qs from 'qs'
import { httpMethods } from '@/types/'
// import { errorCode } from '@/utils/errorCode'
// import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//response拦截器
axios.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const errRes = JSON.parse(JSON.stringify(error))
    if (errRes && errRes.response && errRes.response.status === 500) {
      // _message('warning', '服务器错误')
    }
    return Promise.reject(error)
  }
)
function ajax<REQ, RES>(type: Method, url: string, options: REQ): Promise<RES> {
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url,
      baseURL: import.meta.env.PROD ? (import.meta.env.VITE_BASE_API as string) : undefined,
      params: type === 'get' ? options : null,
      data: type !== 'get' ? qs.stringify(options) : null
    })
      .then((res) => {
        if (res.status === 200) {
          // errorCode(res.data.status)
          resolve(res.data)
        } else {
          reject('request error in ' + url)
        }
      })
      .catch((err) => {
        console.error(err, url)
        reject(err)
      })
  })
}

export default function <REQ, RES>(method: httpMethods, url: string, options: REQ) {
  return ajax<REQ, RES>(method, url, options)
}

// function _message(t, m) {
//   Message({
//     type: t,
//     message: m,
//     center: true
//   })
// }
