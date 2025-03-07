import './index.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom'; // 导入 createPortal

/**
 * 现代化的 Select 组件
 * @param {Object} props 组件属性
 * @param {Array} props.options 选项数组，格式为 [{value: string, label: string}]
 * @param {string|number} props.value 当前选中的值
 * @param {Function} props.onChange 值变化时的回调函数
 * @param {string} props.placeholder 占位文本
 * @param {boolean} props.disabled 是否禁用
 * @param {string} props.error 错误信息
 * @param {string} props.className 自定义类名
 */
export default function Select({
  options = [],
  value,
  onChange,
  placeholder = '请选择',
  disabled = false,
  error,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  
  // 获取当前选中的选项
  const selectedOption = options.find(option => option.value === value);
  
  // 打开/关闭下拉菜单
  const toggleDropdown = useCallback(() => {
    if (!disabled) {
      if (!isOpen) {
        // 计算下拉框位置
        updateDropdownPosition();
      }
      setIsOpen(prev => !prev);
    }
  }, [disabled, isOpen]);
  
  // 更新下拉框位置
  const updateDropdownPosition = useCallback(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      setDropdownPosition({
        top: rect.bottom + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width // 使用触发元素的宽度
      });
    }
  }, []);
  
  // 选择选项
  const handleSelect = useCallback((option) => {
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  }, [onChange]);
  
  // 处理键盘导航
  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
        if (isOpen && focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex]);
        } else {
          toggleDropdown();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          updateDropdownPosition();
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
        }
        break;
      case ' ': // 空格键
        if (!isOpen) {
          e.preventDefault();
          updateDropdownPosition();
          setIsOpen(true);
        }
        break;
      default:
        break;
    }
  }, [disabled, isOpen, focusedIndex, options, handleSelect, toggleDropdown, updateDropdownPosition]);
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // 监听窗口大小变化，更新下拉框位置
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, updateDropdownPosition]);
  
  // 当下拉菜单打开时，滚动到选中的选项
  useEffect(() => {
    if (isOpen && dropdownRef.current && selectedOption) {
      const selectedElement = dropdownRef.current.querySelector('.selected');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, selectedOption]);
  
  // 当焦点索引改变时，确保焦点项可见
  useEffect(() => {
    if (isOpen && dropdownRef.current && focusedIndex >= 0) {
      const focusedElement = dropdownRef.current.querySelectorAll('.select-option')[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, focusedIndex]);
  
  // 重置焦点索引当下拉菜单打开时
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, options, value]);
  
  // 渲染下拉框
  const renderDropdown = () => {
    if (!isOpen) return null;
    
    const dropdown = (
      <div 
        className="select-dropdown" 
        ref={dropdownRef} 
        role="listbox"
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`, // 直接使用计算好的宽度
        }}
      >
        {options.map((option, index) => (
          <div
            key={option.value}
            className={`select-option ${option.value === value ? 'selected' : ''} ${index === focusedIndex ? 'focused' : ''}`}
            onClick={() => handleSelect(option)}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </div>
        ))}
        {options.length === 0 && (
          <div className="select-option">无可用选项</div>
        )}
      </div>
    );
    
    return createPortal(dropdown, document.body);
  };
  
  return (
    <div className={className} ref={selectRef}>
      <div
        className={`select-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <div className={`select-value ${!selectedOption ? 'select-placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <div className={`select-icon ${isOpen ? 'open' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {renderDropdown()}
      
      {error && <div className="select-error-message">{error}</div>}
    </div>
  );
}