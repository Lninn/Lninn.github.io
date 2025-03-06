import { FiPlus, FiBookmark } from 'react-icons/fi'

export function DashboardHeader({ onAddClick, bookmarkCount, activeTab, onTabChange }) {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <div className="title-with-icon">
          <FiBookmark className="header-icon" />
          <h1>我的书签</h1>
          <span className="bookmark-counter">{bookmarkCount} 个</span>
        </div>
      </div>
      
      {onTabChange && (
        <div className="header-tabs">
          {/* 将 TabSelector 集成到 Header 中 */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => onTabChange('bookmarks')}
              title="书签列表"
            >
              <FiBookmark />
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => onTabChange('history')}
              title="历史记录"
            >
              <FiBookmark />
            </button>
          </div>
        </div>
      )}
      
      <div className="header-actions">
        <button className="add-button" onClick={onAddClick}>
          <span className="button-icon"><FiPlus /></span>
          添加书签
        </button>
      </div>
    </div>
  )
}
