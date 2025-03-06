import { FiPlus } from 'react-icons/fi'

// 确保使用 export 关键字导出组件
export function DashboardHeader({ onAddClick }) {
  return (
    <div className="dashboard-header">
      <div className="header-title">
        <h1>我的书签</h1>
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
