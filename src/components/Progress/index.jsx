import './styles.css';

/**
 * 进度条组件
 * @param {Object} props
 * @param {number} props.percent - 进度百分比(0-100)
 * @param {string} props.status - 状态，可选值: 'normal', 'success', 'exception'
 * @param {boolean} props.showInfo - 是否显示进度数值或状态图标
 * @param {string} props.strokeColor - 进度条颜色
 */
const Progress = ({ 
  percent, 
  status = 'normal', 
  showInfo = true, 
  strokeColor 
}) => {
  // 确保百分比是有效数字
  const validPercent = Math.min(Math.max(0, percent || 0), 100);
  
  // 根据状态和进度确定实际状态
  const getStatus = () => {
    if (status !== 'normal') return status;
    return validPercent >= 100 ? 'success' : 'normal';
  };
  
  const currentStatus = getStatus();
  
  return (
    <div className="progress-component">
      <div className="progress-outer">
        <div 
          className={`progress-inner ${currentStatus}`}
          style={{ 
            width: `${validPercent}%`,
            backgroundColor: strokeColor
          }}
        />
      </div>
      
      {showInfo && (
        <span className="progress-text">
          {validPercent}%
        </span>
      )}
    </div>
  );
};

export default Progress;