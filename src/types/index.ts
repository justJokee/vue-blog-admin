export * from './schema'
import echarts from 'echarts'
import { PieSeriesOption, LineSeriesOption } from 'echarts/charts'
import {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  // 数据集组件
  DatasetComponentOption,
  DataZoomComponentOption
} from 'echarts/components'
export interface meta {
  // 是否顶级菜单
  asTopMenu?: boolean
  // 菜单名称
  name?: string
  // 图标
  icon?: any
  beMenu?: boolean
  exclude?: boolean
}
export interface httpRes<T> {
  status: number
  data: T
  total?: number
  totalAll?: number
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
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | DataZoomComponentOption
>
declare global {
  interface Window {
    hljs: any
    qiniu: any
  }
}

export type metaAlias = meta | undefined
