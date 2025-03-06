import { useState, useEffect } from 'react'
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

  const fetchLogs = async () => {
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
  }

  useEffect(() => {
    fetchLogs()
  }, [filters])

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return {
    logs,
    isLoading,
    error,
    filters,
    environments,
    updateFilter,
    fetchLogs
  }
}