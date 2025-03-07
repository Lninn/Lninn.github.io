import './LogFilters.css'
import Select from '#/components/Select'

export function LogFilters({ filters, environments, onFilterChange }) {
  // 构造 Select 组件所需的 options 数组
  const envOptions = [
    { value: '', label: '所有环境' },
    ...environments.map(env => ({
      value: env,
      label: env
    }))
  ]

  return (
    <div className="filters">
      <Select 
        options={envOptions}
        value={filters.environment} 
        onChange={value => onFilterChange('environment', value)}
        placeholder="选择环境"
      />

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
