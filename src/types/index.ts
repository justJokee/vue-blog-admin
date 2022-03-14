export interface meta {
  // 是否顶级菜单
  asTopMenu?: boolean
  // 菜单名称
  name?: string
  // 图标
  icon?: any
  beMenu?: boolean
}
export interface httpRes {
  status: number
  data: any
  info: string
}
export interface articleSaveParams {
  publish: 0 | 1
}
export interface qiniuUploadParams {
  file: File
  // 文件名
  key: string
  token: string
}
declare global {
  interface Window {
    hljs: any
    qiniu: any
  }
}
export type metaAlias = meta | undefined
