import { useState, useRef, useEffect } from 'react';
import './styles.css';

/**
 * 下拉选择器组件
 * @param {Object} props
 * @param {any} props.value - 当前选中的值
 * @param {Function} props.onChange - 值变化时的回调函数
 * @param {Array} props.options - 选项数组，每项包含 value 和 label
 * @param {Object} props.style - 自定义样式
 * @param {string} props.placeholder - 占位文本
 * @param {boolean} props.disabled - 是否禁用
 * @param {string} props.size - 尺寸，可选值: 'default', 'small', 'large'
 */
const Select = ({ 
  value, 
  onChange, 
  options = [], 
  style = {}, 
  placeholder = '请选择',
  disabled = false,
  size = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSelect = (optionValue) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };
  
  const selectedOption = options.find(option => option.value === value);
  const selectedLabel = selectedOption?.label || '';
  
  // 合并默认样式和传入的样式
  const mergedStyle = {
    minWidth: '120px',
    width: 'auto',
    display: 'inline-block',
    ...style
  };
  
  return (
    <div 
      className={`select-component ${size} ${disabled ? 'disabled' : ''}`} 
      style={mergedStyle} 
      ref={selectRef}
    >
      <div 
        className={`select-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="select-value">
          {selectedLabel || <span className="placeholder">{placeholder}</span>}
        </span>
        <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && !disabled && (
        <div className="select-dropdown">
          {options.length === 0 ? (
            <div className="select-empty">无选项</div>
          ) : (
            options.map((option, index) => (
              <div 
                key={`${option.value}-${index}`}
                className={`select-option ${option.value === value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;