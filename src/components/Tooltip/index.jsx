import { useState, useRef, useEffect } from 'react';
import './styles.css';

/**
 * 提示框组件
 * @param {Object} props
 * @param {ReactNode} props.children - 触发提示的元素
 * @param {string|ReactNode} props.title - 提示内容
 * @param {string} props.placement - 提示框位置，可选值: 'top', 'bottom', 'left', 'right'
 * @param {number} props.delay - 显示延迟(毫秒)
 */
const Tooltip = ({ 
  children, 
  title, 
  placement = 'top',
  delay = 0
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timerRef = useRef(null);
  
  // 处理鼠标进入事件
  const handleMouseEnter = () => {
    if (delay > 0) {
      timerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, delay);
    } else {
      setShowTooltip(true);
    }
  };
  
  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowTooltip(false);
  };
  
  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      {showTooltip && (
        <div className={`tooltip tooltip-${placement}`} ref={tooltipRef}>
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;