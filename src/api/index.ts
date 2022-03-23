import article from './article'
import home from './home'
import category from './category'
import qiniu from './qiniu'

export default {
  ...article,
  ...qiniu,
  ...home,
  ...category
}
