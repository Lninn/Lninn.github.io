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
const PlaceholderPage = lazy(() => import('#/pages/PlaceholderPage'))

export const ROUTES_CONFIG = [
  {
    name: '收藏夹',
    path: '/bookmarks',
    icon: BsBookmark,
    component: BookmarkPage
  },
  {
    name: '博客文章',
    path: '/articles',
    icon: BsFileText,
    component: ArticlePage,
    children: [
      {
        name: '技术专栏',
        path: '/articles/tech',
        icon: BsGear,
        component: () => <PlaceholderPage title="技术专栏" />
      },
      {
        name: '生活随笔',
        path: '/articles/life',
        icon: BsFlower1,
        component: () => <PlaceholderPage title="生活随笔" />
      }
    ]
  },
  {
    name: '数据概览',
    path: '/dashboard',
    icon: MdDashboard,
    component: DashboardPage
  },
  {
    name: '系统日志',
    path: '/error-logs',
    icon: VscError,
    component: ErrorLogsPage
  },
  {
    name: '数据中心',
    path: '/data-center',
    icon: HiOutlinePuzzle,
    component: ComponentDemoPage,
    children: [
      {
        name: '组件演示',
        path: '/data-center/component-demo',
        icon: BsGear,
        component: ComponentDemoPage
      },
      {
        name: '系统设置',
        path: '/data-center/system-settings',
        icon: BsFlower1,
        component: () => <PlaceholderPage title="系统设置" />
      }
    ]
  },
]
