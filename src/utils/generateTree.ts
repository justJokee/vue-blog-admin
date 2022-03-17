/**
 * @desc  将打平的用层级关系维护的树状数据，组装成树结构
 * @param {*} flatList
 * @param {*} options
 * @used  目前用于自动生成文章的目录结构
 * @returns Array
 * @author justJokee
 */

import { flatTree, generateTreeType } from '@/types/'
type completeTreeType = flatTree & generateTreeType
type flatTreeAfter = flatTree & { children?: Array<flatTreeAfter> }
interface optionsType {
  level: keyof flatTree
}

export function generateTree(flatList: Array<flatTree>, options: optionsType = { level: 'level' }) {
  const result: Array<flatTreeAfter> = []
  let stack: Array<flatTreeAfter> = []
  flatList.forEach((item: flatTreeAfter) => {
    // 栈为空，则直接入栈
    if (!stack.length) {
      item.children = []
      stack.push(item)
      result.push(item)
    } else {
      // 当前元素级别大于栈底元素，则倒序遍历栈，找到其父级并挂载
      if (item[options.level] > stack[0][options.level]) {
        stack.reverse().some((el) => {
          if (el[options.level] < item[options.level]) {
            if (!el.children) el.children = []
            el.children.push(item)
            return true
          }
        })
        stack.reverse()
        stack.push(item)
      }
      // 完成子树收集
      else {
        // 清空栈
        stack = []
        item.children = []
        stack.push(item)
        result.push(item)
      }
    }
  })
  const TResult: Array<completeTreeType> = addTreeLevel(result)
  return TResult
}
// 增加树层级
function addTreeLevel(tree: Array<flatTreeAfter>, level?: number, order?: number | string) {
  tree.forEach((catalog: any, index) => {
    if (!level) level = 0
    catalog.level_tree = level
    catalog.order = order ? order + '.' + (index + 1) : index + 1

    if (catalog.children && catalog.children.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      addTreeLevel(catalog.children, level + 1, catalog.order)
    }
  })
  return tree as Array<completeTreeType>
}
