import { lazy } from 'react'

// 使用 lazy 进行代码分割
const Bookmark = lazy(() => import('../pages/Bookmark'))
const Article = lazy(() => import('../pages/Article'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const ErrorLogs = lazy(() => import('../pages/ErrorLogs'))

const ROUTES_CONFIG = [
  {
    path: '/bookmark',
    name: '书签',
    icon: '📚',
    component: Bookmark
  },
  {
    path: '/log',
    name: '日志',
    icon: '📝',
    component: Article
  },
  {
    path: '/dashboard',
    name: '仪表板',
    icon: '📈',
    component: Dashboard
  },
  {
    path: '/error-logs',
    name: '错误日志',
    icon: '🔍',
    component: ErrorLogs
  }
]

export const NAVIGATION_ITEMS = ROUTES_CONFIG

export default ROUTES_CONFIG
