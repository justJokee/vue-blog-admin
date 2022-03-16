import { catalogField } from '@/types/'
import { generateTree } from './generateTree'
/**
 * @desc 获取文档目录
 * @param html dom字符串
 * @returns
 * @author justJokee
 */
export default function (html: string): Array<catalogField> {
  const nodeList = html.match(/<h\d{1}\s*?>.*?<\/h\d{1}>/g)
  if (!nodeList) return []
  const flatTree = nodeList.map((node) => {
    const name = node.match(/<h\d{1}\s*?>([^<>]*)?<\/h\d{1}>/)
    return {
      level: parseInt((node.match(/<h(\d{1})\s*?>/) as RegExpExecArray)[1]),
      name: name ? name[1] : ''
    }
  })
  const catalogs: Array<catalogField> = generateTree(flatTree)
  return catalogs
}
