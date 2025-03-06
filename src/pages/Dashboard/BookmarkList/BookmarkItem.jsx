import { FiCopy, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi'
import './BookmarkItem.css'

export function BookmarkItem({ bookmark, onEdit, onDelete, onCopyUrl }) {
  const domain = bookmark.url ? new URL(bookmark.url).hostname.replace('www.', '') : '';
  
  return (
    <div className="bookmark-card">
      <div className="bookmark-card-header">
        <div className="bookmark-icon-container">
          {bookmark.icon ? (
            <img 
              src={bookmark.icon} 
              alt={bookmark.name} 
              className="bookmark-icon" 
              onError={(e) => e.target.src = '/favicon.ico'}
            />
          ) : (
            <div className="bookmark-icon-placeholder"></div>
          )}
        </div>
        
        <div className="bookmark-title-container">
          <h3 title={bookmark.name}>{bookmark.name}</h3>
          <div className="bookmark-meta-info">
            <span className="bookmark-domain">{domain}</span>
            {bookmark.category && (
              <span className="category-tag">{bookmark.category}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="bookmark-card-body">
        <div className="bookmark-url-container">
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title={bookmark.url}
            className="bookmark-url"
          >
            {bookmark.url}
          </a>
        </div>
      </div>
      
      <div className="bookmark-card-footer">
        <div className="bookmark-meta">
          <span className="bookmark-date">
            {bookmark.created_at && new Date(bookmark.created_at).toLocaleDateString('zh-CN')}
          </span>
        </div>
        
        <div className="bookmark-actions">
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-button visit-button"
            title="访问网站"
          >
            <FiExternalLink />
          </a>
          
          <button 
            className="action-button copy-button" 
            onClick={() => onCopyUrl(bookmark.url)}
            title="复制链接"
          >
            <FiCopy />
          </button>
          
          <button 
            className="action-button edit-button" 
            onClick={() => onEdit(bookmark)}
            title="编辑书签"
          >
            <FiEdit2 />
          </button>
          
          <button 
            className="action-button delete-button" 
            onClick={() => onDelete(bookmark)}
            title="删除书签"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  )
}
