import './LogTable.css'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Modal from '#/components/Modal'

export function LogTable({ logs }) {
  const [selectedLog, setSelectedLog] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleRowClick = (log) => {
    setSelectedLog(log)
  }

  const modalFooter = (
    <button onClick={() => setSelectedLog(null)}>关闭</button>
  )

  return (
    <>
      <div className="log-table-wrapper">
        <table className="log-table">
          <thead>
            <tr>
              <th>时间</th>
              <th>环境</th>
              {!isMobile && <th>组件</th>}
              <th className={isMobile ? "mobile-error-header" : ""}>错误信息</th>
              {!isMobile && <th>URL</th>}
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} onClick={() => handleRowClick(log)}>
                <td>
                  <span title={new Date(log.timestamp).toLocaleString()}>
                    {formatDistanceToNow(new Date(log.timestamp), {
                      addSuffix: true,
                      locale: zhCN
                    })}
                  </span>
                </td>
                <td>
                  <span className="env-badge">{log.environment}</span>
                </td>
                {!isMobile && <td>{log.component_info}</td>}
                <td className={`error-cell ${isMobile ? "mobile-error-cell" : ""}`}>
                  {log.error}
                </td>
                {!isMobile && (
                  <td className="url-cell">
                    <a 
                      href={log.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                    >
                      {log.url}
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="错误日志详情"
        size="md"
        footer={modalFooter}
      >
        {selectedLog && (
          <div className="log-details">
            <div className="log-details-section">
              <h4>基本信息</h4>
              <div className="log-details-row">
                <span className="log-details-label">时间：</span>
                <span className="log-details-value">
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="log-details-row">
                <span className="log-details-label">环境：</span>
                <span className="log-details-value">{selectedLog.environment}</span>
              </div>
              <div className="log-details-row">
                <span className="log-details-label">组件：</span>
                <span className="log-details-value">{selectedLog.component_info}</span>
              </div>
            </div>
            
            <div className="log-details-section">
              <h4>错误信息</h4>
              <div className="log-details-error">{selectedLog.error}</div>
            </div>
            
            <div className="log-details-section">
              <h4>URL</h4>
              <div className="log-details-url">
                <a href={selectedLog.url} target="_blank" rel="noopener noreferrer">
                  {selectedLog.url}
                </a>
              </div>
            </div>
            
            <div className="log-details-section">
              <h4>用户代理</h4>
              <div className="log-details-user-agent">{selectedLog.user_agent}</div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
