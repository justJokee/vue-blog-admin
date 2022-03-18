/**
 * @desc api schema
 * @author justJokee
 */

export interface userSchema {
  user: string
  password: string
  lastLogin: string
  salt: string
}
export interface visitorsSchema {
  name: string
  imgUrl: string
  email: string
  link: string
  // 0: 自定义用户 1: qq 2: github
  type: number
  githubId: number
  qqOpenId: number
  date: Date
}
// 文章分类
export interface categorySchema {
  name: {
    type: string
    required: true
  }
  total: number
  createTime: Date
  updateTime: Date
}
export interface articleSchema {
  req: {
    page?: number
    limit?: number
    articleId?: number
    original?: number
    publish?: number
    excloudContent?: number
  }
  res: {
    articleId: number
    categoryId: string
    original: number
    title: string
    abstract: string
    content: string
    content_plain: string
    headerPic: string
    publish: number
    tag: string[]
    commentNum: number
    likeNum: number
    pv: number
    createTime: Date
    updateTime: Date
  }
}

export interface test {
  page?: number
  limit?: number
  articleId?: number
  original?: number
  publish?: number
  excloudContent?: number
}
export interface commentSchema {
  name: string
  imgUrl: string
  email: string
  content: string
  link: string
  like: number
  aite: string
  articleId: number
  title: string
  date: Date
  parentId: string
}
export interface msgBoardSchema {
  name: string
  imgUrl: string
  email: string
  content: string
  link: string
  like: number
  aite: string
  parentId: string
  date: Date
}

export interface newsSchema {
  type: string
  // 文章评论/留言板
  name: string
  ip: string
  lng: string
  lat: string
  date: Date
  // 国际区域
  nation: string
  // 省份
  province: string
  city: string
  // 区域
  district: string
  // 存储 _id
  articleId: string
  commentId: string
  leaveMessageId: string
  content: string
}
export interface commentIpSchema {
  ip: {
    type: string
    required: true
  }
  // 0: 留言 1: 文章评论 2: 文章赞
  type: {
    type: number
    required: true
  }
  msgid: string
  like: number
  createTime: Date
  updateTime: Date
}
