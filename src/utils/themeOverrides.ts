/**
 * @desc 覆盖naive部分组件样式
 * @author justJokee
 */

import { GlobalThemeOverrides } from 'naive-ui'
export const themeOverrides: GlobalThemeOverrides = {
  common: { primaryColor: '#fff532' },
  Button: { textColor: '#FF0000' },
  Menu: {
    groupTextColor: '#5d7dc6',
    itemTextColor: '#879dd2',
    itemColorActive: '#ebf1fe',
    itemTextColorActive: '#3FA3FF',
    itemTextColorHover: '#3FA3FF',
    itemIconColor: '#879dd2',
    itemIconColorHover: '#3FA3FF',
    itemIconColorActive: '#3FA3FF'
  },
  Card: {
    paddingMedium: '20px 20px 16px 20px',
    borderRadius: '14px',
    titleTextColor: '#4c4948'
  }
}
