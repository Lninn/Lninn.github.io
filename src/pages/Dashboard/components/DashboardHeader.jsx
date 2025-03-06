import { FiPlus, FiBookmark } from 'react-icons/fi'

export function DashboardHeader({ onAddClick, bookmarkCount }) {
  return (
    <div className="dashboard-header">
      <div className="header-title">
        <div className="title-with-icon">
          <FiBookmark className="header-icon" />
          <h1>我的书签</h1>
          <span className="bookmark-counter">{bookmarkCount} 个</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="add-button" onClick={onAddClick}>
          <span className="button-icon"><FiPlus /></span>
          添加书签
        </button>
      </div>
    </div>
  )
}
