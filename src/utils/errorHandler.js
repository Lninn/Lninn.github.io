import { supabase } from '../supabaseClient'

// 错误队列及其配置
const ERROR_QUEUE = {
  items: [],
  maxSize: 100,
  retryAttempts: 3,
  retryDelay: 1000,
  isProcessing: false
}

// 格式化错误信息保持不变
export const formatError = (error) => {
  if (!error) return '未知错误'
  if (typeof error === 'string') return error
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`
  }
  return JSON.stringify(error)
}

// 处理单个错误上报
const processError = async (errorData, attempt = 1) => {
  try {
    const { error: supabaseError } = await supabase
      .from('error_logs')
      .insert([errorData])

    if (supabaseError) {
      throw supabaseError
    }
    return true
  } catch (err) {
    if (attempt < ERROR_QUEUE.retryAttempts) {
      await new Promise(resolve => setTimeout(resolve, ERROR_QUEUE.retryDelay * attempt))
      return processError(errorData, attempt + 1)
    }
    console.error('错误上报失败（已达到最大重试次数）:', err)
    return false
  }
}

// 处理错误队列
const processErrorQueue = async () => {
  if (ERROR_QUEUE.isProcessing || ERROR_QUEUE.items.length === 0) return

  ERROR_QUEUE.isProcessing = true

  try {
    const errorData = ERROR_QUEUE.items.shift()
    await processError(errorData)
  } finally {
    ERROR_QUEUE.isProcessing = false
    if (ERROR_QUEUE.items.length > 0) {
      scheduleNextProcess()
    }
  }
}

// 调度下一次处理
const scheduleNextProcess = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => processErrorQueue(), { timeout: 2000 })
  } else {
    setTimeout(processErrorQueue, 0)
  }
}

// 导出的错误上报函数
export const reportErrorToServer = (error, componentInfo = '', userInfo = {}) => {
  // 防止队列过大
  if (ERROR_QUEUE.items.length >= ERROR_QUEUE.maxSize) {
    console.warn('错误队列已满，丢弃新错误')
    return
  }

  const errorData = {
    error: formatError(error),
    component_info: componentInfo,
    user_info: typeof userInfo === 'object' ? JSON.stringify(userInfo) : String(userInfo),
    timestamp: new Date().toISOString(),
    environment: import.meta.env.MODE,
    url: window.location.href,
    user_agent: navigator.userAgent
  }

  ERROR_QUEUE.items.push(errorData)
  scheduleNextProcess()
}

// 其他导出函数保持不变
export const logError = (error, componentInfo = '') => {
  console.error(`[错误] ${componentInfo ? `在 ${componentInfo} 中` : ''}:`, error)
}

export const handleApiError = (error, fallbackMessage = '操作失败，请稍后重试') => {
  const errorType = getErrorType(error)
  logError(error, `API请求 - ${errorType}`)

  switch (errorType) {
    case ErrorTypes.AUTH:
      return '请先登录后再尝试此操作'
    case ErrorTypes.NETWORK:
      return '网络连接失败，请检查网络设置'
    case ErrorTypes.DATABASE:
      return '数据库操作失败，请稍后重试'
    case ErrorTypes.VALIDATION:
      return error?.message || '输入数据无效'
    default:
      return fallbackMessage
  }
}

// 添加错误类型枚举
export const ErrorTypes = {
  NETWORK: 'NETWORK',
  DATABASE: 'DATABASE',
  VALIDATION: 'VALIDATION',
  AUTH: 'AUTH',
  UNKNOWN: 'UNKNOWN'
}

function getErrorType(error) {
  if (error?.status === 401) return ErrorTypes.AUTH
  if (error?.message?.includes('network')) return ErrorTypes.NETWORK
  if (error?.code?.startsWith('23')) return ErrorTypes.DATABASE
  if (error?.code === 'VALIDATION') return ErrorTypes.VALIDATION
  return ErrorTypes.UNKNOWN
}
