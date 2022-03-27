import article from './article'
import home from './home'
import category from './category'
import comments from './comments'
import qiniu from './qiniu'

export default {
  ...article,
  ...qiniu,
  ...home,
  ...comments,
  ...category
}
