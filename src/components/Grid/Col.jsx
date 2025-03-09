import React from 'react';
import './styles.css';

/**
 * 栅格列组件
 * @param {Object} props
 * @param {ReactNode} props.children - 子元素
 * @param {number} props.span - 栅格占位格数，0-24
 * @param {number} props.offset - 栅格左侧的间隔格数
 * @param {Object} props.style - 自定义样式
 * @param {number} props.xs - <576px 响应式栅格
 * @param {number} props.sm - ≥576px 响应式栅格
 * @param {number} props.md - ≥768px 响应式栅格
 * @param {number} props.lg - ≥992px 响应式栅格
 * @param {number} props.xl - ≥1200px 响应式栅格
 */
const Col = ({ 
  children, 
  span = 24, 
  offset = 0,
  style = {},
  xs, sm, md, lg, xl
}) => {
  // 基础样式
  const colStyle = {
    ...style,
  };
  
  // 计算基础类名
  let className = 'col';
  
  // 添加基础span类
  if (span !== undefined) {
    className += ` col-${span}`;
  }
  
  // 添加偏移类
  if (offset > 0) {
    className += ` col-offset-${offset}`;
  }
  
  // 添加响应式类
  if (xs !== undefined) className += ` col-xs-${xs}`;
  if (sm !== undefined) className += ` col-sm-${sm}`;
  if (md !== undefined) className += ` col-md-${md}`;
  if (lg !== undefined) className += ` col-lg-${lg}`;
  if (xl !== undefined) className += ` col-xl-${xl}`;
  
  return (
    <div className={className} style={colStyle}>
      {children}
    </div>
  );
};

export default Col;