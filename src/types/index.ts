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

export interface articleType {
  original: number
  title: string
  abstract: string
  publish: number
  tags: string[]
}
// 文章目录
export interface catalogField {
  level: number
  level_tree: number
  name: string
  order: number | string
  tempId: string
  children: Array<catalogField>
}
// dom/html-string 中解析出的目录一维tree
export interface flatTree {
  name: string
  level: number
}
declare global {
  interface Window {
    hljs: any
    qiniu: any
  }
}
export type metaAlias = meta | undefined
