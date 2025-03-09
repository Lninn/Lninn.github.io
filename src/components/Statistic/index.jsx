import React from 'react';
import './styles.css';

/**
 * 统计数据展示组件
 * @param {Object} props
 * @param {string|ReactNode} props.title - 标题
 * @param {string|number|ReactNode} props.value - 数值内容
 * @param {ReactNode} props.prefix - 数值前缀
 * @param {ReactNode} props.suffix - 数值后缀
 * @param {string} props.valueStyle - 数值的自定义样式
 * @param {string} props.precision - 数值精度(保留小数位数)
 */
const Statistic = ({ 
  title, 
  value, 
  prefix, 
  suffix,
  valueStyle = {},
  precision
}) => {
  // 处理数值精度
  let formattedValue = value;
  if (typeof value === 'number' && precision !== undefined) {
    formattedValue = value.toFixed(precision);
  }
  
  return (
    <div className="statistic">
      {title && <div className="statistic-title">{title}</div>}
      <div className="statistic-content">
        {prefix && <span className="statistic-prefix">{prefix}</span>}
        <span className="statistic-value" style={valueStyle}>{formattedValue}</span>
        {suffix && <span className="statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

export default Statistic;