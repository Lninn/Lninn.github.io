import { supabase } from '../supabaseClient'


/**
 * 统一的错误处理工具
 */

// 记录错误到控制台
export const logError = (error, componentInfo = '') => {
  console.error(`[错误] ${componentInfo ? `在 ${componentInfo} 中` : ''}:`, error)
}

// 格式化错误信息
export const formatError = (error) => {
  if (!error) return '未知错误'
  
  if (typeof error === 'string') return error
  
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`
  }
  
  return JSON.stringify(error)
}

// 处理API错误
export const handleApiError = (error, fallbackMessage = '操作失败，请稍后重试') => {
  logError(error, 'API请求')
  
  // 可以根据错误类型返回不同的用户友好消息
  if (error?.status === 401) {
    return '请先登录后再尝试此操作'
  }
  
  if (error?.status === 403) {
    return '您没有权限执行此操作'
  }
  
  if (error?.status === 404) {
    return '请求的资源不存在'
  }
  
  return error?.message || fallbackMessage
}

// 上报错误到服务器（示例函数）
export const reportErrorToServer = async (error, componentInfo = '', userInfo = {}) => {
  try {
    const errorData = {
      error: formatError(error),
      component_info: componentInfo,
      user_info: userInfo,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE,
      url: window.location.href,
      user_agent: navigator.userAgent
    }

    const { error: supabaseError } = await supabase
      .from('error_logs')
      .insert([errorData])

    if (supabaseError) {
      console.error('错误上报失败:', supabaseError)
      return
    }

    console.log('错误已记录到数据库')
  } catch (reportError) {
    console.error('错误上报失败:', reportError)
  }
}
