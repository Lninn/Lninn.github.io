import { useState, useEffect, useCallback } from 'react'
import { errorLogsApi } from '#/api/errorLogs'

export function useErrorLogs() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // 筛选状态
  const [filters, setFilters] = useState({
    environment: '',
    startDate: '',
    endDate: '',
    searchTerm: ''
  })

  // 获取环境列表
  const environments = [...new Set(logs.map(log => log.environment))]

  // 使用 useCallback 包装 fetchLogs 函数
  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await errorLogsApi.fetchLogs(filters)
      setLogs(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [filters]) // 添加 filters 作为依赖

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs]) // 依赖 fetchLogs

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  return {
    logs,
    isLoading,
    error,
    setError, // 导出 setError 以便外部组件使用
    filters,
    environments,
    updateFilter,
    fetchLogs
  }
}
