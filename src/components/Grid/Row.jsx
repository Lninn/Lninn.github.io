import React from 'react';
import './styles.css';

/**
 * 栅格行组件
 * @param {Object} props
 * @param {ReactNode} props.children - 子元素
 * @param {number} props.gutter - 栅格间隔
 * @param {string} props.className - 额外的类名
 * @param {Object} props.style - 自定义样式
 * @param {string} props.align - 垂直对齐方式，可选值: 'top', 'middle', 'bottom'
 * @param {string} props.justify - 水平排列方式，可选值: 'start', 'end', 'center', 'space-around', 'space-between'
 */
const Row = ({ 
  children, 
  gutter = 0, 
  className = '', 
  style = {},
  align = 'top',
  justify = 'start'
}) => {
  const rowStyle = {
    marginLeft: gutter ? -gutter / 2 : 0,
    marginRight: gutter ? -gutter / 2 : 0,
    ...style
  };
  
  return (
    <div 
      className={`row ${align ? `align-${align}` : ''} ${justify ? `justify-${justify}` : ''} ${className}`} 
      style={rowStyle}
    >
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

export default Row;