/**
 * @desc 路由管控
 * @author justJokee
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MpLayout from '@/views/Layout/mp-layout.vue'
import { meta } from '@/types/'
const login = () => import('@/views/Login/mp-login.vue')
const home = () => import('@/views/Home/mp-home.vue')
const articles = () => import('@/views/Articles/mp-articles.vue')
const comments = () => import('@/views/Comments/mp-comments.vue')
const messages = () => import('@/views/Messages/mp-messages.vue')
const doc = () => import('@/views/Write/mp-doc.vue')
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
  // 首页
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
        path: 'home',
        name: 'home',
        component: home,
        meta: {
          icon: 'el-icon-document',
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
      asTopMenu: true
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
          icon: 'el-icon-chat-line-round'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
        }
      }
    ]
  },
  //
  //

  //

  //  // // 写作管理
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
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
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作',
          icon: 'el-icon-edit'
        }
      }
    ]
  },
  // // 写作管理
  {
    path: '/view',
    component: MpLayout,
    meta: {
      name: '写作777',
      icon: '',
      asTopMenu: false
    },
    children: [
      {
        path: 'doc/:articleId?',
        name: 'doc',
        component: doc,
        meta: {
          name: '写作666',
          icon: 'el-icon-edit'
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
