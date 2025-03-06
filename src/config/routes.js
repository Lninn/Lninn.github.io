import { lazy } from 'react'

// 使用 lazy 进行代码分割
const BookmarkPage = lazy(() => import('#/pages/Bookmark'))
const ArticlePage = lazy(() => import('#/pages/Article'))
const DashboardPage = lazy(() => import('#/pages/Dashboard'))
const ErrorLogsPage = lazy(() => import('#/pages/ErrorLogs'))

const ROUTES_CONFIG = [
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
    component: ArticlePage
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
  }
]

export const NAVIGATION_ITEMS = ROUTES_CONFIG

export default ROUTES_CONFIG
