import { FiBookmark, FiClock } from 'react-icons/fi'

export function TabSelector({ activeTab, onTabChange }) {
  return (
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
        <FiClock />
      </button>
    </div>
  )
}
