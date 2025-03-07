// 只导入需要的图标，而不是整个库
import { 
  BsHouse, BsBookmark, BsGear, BsFileText, BsGrid 
} from 'react-icons/bs';
import { MdDashboard, MdArticle } from 'react-icons/md';
import { FiSettings, FiMenu, FiUser } from 'react-icons/fi';
import { loadPageComponents, createComponentOptions } from '#/utils/componentLoader';

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
export const DEFAULT_ICONS_OPTIONS = createComponentOptions(DEFAULT_ICONS_MAP)

// 自动加载所有页面组件
export const DEFAULT_COMPONENTS_MAP = loadPageComponents(0);
export const DEFAULT_COMPONENTS_OPTIONS = createComponentOptions(DEFAULT_COMPONENTS_MAP);
