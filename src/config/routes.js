import Bookmark from '../components/Bookmark'
import Article from '../components/Article'
import Dashboard from '../components/Dashboard'

// 统一的路由配置
const ROUTES_CONFIG = [
  {
    path: 'bookmark',
    name: '书签',
    icon: '📚',
    component: Bookmark
  },
  {
    path: 'log',
    name: '日志',
    icon: '📝',
    component: Article
  },
  {
    path: 'dashboard',
    name: '仪表板',
    icon: '📈',
    component: Dashboard
  }
]

// 为App组件提供的路由对象
export const ROUTES = ROUTES_CONFIG.reduce((acc, route) => {
  const key = route.path.toUpperCase()
  acc[key] = {
    path: route.path,
    component: route.component
  }
  return acc
}, {})

// 为AppHeader组件提供的导航项
export const NAVIGATION_ITEMS = ROUTES_CONFIG.map(route => ({
  path: route.path,
  name: route.name,
  icon: route.icon
}))

export default ROUTES_CONFIG