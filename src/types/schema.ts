/**
 * @desc api schema
 * @author justJokee
 */
import type { Moment } from 'moment'
export interface userSchema {
  req: {
    account?: string
    password?: string
  }
  res: {
    uid?: string
    token?: string
    account?: string
    avatar?: string
    lastLoginTime?: Date
  }
}
export interface resetpwdSchema {
  req: {
    uid?: string
    oldPassword?: string
    password?: string
  }
  res: Record<string, any>
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
  req: never
  res: {
    _id: string
    name: string
    total: number
    createTime: Date
    updateTime: Date
  }
}
// 首页统计
export interface countSchema {
  req: never
  res: {
    total: {
      article: number | string
      visitor: number | string
      comment: number | string
      msgBoard: number | string
    }
  }
}

// 首页 访客设备统计
export interface deviceSchema {
  req: never
  res: {
    browser: Array<{ name: string; value: number }>
    system: Array<{ name: string; value: number }>
  }
}
export interface historySchema {
  req: {
    start: Date | number | Moment
    end: Date | number | Moment
  }
  res: {
    date: string
    value: number
  }
}
export interface articleSchema {
  req: {
    id?: any
    page?: number
    limit?: number
    articleId?: number
    categoryId?: string
    original?: number
    publish?: number
    content?: string | number
    excloudContent?: number
    editing?: number
    keyword?: string
  }
  res: {
    _id: string
    articleId: number
    categoryId: string
    original: number
    title: string
    abstract: string
    content: string
    headerPic: string
    publish: number
    tag: string[]
    commentNum: number
    likeNum: number
    pv: number
    editing: number
    createTime: Date
    updateTime: Date
  }
}

export interface commentSchema {
  req: {
    // _id?: string
    id?: string | string[]
    page?: number
    limit?: number
    articleId?: number | number[]
    keyword?: string
    name?: string
    imgUrl?: string
    email?: string
    content?: string
    link?: string
    like?: number
    aite?: string | null
    parentId?: string | null
  }
  res: {
    _id: string
    name: string
    imgUrl: string
    email: string
    content: string
    link: string
    like: number
    aite: string
    articleId: number
    date: Date
    parentId: string
    reply?: Array<commentSchema['res']>
  }
}
export interface msgBoardSchema {
  req: {
    id?: string | string[]
    page?: number
    limit?: number
    keyword?: string
    name?: string
    imgUrl?: string
    email?: string
    content?: string
    link?: string
    like?: number
    aite?: string | null
    parentId?: string | null
  }
  res: {
    _id: string
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
}

export interface newsSchema {
  req: {
    id?: string | string[]
    type?: 'pv' | 'msgboard' | 'comment'
    read?: number
  }
  res: {
    type: 'pv' | 'msgboard' | 'comment'
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
interface viewersSchema {
  ip: string
  count: number
  browser: string
  system: string
  date: Date
}

export interface viewersCountSchema {
  req: never
  res: {
    total: number
    latest: viewersSchema
  }
}

export interface qiniuSchema {
  req: {
    file: File
    // 文件名
    key: string
    token: string
  }
  res: {
    token: string
  }
}
