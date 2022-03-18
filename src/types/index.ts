export * from './schema'
export interface meta {
  // 是否顶级菜单
  asTopMenu?: boolean
  // 菜单名称
  name?: string
  // 图标
  icon?: any
  beMenu?: boolean
}
export interface httpRes<T> {
  status: number
  data: T
  info: string
}
export type httpMethods = 'get' | 'post' | 'put' | 'delete' | 'patch'
export interface qiniuUploadParams {
  file: File
  // 文件名
  key: string
  token: string
}
// 文章目录
// dom/html-string 中解析出的目录一维tree
export interface flatTree {
  name: string
  level: number
  level_tree?: number
  order?: number | string
  children?: flatTree[]
}
declare global {
  interface Window {
    hljs: any
    qiniu: any
  }
}

export type metaAlias = meta | undefined
