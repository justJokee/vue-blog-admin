export interface meta {
  // 是否顶级菜单
  asTopMenu?: boolean
  // 菜单名称
  name?: string
  // 图标
  icon?: string
  beMenu?: boolean
}

export type metaAlias = meta | undefined
