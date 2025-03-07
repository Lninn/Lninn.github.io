import './LogFilters.css'
import { useState } from 'react'

export function LogFilters({ filters, environments, onFilterChange }) {
  const [expanded, setExpanded] = useState(false)
  
  const envOptions = [
    { value: '', label: '所有环境' },
    ...environments.map(env => ({
      value: env,
      label: env
    }))
  ]

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3 className="filters-title">筛选条件</h3>
        <button 
          className="filters-toggle" 
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? '收起' : '展开'} 
          <span className={`toggle-icon ${expanded ? 'expanded' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </div>

      <div className={`filters-wrapper ${expanded ? 'expanded' : ''}`}>
        {/* 搜索框 */}
        <div className="filter-item filter-item-search">
          <label className="filter-label">全局搜索</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={e => onFilterChange('searchTerm', e.target.value)}
              placeholder="搜索错误信息、组件或URL..."
              className="filter-input search-input"
            />
            {filters.searchTerm && (
              <button 
                className="search-clear-btn"
                onClick={() => onFilterChange('searchTerm', '')}
                aria-label="清除搜索"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* 环境选择器 */}
        <div className="filter-item">
          <label className="filter-label">运行环境</label>
          <select
            value={filters.environment}
            onChange={e => onFilterChange('environment', e.target.value)}
            className="filter-input"
          >
            {envOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 日期选择组 */}
        <div className="filter-item">
          <label className="filter-label">起始日期</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={e => onFilterChange('startDate', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-item">
          <label className="filter-label">截止日期</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={e => onFilterChange('endDate', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* 活跃筛选器标签 */}
      {(filters.environment || filters.startDate || filters.endDate || filters.searchTerm) && (
        <div className="active-filters">
          <span className="active-filters-label">已应用筛选:</span>
          <div className="filter-tags">
            {filters.environment && (
              <span className="filter-tag">
                环境: {filters.environment}
                <button 
                  className="tag-remove" 
                  onClick={() => onFilterChange('environment', '')}
                  aria-label="移除环境筛选"
                >×</button>
              </span>
            )}
            {filters.startDate && (
              <span className="filter-tag">
                开始: {filters.startDate}
                <button 
                  className="tag-remove" 
                  onClick={() => onFilterChange('startDate', '')}
                  aria-label="移除开始日期筛选"
                >×</button>
              </span>
            )}
            {filters.endDate && (
              <span className="filter-tag">
                结束: {filters.endDate}
                <button 
                  className="tag-remove" 
                  onClick={() => onFilterChange('endDate', '')}
                  aria-label="移除结束日期筛选"
                >×</button>
              </span>
            )}
            {filters.searchTerm && (
              <span className="filter-tag">
                搜索: {filters.searchTerm}
                <button 
                  className="tag-remove" 
                  onClick={() => onFilterChange('searchTerm', '')}
                  aria-label="移除搜索筛选"
                >×</button>
              </span>
            )}
            <button 
              className="clear-all-btn"
              onClick={() => {
                onFilterChange('environment', '');
                onFilterChange('startDate', '');
                onFilterChange('endDate', '');
                onFilterChange('searchTerm', '');
              }}
            >
              清除全部
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
