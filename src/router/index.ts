/**
 * @desc 路由管控
 * @author justJokee
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MpLayout from '@/views/Layout/mp-layout.vue'
import { meta } from '@/types/'
import { ArticleOutlined, ChatBubbleOutlineTwotone, SnapchatRound, EditCalendarTwotone } from '@vicons/material'
const login = () => import('@/views/Login/mp-login.vue')
const articles = () => import('@/views/Articles/mp-articles.vue')
const comments = () => import('@/views/Comments/mp-comments.vue')
const messages = () => import('@/views/Messages/mp-messages.vue')
const write = () => import('@/views/Write/mp-write.vue')
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
    component: login
  },
  // 文章管理
  {
    path: '/view',
    name: 'layout',
    component: MpLayout,
    meta: {
      name: '文章管理',
      icon: ArticleOutlined,
      asTopMenu: true
    },
    children: [
      // 文章管理
      {
        path: 'articles',
        name: 'articles',
        component: articles,
        meta: {
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
          icon: ChatBubbleOutlineTwotone
        }
      }
    ]
  },
  // // 留言管理
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
          icon: SnapchatRound
        }
      }
    ]
  },
  // // 写作管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '写作',
      icon: '',
      asTopMenu: false
    },
    children: [
      {
        path: 'write',
        name: 'write',
        component: write,
        meta: {
          name: '写作',
          icon: EditCalendarTwotone
        }
      }
    ]
  }
]

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
