import { lazy } from 'react'
import { BsBookmark, BsFileText, BsGear, BsFlower1 } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { HiOutlinePuzzle } from 'react-icons/hi'

// 使用 lazy 进行代码分割
const BookmarkPage = lazy(() => import('#/pages/Bookmark'))
const ArticlePage = lazy(() => import('#/pages/Article'))
const DashboardPage = lazy(() => import('#/pages/Dashboard'))
const ErrorLogsPage = lazy(() => import('#/pages/ErrorLogs'))
const ComponentDemoPage = lazy(() => import('#/pages/ComponentDemo'))

export const ROUTES_CONFIG = [
  {
    path: '/bookmarks',
    name: '收藏夹',
    icon: BsBookmark,
    component: BookmarkPage
  },
  {
    path: '/articles',
    name: '博客文章',
    icon: BsFileText,
    component: ArticlePage,
    children: [
      {
        path: '/articles/tech',
        name: '技术专栏',
        icon: BsGear
      },
      {
        path: '/articles/life',
        name: '生活随笔',
        icon: BsFlower1
      }
    ]
  },
  {
    path: '/dashboard',
    name: '数据概览',
    icon: MdDashboard,
    component: DashboardPage
  },
  {
    path: '/error-logs',
    name: '系统日志',
    icon: VscError,
    component: ErrorLogsPage
  },
  {
    path: '/component-demo',
    name: 'UI组件库',
    icon: HiOutlinePuzzle,
    component: ComponentDemoPage
  }
]
