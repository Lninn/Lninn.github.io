import './LogFilters.css'
export function LogFilters({ filters, environments, onFilterChange }) {
  return (
    <div className="filters">
      <select 
        value={filters.environment} 
        onChange={e => onFilterChange('environment', e.target.value)}
      >
        <option value="">所有环境</option>
        {environments.map(env => (
          <option key={env} value={env}>{env}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={e => onFilterChange('startDate', e.target.value)}
        placeholder="开始日期"
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={e => onFilterChange('endDate', e.target.value)}
        placeholder="结束日期"
      />

      <input
        type="text"
        value={filters.searchTerm}
        onChange={e => onFilterChange('searchTerm', e.target.value)}
        placeholder="搜索错误信息..."
      />
    </div>
  )
}