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
        <div className="filters-group">
          <div className="filter-item">
            <label className="filter-label">环境</label>
            <Select 
              options={envOptions}
              value={filters.environment} 
              onChange={value => onFilterChange('environment', value)}
              placeholder="选择环境"
              className="filter-select"
            />
          </div>

          <div className="filter-item">
            <label className="filter-label">开始日期</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={e => onFilterChange('startDate', e.target.value)}
              className="filter-input"
            />
          </div>
          
          <div className="filter-item">
            <label className="filter-label">结束日期</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={e => onFilterChange('endDate', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="filter-item filter-item-search">
          <input
            type="text"
            value={filters.searchTerm}
            onChange={e => onFilterChange('searchTerm', e.target.value)}
            placeholder="搜索错误信息..."
            className="filter-input search-input"
          />
        </div>
      </div>
    </div>
  )
}
