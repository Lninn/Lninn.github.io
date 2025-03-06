import { FiEdit2, FiTrash2, FiCopy } from 'react-icons/fi'
import './BookmarkItem.css'

export function BookmarkItem({ bookmark, onEdit, onDelete, onCopyUrl }) {
  return (
    <div className="bookmark-item">
      <div className="bookmark-icon-wrapper">
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
      
      <div className="bookmark-info">
        <h3 title={bookmark.name}>{bookmark.name}</h3>
        
        {bookmark.category && (
          <span className="category-tag">{bookmark.category}</span>
        )}
        
        <div className="url-container">
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title={bookmark.url}
          >
            {bookmark.url}
          </a>
          <button 
            className="copy-button" 
            onClick={() => onCopyUrl(bookmark.url)}
            title="复制链接"
          >
            <FiCopy />
          </button>
        </div>
      </div>
      
      <div className="bookmark-actions">
        <button 
          className="edit-button" 
          onClick={() => onEdit(bookmark)}
          title="编辑"
        >
          <FiEdit2 className="edit-icon" />
        </button>
        <button 
          className="delete-button" 
          onClick={() => onDelete(bookmark)}
          title="删除"
        >
          <FiTrash2 className="delete-icon" />
        </button>
      </div>
    </div>
  )
}