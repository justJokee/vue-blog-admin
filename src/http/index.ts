import axios, { Method, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { httpMethods } from '@/types/'
import { getUserInfo, removeUserInfo } from '@/utils/auth'
import router from '@/router/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// request拦截器
axios.interceptors.request.use((config) => {
  // 添加 token
  const userInfo = getUserInfo()
  if (userInfo) {
    if (!config.headers) config.headers = {}
    config.headers.authorization = userInfo.token
  }
  return config
})
// response拦截器
axios.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    const errRes = JSON.parse(JSON.stringify(error))
    if (errRes && errRes.response && errRes.response.status === 500) {
      window.$message.error('内部服务错误')
    }
    return Promise.reject(error)
  }
)
function ajax<REQ, RES>(type: Method, url: string, options: REQ, axiosConfig: AxiosRequestConfig): Promise<RES> {
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url,
      baseURL: import.meta.env.PROD ? (import.meta.env.VITE_BASE_API as string) : undefined,
      params: ['get', 'delete'].includes(type) ? options : null,
      data: type !== 'get' ? qs.stringify(options) : null,
      ...axiosConfig
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status !== 200 && res.data.info) {
            // 鉴权失败相关操作
            if (res.data.status.toString().startsWith('4')) {
              window.$message.error(res.data.info)
              if (router.currentRoute.value.name !== 'login') {
                removeUserInfo()
                router.push({ name: 'login' })
              }
            } else window.$message.warning(res.data.info)
          }
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

export default function <REQ, RES>(
  method: httpMethods,
  url: string,
  options: REQ,
  axiosConfig: AxiosRequestConfig = {}
) {
  return ajax<REQ, RES>(method, url, options, axiosConfig)
}

// function _message(t, m) {
//   Message({
//     type: t,
//     message: m,
//     center: true
//   })
// }
