// 只导入需要的图标，而不是整个库
import { 
  BsHouse, BsBookmark, BsGear, BsFileText, BsGrid 
} from 'react-icons/bs';
import { MdDashboard, MdArticle } from 'react-icons/md';
import { FiSettings, FiMenu, FiUser } from 'react-icons/fi';
import { lazy } from 'react';

export const DEFAULT_ICONS_MAP = {
  "BsHouse": BsHouse,
  "BsBookmark": BsBookmark,
  "BsGear": BsGear,
  "BsFileText": BsFileText,
  "BsGrid": BsGrid,
  "MdDashboard": MdDashboard,
  "MdArticle": MdArticle,
  "FiSettings": FiSettings,
  "FiMenu": FiMenu,
  "FiUser": FiUser
}
export const DEFAULT_ICONS_OPTIONS = createOptions(DEFAULT_ICONS_MAP)

export const DEFAULT_COMPONENTS_MAP = {
  'test': lazy(() => import('#/pages/NavConfig')),
  'BookmarkPage': lazy(() => import('#/pages/Bookmark')),
  'ArticlePage': lazy(() => import('#/pages/Article')),
  'DashboardPage': lazy(() => import('#/pages/Dashboard')),
  'ErrorLogsPage': lazy(() => import('#/pages/ErrorLogs')),
  'ComponentDemoPage': lazy(() => import('#/pages/ComponentDemo')),
  'PlaceholderPage': lazy(() => import('#/pages/NavConfig'))
}
export const DEFAULT_COMPONENTS_OPTIONS = createOptions(DEFAULT_COMPONENTS_MAP)

function createOptions(map) {
  const options = []

  for (const key in map) {
    if (Object.hasOwnProperty.call(map, key)) {
      const option = {
        label: key,
        value: key
      }
      options.push(option)
    }
  }

  return options
}
