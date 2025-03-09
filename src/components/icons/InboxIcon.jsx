import React from 'react';

/**
 * 收件箱图标组件
 * @param {Object} props
 * @param {string} props.color - 图标颜色
 * @param {string|number} props.size - 图标大小
 */
const InboxIcon = ({ color = '#1890ff', size = 24 }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      style={{ color }}
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-2h-2v2zm-4 0h2v-2H8v2zm8 0h2v-2h-2v2zm-8-4h8v-6H8v6z" />
    </svg>
  );
};

export default InboxIcon;