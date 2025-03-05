import { lazy } from 'react'

// 使用 lazy 进行代码分割
const Bookmark = lazy(() => import('../components/Bookmark'))
const Article = lazy(() => import('../components/Article'))
const Dashboard = lazy(() => import('../components/Dashboard'))

// 统一的路由配置
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
  }
]

export const NAVIGATION_ITEMS = ROUTES_CONFIG

export default ROUTES_CONFIG
