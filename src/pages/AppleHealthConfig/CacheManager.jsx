import React from 'react';
import Card from '#/components/Card';
import './CacheManager.css'; // 添加样式文件引用

const CacheManager = ({ cachedFiles, onLoadCache, onDeleteCache, onClearAll, onClose }) => {
  return (
    <Card title="缓存管理" className="cache-manager-card">
      <div className="cache-controls">
        <button 
          className="clear-all-button" 
          onClick={onClearAll}
          disabled={cachedFiles.length === 0}
        >
          清除所有缓存
        </button>
        <button className="close-button" onClick={onClose}>关闭</button>
      </div>
      
      {cachedFiles.length === 0 ? (
        <div className="no-cache-message">没有缓存数据</div>
      ) : (
        <div className="cache-files-list">
          {cachedFiles.map(file => (
            <div key={file.id} className="cache-file-item">
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-meta">
                  <span className="file-size">{Math.round(file.size / 1024)} KB</span>
                  <span className="file-date">{new Date(file.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="file-actions">
                <button 
                  className="load-button"
                  onClick={() => onLoadCache(file.id)}
                >
                  加载
                </button>
                <button 
                  className="delete-button"
                  onClick={() => onDeleteCache(file.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CacheManager;
