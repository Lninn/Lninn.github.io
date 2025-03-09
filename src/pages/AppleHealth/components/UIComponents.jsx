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

// 自定义行组件 - 保留，因为这是特定于 AppleHealth 的实现
export const Row = ({ children, gutter, className }) => {
  const style = {
    marginLeft: gutter ? -gutter / 2 : 0,
    marginRight: gutter ? -gutter / 2 : 0,
  };
  
  return (
    <div className={`custom-row ${className || ''}`} style={style}>
      {React.Children.map(children, child => {
        if (!child) return null;
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            paddingLeft: gutter ? gutter / 2 : 0,
            paddingRight: gutter ? gutter / 2 : 0,
          }
        });
      })}
    </div>
  );
};

// 自定义列组件 - 保留，因为这是特定于 AppleHealth 的实现
export const Col = ({ children, span, style }) => {
  const colStyle = {
    ...style,
    flex: `0 0 ${(span / 24) * 100}%`,
    maxWidth: `${(span / 24) * 100}%`,
  };
  
  return (
    <div className="custom-col" style={colStyle}>
      {children}
    </div>
  );
};

// 自定义日历图标 - 保留，因为这是特定于 AppleHealth 的实现
export const CalendarIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
};

// 自定义火焰图标 - 保留，因为这是特定于 AppleHealth 的实现
export const FireIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  );
};
