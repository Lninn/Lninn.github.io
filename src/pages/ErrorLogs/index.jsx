import './index.css'
import { useState } from 'react'
import { useErrorLogs } from '#/hooks/useErrorLogs'
import { errorLogsApi } from '#/api/errorLogs'
import { LogFilters } from './components/LogFilters'
import { LogItem } from './components/LogItem'
import { DeleteConfirmModal } from './components/DeleteConfirmModal'
import { LogTable } from './components/LogTable'

export default function ErrorLogs() {
  const { 
    logs, 
    isLoading, 
    error, 
    filters, 
    environments, 
    updateFilter,
    fetchLogs,
    setError
  } = useErrorLogs()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteDate, setDeleteDate] = useState(30)

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
    try {
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - deleteDate)
      await errorLogsApi.deleteLogs(daysAgo.toISOString())
      setShowDeleteModal(false)
      fetchLogs()
    } catch (err) {
      console.error('Error deleting logs:', err)
      // 使用 useErrorLogs 中的 setError 方法
      setError(err.message || '删除日志失败')
      setShowDeleteModal(false)
    }
  }

  const [viewMode, setViewMode] = useState('card') // 'card' 或 'table'

  return (
    <>
      <div className="error-logs">
        <div className="section-header">
          <div className="section-header-main">
            <h2>错误日志</h2>
            <div className="view-toggle">
              <button 
                className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="卡片视图"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="表格视图"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="header-actions">
            <span className="log-count">
              {isLoading ? '加载中...' : `${logs.length} 条记录`}
            </span>
            <div className="action-buttons">
              <button onClick={handleExport}>导出日志</button>
              <button 
                className="danger-outline" 
                onClick={() => setShowDeleteModal(true)}
              >
                删除历史日志
              </button>
            </div>
          </div>
        </div>

        <LogFilters 
          filters={filters}
          environments={environments}
          onFilterChange={updateFilter}
        />

        {error && (
          <div className="error-message">{error}</div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>正在加载错误日志...</p>
          </div>
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="logs-list">
                {logs.length > 0 ? (
                  logs.map(log => <LogItem key={log.id} log={log} />)
                ) : (
                  <div className="no-logs">
                    <p>没有找到符合条件的错误日志</p>
                  </div>
                )}
              </div>
            ) : (
              <LogTable logs={logs} />
            )}
          </>
        )}

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteOld}
          deleteDate={deleteDate}
          onDateChange={setDeleteDate}
        />
      </div>
    </>
  )
}
