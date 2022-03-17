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
  headerPic: string
  publish: number
  tag: string[]
  content: string
}
// generateTree 生成的树结构（一般结合flatTree字段返回最终业务数据结构）
export interface generateTreeType {
  level_tree: number
  order: number | string
  children: Array<catalogField>
}
// 文章目录
export type catalogField = generateTreeType & flatTree
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
