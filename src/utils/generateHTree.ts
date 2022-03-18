import { flatTree } from '@/types/'
import { generateTree } from './generateTree'
/**
 * @desc 获取文档目录
 * @param html dom字符串
 * @returns
 * @author justJokee
 */
export default function (html: string) {
  const nodeList = html.match(/<h\d{1}\s*?>.*?<\/h\d{1}>/g)
  if (!nodeList) return []
  const flatTreeList = nodeList.map((node) => {
    const name = node.match(/<h\d{1}\s*?>([^<>]*)?<\/h\d{1}>/)
    return {
      level: parseInt((node.match(/<h(\d{1})\s*?>/) as RegExpExecArray)[1]),
      name: name ? name[1] : ''
    }
  })
  const catalogs = generateTree<flatTree>(flatTreeList, { prop: 'level' })
  return catalogs
}
