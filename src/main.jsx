import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import useThemeStore from './store/theme'
import ErrorBoundary from './components/ErrorBoundary'
import { logError, reportErrorToServer } from './utils/errorHandler'

// 添加全局错误处理
window.addEventListener('error', (event) => {
  // 处理资源加载错误
  if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
    event.preventDefault()
    const resourceError = {
      type: 'ResourceError',
      message: `Failed to load ${event.target.tagName.toLowerCase()}: ${event.target.src || event.target.href}`,
      target: event.target.outerHTML
    }
    logError(resourceError, '资源加载错误')
    reportErrorToServer(resourceError, '资源加载错误')
    return
  }

  // 处理 JavaScript 运行时错误
  logError(event.error, '全局错误')
  reportErrorToServer(event.error, '全局未捕获错误')
}, true) // 添加 true 参数以启用捕获阶段

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
