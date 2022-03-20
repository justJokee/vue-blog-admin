/**
 * @desc 扩展组件实例属性
 */
import api from '@/api/'
import echarts from 'echarts'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: typeof api
    $echarts: typeof echarts
  }
}
