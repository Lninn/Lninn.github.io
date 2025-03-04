import './index.css'

import { useEffect, useState } from 'react'
import useBookmarkStore from '../../store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import SyncChangesModal from './SyncChangesModal'


export default function Dashboard() {

  const { list, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const [showAddModal, setShowAddModal] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const [showDiff, setShowDiff] = useState(false)

  const handleAdd = (newBookmark) => {
    setBookmarks(prev => [...prev, newBookmark])
  }

  const handleDelete = (url) => {
    setBookmarks(prev => prev.filter(item => item.url !== url))
  }

  const handleConfirmSync = async () => {
    // 这里需要后端API支持，暂时只是模拟
    console.log('Syncing changes:', bookmarks)
    setShowDiff(false)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>书签管理</h1>
        <div className="header-actions">
          <button 
            className="add-button"
            onClick={() => setShowAddModal(true)}
          >
            <span className="button-icon">+</span>
            添加书签
          </button>
          <button 
            className="sync-button"
            onClick={() => setShowDiff(true)}
          >
            <span className="button-icon">↑</span>
            同步更改
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="list-section">
          <div className="section-header">
            <h2>书签列表</h2>
            <span className="bookmark-count">{list.length} 个书签</span>
          </div>
          <div className="bookmark-list">
            {list.map(bookmark => (
              <div key={bookmark.url} className="bookmark-item">
                <div className="bookmark-icon-wrapper">
                  <img src={bookmark.icon} alt="" className="bookmark-icon" />
                </div>
                <div className="bookmark-info">
                  <h3>{bookmark.name}</h3>
                  <p className="category-tag">{bookmark.category}</p>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.url}
                  </a>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(bookmark.url)}
                  title="删除书签"
                >
                  <span className="delete-icon">×</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddBookmarkModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {showDiff && (
        <SyncChangesModal
          original={list}
          modified={bookmarks}
          onClose={() => setShowDiff(false)}
          onConfirm={handleConfirmSync}
        />
      )}
    </div>
  )
}
