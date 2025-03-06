import './index.css'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { errorLogsApi } from '#/api/errorLogs'

export default function ErrorLogs() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // 筛选状态
  const [environment, setEnvironment] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // 获取环境列表
  const environments = [...new Set(logs.map(log => log.environment))]

  const fetchLogs = async () => {
    try {
      setIsLoading(true)
      const data = await errorLogsApi.fetchLogs({
        environment,
        startDate,
        endDate,
        searchTerm
      })
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
  }, [environment, startDate, endDate, searchTerm])

  const handleExport = async () => {
    const blob = await errorLogsApi.exportLogs(logs)
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `错误日志_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleDeleteOld = async () => {
    if (!window.confirm('确定要删除30天前的错误记录吗？')) return
    
    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      await errorLogsApi.deleteLogs(thirtyDaysAgo.toISOString())
      fetchLogs()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="error-logs">
      <div className="section-header">
        <h2>错误日志</h2>
        <div className="header-actions">
          <span className="log-count">
            {isLoading ? '加载中...' : `${logs.length} 条记录`}
          </span>
          <button onClick={handleExport}>导出日志</button>
          <button onClick={handleDeleteOld}>清理旧记录</button>
        </div>
      </div>

      <div className="filters">
        <select 
          value={environment} 
          onChange={e => setEnvironment(e.target.value)}
        >
          <option value="">所有环境</option>
          {environments.map(env => (
            <option key={env} value={env}>{env}</option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="开始日期"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="结束日期"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="搜索错误信息..."
        />
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>正在加载错误日志...</p>
        </div>
      ) : (
        <div className="logs-list">
          {logs.map(log => (
            <div key={log.id} className="log-item">
              <div className="log-header">
                <span className="log-time">
                  {formatDistanceToNow(new Date(log.timestamp), {
                    addSuffix: true,
                    locale: zhCN
                  })}
                </span>
                <span className="log-environment">{log.environment}</span>
              </div>
              <div className="log-content">
                <div className="log-component">{log.component_info}</div>
                <div className="log-message">{log.error}</div>
                <div className="log-url">{log.url}</div>
              </div>
              <div className="log-footer">
                <span className="log-user-agent">{log.user_agent}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
