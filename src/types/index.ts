export interface meta {
  // 是否顶级菜单
  asTopMenu?: boolean
  // 菜单名称
  name?: string
  // 图标
  icon?: any
  beMenu?: boolean
}
declare global {
  interface Window {
    hljs: any
  }
}
export type metaAlias = meta | undefined
