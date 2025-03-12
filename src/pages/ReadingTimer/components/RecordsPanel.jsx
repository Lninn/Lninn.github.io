import { useState } from 'react';
import './RecordsPanel.css'

export default function RecordsPanel({ records, stats, onClear, onClose }) {
  const [view, setView] = useState('records'); // 'records' 或 'stats'

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 格式化时间（分钟）
  const formatMinutes = (minutes) => {
    if (minutes < 60) {
      return `${minutes} 分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} 小时 ${mins} 分钟`;
  };

  return (
    <div className="records-panel">
      <div className="records-header">
        <h3>阅读记录</h3>
        <div className="records-tabs">
          <button 
            className={`tab-button ${view === 'records' ? 'active' : ''}`}
            onClick={() => setView('records')}
          >
            详细记录
          </button>
          <button 
            className={`tab-button ${view === 'stats' ? 'active' : ''}`}
            onClick={() => setView('stats')}
          >
            统计数据
          </button>
        </div>
        <button className="close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {view === 'records' ? (
        <div className="records-list">
          {records.length === 0 ? (
            <div className="no-records">暂无阅读记录</div>
          ) : (
            <>
              {records.map(record => (
                <div key={record.id} className="record-item">
                  <div className="record-date">{formatDate(record.timestamp)}</div>
                  <div className="record-details">
                    <div>专注时间: {formatMinutes(record.focusTime)}</div>
                    <div>完成周期: {record.cycles} 个</div>
                    <div>模式: {record.mode === 'focus' ? '专注' : record.mode === 'break' ? '短休息' : '长休息'}</div>
                  </div>
                </div>
              ))}
              <button className="clear-records-button" onClick={onClear}>
                清除所有记录
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="stats-view">
          <div className="stat-item">
            <div className="stat-label">总专注时间</div>
            <div className="stat-value">{formatMinutes(stats.totalFocusTime)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">总阅读次数</div>
            <div className="stat-value">{stats.totalSessions} 次</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">总完成周期</div>
            <div className="stat-value">{stats.totalCycles} 个</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">平均专注时间</div>
            <div className="stat-value">{formatMinutes(stats.averageFocusTime)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
