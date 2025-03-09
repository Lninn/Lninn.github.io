import React from 'react';
import Card from '#/components/Card';


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
        <div className="cached-files-list">
          {cachedFiles.map((file) => (
            <div key={file.id} className="cached-file-item">
              <div className="cache-info">
                <div className="cache-name">{file.fileName}</div>
                <div className="cache-date">
                  {new Date(file.timestamp).toLocaleString()}
                </div>
                <div className="cache-size">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
              <div className="cache-actions">
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
