import './LogItem.css'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Modal from '#/components/Modal'
import { useState } from 'react'


export function LogItem({ log }) {
  const [showDetails, setShowDetails] = useState(false)
  
  // 截断长文本
  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }
  
  // 格式化时间
  const formattedTime = formatDistanceToNow(new Date(log.timestamp), {
    addSuffix: true,
    locale: zhCN
  })
  
  // 详情弹窗的页脚
  const modalFooter = (
    <button onClick={() => setShowDetails(false)}>关闭</button>
  )

  return (
    <>
      <div className="log-item">
        <div className="log-item-main">
          <div className="log-item-header">
            <div className="log-item-time">{formattedTime}</div>
            <div className="log-item-env">{log.environment}</div>
          </div>
          
          <div className="log-item-error">
            <div className="log-item-component">{log.component_info}</div>
            <div className="log-item-message">{truncateText(log.error)}</div>
          </div>
        </div>
        
        <div className="log-item-actions">
          <button 
            className="log-item-details-btn"
            onClick={() => setShowDetails(true)}
          >
            查看详情
          </button>
        </div>
      </div>
      
      {/* 详情弹窗 */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="错误日志详情"
        size="md"
        footer={modalFooter}
      >
        <div className="log-details">
          <div className="log-details-section">
            <h4>基本信息</h4>
            <div className="log-details-row">
              <span className="log-details-label">时间：</span>
              <span className="log-details-value">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <div className="log-details-row">
              <span className="log-details-label">环境：</span>
              <span className="log-details-value">{log.environment}</span>
            </div>
            <div className="log-details-row">
              <span className="log-details-label">组件：</span>
              <span className="log-details-value">{log.component_info}</span>
            </div>
          </div>
          
          <div className="log-details-section">
            <h4>错误信息</h4>
            <div className="log-details-error">{log.error}</div>
          </div>
          
          <div className="log-details-section">
            <h4>URL</h4>
            <div className="log-details-url">
              <a href={log.url} target="_blank" rel="noopener noreferrer">
                {log.url}
              </a>
            </div>
          </div>
          
          <div className="log-details-section">
            <h4>用户代理</h4>
            <div className="log-details-user-agent">{log.user_agent}</div>
          </div>
        </div>
      </Modal>
    </>
  )
}
