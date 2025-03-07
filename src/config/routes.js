import { lazy } from 'react'

// 使用 lazy 进行代码分割
const BookmarkPage = lazy(() => import('#/pages/Bookmark'))
const ArticlePage = lazy(() => import('#/pages/Article'))
const DashboardPage = lazy(() => import('#/pages/Dashboard'))
const ErrorLogsPage = lazy(() => import('#/pages/ErrorLogs'))
const ComponentDemoPage = lazy(() => import('#/pages/ComponentDemo'))

export const ROUTES_CONFIG = [
  {
    path: '/bookmarks',
    name: '书签',
    icon: '📚',
    component: BookmarkPage
  },
  {
    path: '/articles',
    name: '文章',
    icon: '📝',
    component: ArticlePage,
    children: [
      {
        path: '/articles/tech',
        name: '技术',
        icon: '💻'
      },
      {
        path: '/articles/life',
        name: '生活',
        icon: '🌱'
      }
    ]
  },
  {
    path: '/dashboard',
    name: '仪表板',
    icon: '📈',
    component: DashboardPage
  },
  {
    path: '/error-logs',
    name: '错误日志',
    icon: '🔍',
    component: ErrorLogsPage
  },
  {
    path: '/component-demo',
    name: '组件演示',
    icon: '🧩',
    component: ComponentDemoPage
  }
]
