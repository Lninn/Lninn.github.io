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
  
  // 识别错误类型并提取关键信息
  let errorType = '资源加载错误'
  let errorMessage = `Failed to load ${target.tagName.toLowerCase()}: ${target.src || target.href}`
  let errorDetails = {}
  
  // 针对图片加载错误的特殊处理
  if (target.tagName === 'IMG') {
    errorType = '图片加载错误'
    
    // 从outerHTML中提取更多信息
    const html = target.outerHTML
    
    // 提取src属性
    const srcMatch = html.match(/src=["']([^"']*)["']/)
    const src = srcMatch ? srcMatch[1] : '未知源'
    
    // 提取alt属性
    const altMatch = html.match(/alt=["']([^"']*)["']/)
    const alt = altMatch ? altMatch[1] : ''
    
    // 提取class属性
    const classMatch = html.match(/class=["']([^"']*)["']/)
    const className = classMatch ? classMatch[1] : ''
    
    // 提取data-*属性
    const dataAttrs = {}
    const dataMatches = html.matchAll(/data-([^=]+)=["']([^"']*)["']/g)
    for (const match of dataMatches) {
      dataAttrs[match[1]] = match[2]
    }
    
    // 从URL中提取图片名称
    // eslint-disable-next-line no-useless-escape
    const imgNameMatch = src.match(/\/([^\/]+\.(jpg|jpeg|png|gif|svg|webp))($|\?)/i)
    const imgName = imgNameMatch ? imgNameMatch[1] : '未知图片'
    
    // 构建更具体的错误信息
    errorMessage = `图片加载失败: "${alt || imgName}"`
    
    // 收集详细信息
    errorDetails = {
      src,
      alt,
      className,
      dataAttributes: Object.keys(dataAttrs).length > 0 ? dataAttrs : undefined,
      dimensions: `${target.width}x${target.height}`,
      imgName
    }
  }
  
  reportError({
    type: ERROR_TYPES.RESOURCE,
    message: errorMessage,
    target: target.outerHTML,
    details: errorDetails
  }, errorType)
  
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
