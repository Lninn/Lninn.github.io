import './index.css'

import { useEffect, useState } from 'react'
import useBookmarkStore from '../../store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import SyncChangesModal from './SyncChangesModal'
import { supabase } from '../../supabaseClient'
import Notification from '../Notification'

export default function Dashboard() {

  const { list: renderList, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const [bookmarks, setBookmarks] = useState([])
  const [showDiff, setShowDiff] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [notification, setNotification] = useState(null);

  const handleAdd = (newBookmark) => {
    setBookmarks(prev => [...prev, newBookmark])
  }

  const handleDelete = (url) => {
    setBookmarks(prev => prev.filter(item => item.url !== url))
  }

  const handleConfirmSync = async () => {
    insertBookmark(bookmarks)
    setShowDiff(false)
  }

  const insertBookmark = async (bookmarks) => {
    const newData = bookmarks.map(item => {
      return {
        ...item,
        id: renderList.length + 1
      }
    })

    const { data, error } = await supabase
      .from('bookmark')
      .insert(newData)
      .select()

    if (error) {
      setNotification({
        type: 'error',
        message: '书签同步失败，请稍后重试'
      });
    } else {
      setNotification({
        type: 'success',
        message: `成功同步 ${data.length} 个书签`
      });
    }
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
            <span className="bookmark-count">{renderList.length} 个书签</span>
          </div>
          <div className="bookmark-list">
            {renderList.map(bookmark => (
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
          original={[]}
          modified={bookmarks}
          onClose={() => setShowDiff(false)}
          onConfirm={handleConfirmSync}
        />
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
