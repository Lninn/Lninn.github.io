import React from 'react';
import './UIComponents.css';


// 自定义统计数据组件 - 保留，因为这是特定于 AppleHealth 的实现
export const Statistic = ({ title, value, prefix, suffix }) => {
  return (
    <div className="custom-statistic">
      <div className="statistic-title">{title}</div>
      <div className="statistic-content">
        {prefix && <span className="statistic-prefix">{prefix}</span>}
        <span className="statistic-value">{value}</span>
        {suffix && <span className="statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};
