import article from './article'
import home from './home'
import category from './category'
import comments from './comments'
import msgboard from './msgboard'
import news from './news'
import user from './user'
import qiniu from './qiniu'

export default {
  ...article,
  ...qiniu,
  ...home,
  ...comments,
  ...category,
  ...msgboard,
  ...news,
  ...user
}
