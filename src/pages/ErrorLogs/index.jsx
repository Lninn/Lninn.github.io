import './index.css'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { supabase } from '#/supabaseClient'


// TODO:
// - 按环境筛选
// - 按时间范围筛选
// - 搜索特定错误
// - 导出错误日志
// - 删除旧的错误记录等

export default function ErrorLogs() {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchErrorLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('error_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100)  // 限制加载最近100条记录

        if (error) throw error
        setLogs(data)
      } catch (err) {
        console.error('获取错误日志失败:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchErrorLogs()
  }, [])

  return (
    <div className="error-logs">
      <div className="section-header">
        <h2>错误日志</h2>
        <span className="log-count">
          {isLoading ? '加载中...' : `${logs.length} 条记录`}
        </span>
      </div>

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
