/**
 * @desc 路由管控
 * @author justJokee
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store/'
import MpLayout from '@/views/Layout/mp-layout.vue'
import { meta } from '@/types/'
import { getUserInfo } from '@/utils/auth'
const login = () => import('@/views/Login/mp-login.vue')
const home = () => import('@/views/Home/mp-home.vue')
const articles = () => import('@/views/Articles/mp-articles.vue')
const comments = () => import('@/views/Comments/mp-comments.vue')
const messages = () => import('@/views/Messages/mp-messages.vue')
const news = () => import('@/views/News/mp-news.vue')
const doc = () => import('@/views/Write/mp-doc.vue')
const pwd = () => import('@/views/System/mp-db.vue')
const exportdb = () => import('@/views/System/mp-exportdb.vue')
interface metaType {
  meta?: meta
}
export type RouteRecordRawStrict = RouteRecordRaw & metaType
const routes: Array<RouteRecordRawStrict> = [
  {
    path: '/',
    redirect: '/login'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      name: '外链'
    }
  },
  // 首页
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '首页',
      asTopMenu: false
    },
    children: [
      // 文章管理
      {
        path: 'home',
        name: 'home',
        component: home,
        meta: {
          icon: 'el-icon-sunrise',
          name: '首页',
          customLayout: 1,
          pinLayout: 1
        }
      }
    ]
  },
  // 文章管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '文章管理',
      asTopMenu: false
    },
    children: [
      // 文章管理
      {
        path: 'articles',
        name: 'articles',
        component: articles,
        meta: {
          icon: 'el-icon-document',
          name: '文章列表'
        }
      }
    ]
  },
  // // 文章评论管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '文章评论管理',
      asTopMenu: false
    },
    children: [
      {
        path: 'comments/:articleId?',
        name: 'comments',
        component: comments,
        meta: {
          name: '文章评论',
          icon: 'el-icon-chat-dot-square'
        }
      }
    ]
  },
  // 留言管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '留言管理',
      icon: '',
      asTopMenu: false
    },
    children: [
      {
        path: 'messages',
        name: 'messages',
        component: messages,
        meta: {
          name: '留言',
          icon: 'el-icon-chat-line-round'
        }
      }
    ]
  },
  // 消息管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '消息管理',
      icon: '',
      asTopMenu: false
    },
    children: [
      {
        path: 'news',
        name: 'news',
        component: news,
        meta: {
          name: '消息',
          icon: 'el-icon-chat-line-round'
        }
      }
    ]
  },
  // 写作管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '文档',
      icon: '',
      asTopMenu: false
    },
    children: [
      {
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit',
          exclude: 1
        }
      }
    ]
  },
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '系统',
      icon: '',
      asTopMenu: true
    },
    children: [
      {
        path: 'pwd',
        name: 'pwd',
        component: pwd,
        meta: {
          name: '修改密码',
          icon: 'el-icon-edit'
        }
      },
      {
        path: 'exportdb',
        name: 'exportdb',
        component: exportdb,
        meta: {
          name: '数据备份',
          icon: 'el-icon-suitcase'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由拦截
router.beforeEach((to, from, next) => {
  // 白名单放行
  if (['login'].includes(to.name as string)) {
    next()
    return
  }
  //  缺少登录信息
  if (!store.state.userInfo.token || !getUserInfo()) {
    window.$message.error('token不存在或已失效')
    next({ name: 'login' })
    return
  }
  next()
})
export default router
