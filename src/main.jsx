import './index.css'
import { createRoot } from 'react-dom/client'
import App from '#/components/App'
import useThemeStore from '#/store/theme'
import ErrorBoundary from '#/components/ErrorBoundary'
import { setupGlobalErrorHandlers } from '#/utils/setupErrorHandlers'
import useRoutesStore from './store/routes'
import '#/utils/globalInitial'

// 预加载路由配置
console.log(1)
useRoutesStore.getState().initRoutes()

// 初始化全局错误处理
setupGlobalErrorHandlers()

// 在渲染之前初始化主题和导航位置
useThemeStore.getState().initTheme()

createRoot(document.getElementById('root')).render(
  <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
    <App />
  </ErrorBoundary>
)
