import './index.css'

import { useEffect, useState } from 'react'
import useBookmarkStore from '#/store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import EditBookmarkModal from './EditBookmarkModal'
import Notification from '#/components/Notification'
import HistoryList from './HistoryList'
import { bookmarkApi } from '#/api/bookmark' // 使用 # 别名导入 bookmarkApi

export default function Dashboard() {
  // 添加加载状态
  const [isLoading, setIsLoading] = useState(true)
  const { list: renderList, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    // console.log('Dashboard component mount.')
    const loadBookmarks = async () => {
      setIsLoading(true)
      await fetchBookmarks()
      setIsLoading(false)
    }
    loadBookmarks()
  }, [])

  // 移除 bookmarks 和 showDiff 状态
  const [showAddModal, setShowAddModal] = useState(false)
  const [notification, setNotification] = useState(null);

  // 添加复制URL功能
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setNotification({
          type: 'success',
          message: 'URL已复制到剪贴板'
        });
      })
      .catch(() => {
        setNotification({
          type: 'error',
          message: '复制失败，请手动复制'
        });
      });
  }

  // 修改现有的操作方法，使用 bookmarkApi
  const handleAdd = async (newBookmark) => {
    try {
      await bookmarkApi.create(newBookmark)
      
      setNotification({
        type: 'success',
        message: '成功添加书签'
      })
      fetchBookmarks()
    } catch (err) {
      console.log(err)
      setNotification({
        type: 'error',
        message: '添加书签失败，请稍后重试'
      });
    }
  }

  const handleDelete = async (bookmark) => {
    try {
      await bookmarkApi.delete(bookmark)
      
      setNotification({
        type: 'success',
        message: '成功删除书签'
      })
      fetchBookmarks()
    } catch (err) {
      console.error(err)
      setNotification({
        type: 'error',
        message: '删除书签失败'
      })
    }
  }

  // 添加编辑相关状态
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)

  // 处理编辑按钮点击
  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark)
    setShowEditModal(true)
  }

  // 处理更新书签
  const handleUpdate = async (updatedBookmark) => {
    try {
      await bookmarkApi.update(updatedBookmark)
      
      setNotification({
        type: 'success',
        message: '成功更新书签'
      })
      fetchBookmarks()
    } catch (err) {
      console.error(err)
      setNotification({
        type: 'error',
        message: '更新书签失败'
      })
    }
    setShowEditModal(false)
    setEditingBookmark(null)
  }

  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${!showHistory ? 'active' : ''}`}
          onClick={() => setShowHistory(false)}
        >
          书签列表
        </button>
        <button 
          className={`tab-button ${showHistory ? 'active' : ''}`}
          onClick={() => setShowHistory(true)}
        >
          操作历史
        </button>
      </div>

      <div className="dashboard-content">
        {!showHistory ? (
          <div className="list-section">
            <div className="section-header">
              <h2>书签列表</h2>
              <div className="header-actions">
                <button 
                  className="add-button" 
                  onClick={() => setShowAddModal(true)}
                >
                  <span className="button-icon">+</span>
                  添加书签
                </button>
                <span className="bookmark-count">
                  {isLoading ? '加载中...' : `${renderList.length} 个书签`}
                </span>
              </div>
            </div>
            
            {isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>正在加载书签...</p>
              </div>
            ) : (
              <div className="bookmark-list">
                {renderList.map(bookmark => (
                  <div key={bookmark.url} className="bookmark-item">
                    <div className="bookmark-icon-wrapper">
                      <img
                        data-name={bookmark.name}
                        data-category={bookmark.category}
                        src={bookmark.icon} 
                        alt="" 
                        className="bookmark-icon" 
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/fallback-icon.svg';
                        }}
                      />
                    </div>
                    <div className="bookmark-info">
                      <h3>{bookmark.name}</h3>
                      <p className="category-tag">{bookmark.category}</p>
                      <div className="url-container">
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                          {bookmark.url}
                        </a>
                        <button 
                          className="copy-button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCopyUrl(bookmark.url);
                          }}
                          title="复制URL"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="bookmark-actions">
                      <button 
                        className="edit-button"
                        onClick={() => handleEdit(bookmark)}
                        title="编辑书签"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(bookmark)}
                        title="删除书签"
                      >
                        <span className="delete-icon">×</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <HistoryList 
            onRestore={fetchBookmarks}
            onNotify={setNotification}
          />
        )}
      </div>

      {showAddModal && (
        <AddBookmarkModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {showEditModal && editingBookmark && (
        <EditBookmarkModal
          bookmark={editingBookmark}
          onClose={() => {
            setShowEditModal(false)
            setEditingBookmark(null)
          }}
          onSubmit={handleUpdate}
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
