import { FiPlus, FiBookmark, FiClock } from 'react-icons/fi'

export function DashboardHeader({ onAddClick, activeTab, onTabChange }) {
  return (
    <div className="dashboard-header">
      <div className="header-main">
        {onTabChange && (
          <div className="header-tabs">
            <div className="dashboard-tabs">
              <button 
                className={`tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
                onClick={() => onTabChange('bookmarks')}
                title="书签列表"
              >
                <FiBookmark />
                <span className="tab-label">书签</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => onTabChange('history')}
                title="历史记录"
              >
                <FiClock />
                <span className="tab-label">历史</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="header-actions">
        {activeTab === 'bookmarks' && (
          <button className="add-button" onClick={onAddClick}>
            <span className="button-icon"><FiPlus /></span>
            添加书签
          </button>
        )}
      </div>
    </div>
  )
}
