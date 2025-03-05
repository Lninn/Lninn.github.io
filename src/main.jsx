import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import useThemeStore from './store/theme'
import ErrorBoundary from './components/ErrorBoundary'
import { logError, reportErrorToServer } from './utils/errorHandler'

// 添加全局错误处理
window.addEventListener('error', (event) => {
  logError(event.error, '全局错误')
  reportErrorToServer(event.error, '全局未捕获错误')
})

window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, '未处理的Promise拒绝')
  reportErrorToServer(event.reason, '未处理的Promise拒绝')
})

// 在渲染之前初始化主题和导航位置
useThemeStore.getState().initTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
