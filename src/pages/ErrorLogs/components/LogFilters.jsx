import './LogFilters.css'
import Select from '#/components/Select'

export function LogFilters({ filters, environments, onFilterChange }) {
  const envOptions = [
    { value: '', label: '所有环境' },
    ...environments.map(env => ({
      value: env,
      label: env
    }))
  ]

  return (
    <div className="filters-container">
      <div className="filters-wrapper">
        {/* 环境选择器 */}
        <div className="filter-item">
          <label className="filter-label">运行环境</label>
          <Select
            options={envOptions}
            value={filters.environment}
            onChange={value => onFilterChange('environment', value)}
            menuPosition="fixed" // 确保下拉菜单不被裁剪
          />
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

        {/* 搜索框独立成组 */}
        <div className="filter-item filter-item-search">
          <label className="filter-label">全局搜索</label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={e => onFilterChange('searchTerm', e.target.value)}
            placeholder="搜索错误信息、组件或用户..."
            className="filter-input search-input"
          />
        </div>
      </div>
    </div>
  )
}
