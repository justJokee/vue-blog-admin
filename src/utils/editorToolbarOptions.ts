/**
 * @desc quill 编辑器工具栏选项
 */

export default [
  // 加粗 斜体 下划线 删除线
  ['bold', 'italic', 'underline', 'strike'],
  // 引用  代码块
  ['blockquote', 'code-block'],
  // 1、2 级标题
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 上标/下标
  [{ script: 'sub' }, { script: 'super' }],
  // 缩进
  [{ indent: '-1' }, { indent: '+1' }],
  // 文本方向
  // [{'direction': 'rtl'}],
  // 字体大小
  [{ size: ['small', false, 'large', 'huge'] }],
  // 标题
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色
  [{ color: [] }, { background: [] }],
  // 字体种类
  [{ font: [] }],
  // 对齐方式
  [{ align: [] }],
  // 行内代码
  ['code'],
  // 清除文本格式
  ['clean'],
  // 清除文本格式
  ['link', 'image'] // 链接、图片
]
