import './index.css'

import { useEffect, useState } from 'react'
import useBookmarkStore from '../../store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import { supabase } from '../../supabaseClient'
import Notification from '../Notification'

export default function Dashboard() {

  const { list: renderList, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  // 移除 bookmarks 和 showDiff 状态
  const [showAddModal, setShowAddModal] = useState(false)
  const [notification, setNotification] = useState(null);

  // 直接添加书签到数据库
  const handleAdd = async (newBookmark) => {
    try {
      // 生成唯一ID：时间戳 + 随机数
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      
      const { error } = await supabase
        .from('bookmark')
        .insert([{
          ...newBookmark,
          id: uniqueId,
          create_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        setNotification({
          type: 'error',
          message: '添加书签失败，请稍后重试'
        });
      } else {
        setNotification({
          type: 'success',
          message: '成功添加书签'
        });
        // 刷新书签列表
        fetchBookmarks();
      }
    } catch (err) {
      console.log(err)
      setNotification({
        type: 'error',
        message: '添加书签失败，请稍后重试'
      });
    }
  }

  const handleDelete = async (url) => {
    try {
      const { error } = await supabase
        .from('bookmark')
        .delete()
        .eq('url', url)

      if (error) {
        setNotification({
          type: 'error',
          message: '删除书签失败，请稍后重试'
        });
      } else {
        setNotification({
          type: 'success',
          message: '成功删除书签'
        });
        // 刷新书签列表
        fetchBookmarks();
      }
    } catch (err) {
      console.log(err)
      setNotification({
        type: 'error',
        message: '删除书签失败，请稍后重试'
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
                  <img 
                    src={bookmark.icon} 
                    alt="" 
                    className="bookmark-icon" 
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/fallback-icon.png';
                    }}
                  />
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
