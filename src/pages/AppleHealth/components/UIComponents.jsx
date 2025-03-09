import React, { useState, useRef, useEffect } from 'react';
import './UIComponents.css';

// 简易消息提示组件
export const Message = {
  error: (content) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'custom-message custom-message-error';
    messageDiv.innerHTML = `
      <span class="message-icon">❌</span>
      <span class="message-content">${content}</span>
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.classList.add('message-fade-out');
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 300);
    }, 3000);
  },
  
  success: (content) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'custom-message custom-message-success';
    messageDiv.innerHTML = `
      <span class="message-icon">✅</span>
      <span class="message-content">${content}</span>
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.classList.add('message-fade-out');
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 300);
    }, 3000);
  }
};

// 简易上传组件
export const Upload = {
  Dragger: ({ children, beforeUpload, disabled }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const handleDragOver = (e) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    };
    
    const handleDragLeave = () => {
      setIsDragging(false);
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      if (disabled) return;
      
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files[0]);
      }
    };
    
    const handleClick = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    
    const handleFileChange = (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        handleFiles(files[0]);
      }
    };
    
    const handleFiles = (file) => {
      if (beforeUpload) {
        beforeUpload(file);
      }
      // 清空文件输入，以便可以重复选择相同文件
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    return (
      <div 
        className={`custom-upload-dragger ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
          disabled={disabled}
        />
        {children}
      </div>
    );
  }
};

// 进度条组件
export const Progress = ({ percent }) => {
  // 确保百分比是有效数字
  const validPercent = Math.min(Math.max(0, percent || 0), 100);
  
  return (
    <div className="custom-progress">
      <div className="progress-outer">
        <div 
          className={`progress-inner ${validPercent < 100 ? 'active' : ''}`} 
          style={{ width: `${validPercent}%` }}
        />
      </div>
      <span className="progress-text">{validPercent}%</span>
    </div>
  );
};

// 简易卡片组件
export const Card = ({ title, children, className }) => {
  return (
    <div className={`custom-card ${className || ''}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
};

// 简易加载中组件
export const Spin = () => {
  return (
    <div className="custom-spin">
      <div className="spin-dot"></div>
    </div>
  );
};

// 简易收件箱图标组件
export const InboxIcon = () => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="48" 
      height="48" 
      fill="currentColor" 
      style={{ color: '#1890ff' }}
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-2h-2v2zm-4 0h2v-2H8v2zm8 0h2v-2h-2v2zm-8-4h8v-6H8v6z" />
    </svg>
  );
};

// 从 CustomComponents 添加的组件
// 自定义提示组件
export const Tooltip = ({ children, title }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  
  return (
    <div 
      className="custom-tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="custom-tooltip" ref={tooltipRef}>
          {title}
        </div>
      )}
    </div>
  );
};

// 自定义选择器组件
export const Select = ({ value, onChange, style, options }) => {
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
    onChange(optionValue);
    setIsOpen(false);
  };
  
  const selectedLabel = options.find(option => option.value === value)?.label || '';
  
  // 合并默认样式和传入的样式
  const mergedStyle = {
    minWidth: '120px',  // 设置最小宽度
    width: 'auto',      // 允许自动扩展
    display: 'inline-block', // 确保宽度自适应内容
    ...style
  };
  
  return (
    <div className="custom-select" style={mergedStyle} ref={selectRef}>
      <div 
        className="select-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="select-options">
          {options.map((option, i) => (
            <div 
              key={option.value + '' + i} 
              className={`select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 自定义统计数据组件
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

// 自定义行组件
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

// 自定义列组件
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

// 自定义日历图标
export const CalendarIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
};

// 自定义火焰图标
export const FireIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  );
};
