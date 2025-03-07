import { logError, reportErrorToServer } from './errorHandler'

// 错误类型定义
const ERROR_TYPES = {
  RESOURCE: 'ResourceError',
  RUNTIME: 'RuntimeError',
  PROMISE: 'PromiseError'
}

// 资源类型定义
const RESOURCE_TYPES = ['IMG', 'SCRIPT', 'LINK']

// 统一的错误报告处理
function reportError(error, context) {
  logError(error, context)
  reportErrorToServer(error, context)
}

// 处理资源加载错误
function handleResourceError(event) {
  const { target } = event
  if (!target || !RESOURCE_TYPES.includes(target.tagName)) {
    return false
  }
  
  event.preventDefault()
  reportError({
    type: ERROR_TYPES.RESOURCE,
    message: `Failed to load ${target.tagName.toLowerCase()}: ${target.src || target.href}`,
    target: target.outerHTML
  }, '资源加载错误')
  
  return true
}

// 设置全局错误处理器
export function setupGlobalErrorHandlers() {
  // 处理资源加载错误和运行时错误
  window.addEventListener('error', (event) => {
    if (!handleResourceError(event)) {
      reportError({
        type: ERROR_TYPES.RUNTIME,
        error: event.error || {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      }, '全局未捕获错误')
    }
  }, true)

  // 处理未捕获的 Promise 异常
  window.addEventListener('unhandledrejection', (event) => {
    reportError({
      type: ERROR_TYPES.PROMISE,
      error: event.reason
    }, '未处理的Promise拒绝')
  })
}
