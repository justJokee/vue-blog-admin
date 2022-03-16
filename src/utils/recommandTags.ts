/**
 * @desc 推荐标签
 * @author justJokee
 */

import { CascaderOption } from 'naive-ui'
export const recommandTags: Array<CascaderOption> = [
  {
    label: '语言',
    value: 'lang',
    // key: 'GGAM',
    children: [
      { label: 'html', value: 'html' },
      { label: 'css', value: 'css' },
      { label: 'javascript', value: 'javascript' },
      { label: 'nodejs', value: 'nodejs' },
      { label: 'java', value: 'java' },
      { label: 'less', value: 'less' },
      { label: 'sass', value: 'sass' },
      { label: 'php', value: 'php' },
      { label: 'pythen', value: 'pythen' },
      { label: 'typescript', value: 'typescript' },
      { label: 'ruby', value: 'ruby' },
      { label: 'c', value: 'c' },
      { label: 'c++', value: 'c++' },
      { label: 'objective-c', value: 'objective-c' },
      { label: 'asp.net', value: 'asp.net' },
      { label: 'perl', value: 'perl' }
    ]
  },
  {
    label: '平台框架',
    value: 'frame',
    // key: 'DFGF',
    children: [
      { label: 'vue', value: 'vue' },
      { label: 'angular', value: 'angular' },
      { label: 'react', value: 'react' },
      { label: 'express', value: 'express' },
      { label: 'jQuery', value: 'jQuery' },
      { label: 'axios', value: 'axios' },
      { label: 'Dojo', value: 'Dojo' },
      { label: 'prototype', value: 'prototype' },
      { label: 'Yui-ext', value: 'Yui-ext' },
      { label: 'laravel', value: 'laravel' },
      { label: 'spring', value: 'spring' },
      { label: 'koa', value: 'koa' },
      { label: 'ruby-on-rails', value: 'ruby-on-rails' },
      { label: 'struts', value: 'struts' }
    ]
  },
  {
    label: '服务器',
    value: 'server',
    // key: 'BQYY',
    children: [
      { label: 'nginx', value: 'nginx' },
      { label: 'apache', value: 'apache' },
      { label: 'tomcat', value: 'tomcat' },
      { label: 'linux', value: 'linux' },
      { label: 'windows', value: 'windows' },
      { label: 'ubuntu', value: 'ubuntu' },
      { label: 'centos', value: 'centos' },
      { label: 'unix', value: 'unix' },
      { label: 'docker', value: 'docker' }
    ]
  },
  {
    label: '数据库和缓存',
    value: 'db',
    // key: 'QFQN',
    children: [
      { label: 'mysql', value: 'mysql' },
      { label: 'mongodb', value: 'mongodb' },
      { label: 'nosql', value: 'nosql' },
      { label: 'oracle', value: 'oracle' },
      { label: 'redis', value: 'redis' },
      { label: 'sql', value: 'sql' }
    ]
  },
  {
    label: '开发工具',
    value: 'tools',
    // key: 'GGPA',
    children: [
      { label: 'git', value: 'git' },
      { label: 'github', value: 'github' },
      { label: 'chrome', value: 'chrome' },
      { label: 'sublime-text', value: 'sublime-text' },
      { label: 'eclipse', value: 'eclipse' },
      { label: 'ide', value: 'ide' },
      { label: 'xcode', value: 'xcode' },
      { label: 'vue-tools', value: 'vue-tools' },
      { label: 'visual-studio', value: 'visual-studio' }
    ]
  },
  {
    label: '浏览器',
    value: 'browser',
    // key: 'WHPQ',
    children: [
      { label: 'chrome', value: 'chrome' },
      { label: 'firefox', value: 'firefox' },
      { label: 'ie', value: 'ie' },
      { label: 'opera', value: 'opera' },
      { label: 'safari', value: 'safari' },
      { label: 'android', value: 'android' },
      { label: 'ios', value: 'ios' },
      { label: 'windows', value: 'windows' },
      { label: 'linux', value: 'linux' }
    ]
  }
]
