import axios, { Method } from 'axios'
import qs from 'qs'
import { httpRes } from '@/types/'
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
function ajax(type: Method, url: string, options: any): Promise<httpRes> {
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
const config = {
  get(url: string, options: any): Promise<httpRes> {
    return new Promise((resolve, reject) => {
      ajax('get', url, options)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  post(url: string, options: any) {
    return new Promise((resolve, reject) => {
      ajax('post', url, options)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  patch(url: string, options: any) {
    return new Promise((resolve, reject) => {
      ajax('patch', url, options)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  put(url: string, options: any) {
    return new Promise((resolve, reject) => {
      ajax('put', url, options)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  delete(url: string, options: any) {
    return new Promise((resolve, reject) => {
      ajax('delete', url, options)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

// function _message(t, m) {
//   Message({
//     type: t,
//     message: m,
//     center: true
//   })
// }

export default config
