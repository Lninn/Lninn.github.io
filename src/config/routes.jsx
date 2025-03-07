import { lazy, useEffect, useState } from 'react'
import { BsBookmark, BsFileText, BsGear, BsFlower1 } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { HiOutlinePuzzle } from 'react-icons/hi'
import { convertToRouteConfig } from '#/api/navigationApi'
import { Outlet } from 'react-router-dom'

// 使用 lazy 进行代码分割
const BookmarkPage = lazy(() => import('#/pages/Bookmark'))
const ArticlePage = lazy(() => import('#/pages/Article'))
const DashboardPage = lazy(() => import('#/pages/Dashboard'))
const ErrorLogsPage = lazy(() => import('#/pages/ErrorLogs'))
const ComponentDemoPage = lazy(() => import('#/pages/ComponentDemo'))
const PlaceholderPage = lazy(() => import('#/pages/PlaceholderPage'))
const NavConfigPage = lazy(() => import('#/pages/NavConfig'))

// 默认路由配置（当API请求失败时使用）
export const DEFAULT_ROUTES_CONFIG = [
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
    component: SubPageWrapper,
    children: [
      {
        name: '技术专栏',
        path: '/articles/tech',
        icon: BsGear,
        component: ArticlePage,
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
    component: SubPageWrapper,
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
      },
      {
        name: '导航配置',
        path: '/data-center/nav-config',
        icon: BsGear,
        component: NavConfigPage
      }
    ]
  },
]

function SubPageWrapper() {
  return <Outlet />
}

// 从API获取路由配置的钩子
export const useRoutesConfig = () => {
  const [routes, setRoutes] = useState(DEFAULT_ROUTES_CONFIG)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const apiRoutes = await convertToRouteConfig()
        if (apiRoutes && apiRoutes.length > 0) {
          setRoutes(apiRoutes)
        }
      } catch (err) {
        console.error('Failed to load routes from API:', err)
        setError(err)
        // 使用默认路由配置
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  return { routes, loading, error }
}

// 为了向后兼容，保留原有的导出
export const ROUTES_CONFIG = DEFAULT_ROUTES_CONFIG
