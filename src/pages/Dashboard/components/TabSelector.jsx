export function TabSelector({ activeTab, onTabChange }) {
  return (
    <div className="dashboard-tabs">
      <button 
        className={`tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
        onClick={() => onTabChange('bookmarks')}
      >
        我的书签
      </button>
      <button 
        className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
        onClick={() => onTabChange('history')}
      >
        历史记录
      </button>
    </div>
  )
}
