import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import './LogItem.css'

export function LogItem({ log }) {
  return (
    <div className="log-item">
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
  )
}