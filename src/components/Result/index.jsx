import './styles.css'

export default function Result({ 
  icon: Icon,
  title = '开发中',
  subTitle = '该功能正在开发中，敬请期待...',
  extra
}) {
  return (
    <div className="result-wrapper">
      <div className="result-content">
        {Icon && (
          <div className="result-icon">
            <Icon />
          </div>
        )}
        
        <h1 className="result-title">{title}</h1>
        
        {subTitle && (
          <div className="result-subtitle">{subTitle}</div>
        )}
        
        {extra && (
          <div className="result-extra">{extra}</div>
        )}
      </div>
    </div>
  )
}