import React, { useState } from 'react';
import './styles.css';

/**
 * JSON 数据查看器组件
 * @param {Object} props
 * @param {string|Object} props.data - 要展示的 JSON 数据，可以是字符串或对象
 * @param {number} props.maxHeight - 最大高度，默认为 300px
 * @param {boolean} props.collapsible - 是否可折叠，默认为 true
 * @param {boolean} props.defaultExpanded - 默认是否展开，默认为 true
 */
const JsonViewer = ({ data, maxHeight = 300, collapsible = true, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // 格式化 JSON 数据
  const formatJSON = (jsonData) => {
    try {
      // 如果是字符串形式的 JSON，先解析
      const jsonObj = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      // 格式化为带缩进的字符串
      return JSON.stringify(jsonObj, null, 2);
    } catch (e) {
      // 如果解析失败，返回原始字符串
      console.error('JSON 解析失败:', e);
      return typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);
    }
  };

  // 尝试解析 JSON
  const formattedJSON = formatJSON(data);
  
  // 判断是否为有效的 JSON
  const isValidJSON = formattedJSON !== data || typeof data !== 'string';

  return (
    <div className="json-viewer-container">
      {collapsible && (
        <div className="json-viewer-header">
          <button 
            className={`json-viewer-toggle ${isExpanded ? 'expanded' : 'collapsed'}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '收起' : '展开'}
          </button>
        </div>
      )}
      
      {(isExpanded || !collapsible) && (
        <pre 
          className="json-viewer-content"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <code className={isValidJSON ? 'json-syntax' : ''}>
            {formattedJSON}
          </code>
        </pre>
      )}
    </div>
  );
};

export default JsonViewer;