import './index.css'
import { useState, useEffect } from 'react'
import useBookmarkStore from '#/store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import EditBookmarkModal from './EditBookmarkModal'
import Notification from '#/components/Notification'
import BookmarkList from './BookmarkList'
import HistoryList from './HistoryList'
import { useNotification } from '#/hooks/useNotification'
import { useBookmarkActions } from '#/hooks/useBookmarkActions'
import { DashboardHeader } from './components/DashboardHeader'
import ErrorBoundary from '#/components/ErrorBoundary'
import PageContainer from '#/components/PageContainer'

export default function Dashboard() {
  // 状态管理
  const [isLoading, setIsLoading] = useState(true)
  const { list: bookmarkList, fetchBookmarks } = useBookmarkStore()
  const [activeTab, setActiveTab] = useState('bookmarks')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  
  // 使用自定义 Hook
  const { notification, notify, clearNotification } = useNotification()
  const { 
    addBookmark, 
    updateBookmark, 
    deleteBookmark, 
    copyUrl 
  } = useBookmarkActions(fetchBookmarks, notify)
  
  // 初始加载书签
  useEffect(() => {
    const loadBookmarks = async () => {
      setIsLoading(true)
      try {
        await fetchBookmarks()
      } catch (error) {
        console.error('加载书签失败:', error)
        notify('error', '加载书签失败')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadBookmarks()
  }, [])
  
  // 处理书签操作
  const handleAddBookmark = async (newBookmark) => {
    await addBookmark(newBookmark)
    setShowAddModal(false)
  }
  
  const handleEditBookmark = async (updatedBookmark) => {
    await updateBookmark(updatedBookmark)
    setEditingBookmark(null)
  }
  
  const handleDeleteBookmark = async (bookmark) => {
    if (window.confirm(`确定要删除书签 "${bookmark.name}" 吗？`)) {
      await deleteBookmark(bookmark)
    }
  }
  
  // 处理历史记录恢复
  const handleRestoreBookmark = async () => {
    await fetchBookmarks()
    notify('success', '书签已恢复')
  }
  
  return (
    <ErrorBoundary>
      <PageContainer className="dashboard">
        <DashboardHeader 
          onAddClick={() => setShowAddModal(true)}
          bookmarkCount={bookmarkList?.length || 0}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="dashboard-content">
          {activeTab === 'bookmarks' ? (
            <BookmarkList 
              bookmarks={bookmarkList}
              isLoading={isLoading}
              onEdit={setEditingBookmark}
              onDelete={handleDeleteBookmark}
              onCopyUrl={copyUrl}
            />
          ) : (
            <HistoryList 
              onRestore={handleRestoreBookmark}
              onNotify={notify}
            />
          )}
        </div>
        
        {/* 添加书签模态框 */}
        {showAddModal && (
          <AddBookmarkModal 
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddBookmark}
          />
        )}
        
        {/* 编辑书签模态框 */}
        {editingBookmark && (
          <EditBookmarkModal 
            bookmark={editingBookmark}
            onClose={() => setEditingBookmark(null)}
            onSubmit={handleEditBookmark}
          />
        )}
        
        {/* 通知组件 */}
        {notification && (
          <Notification 
            type={notification.type}
            message={notification.message}
            onClose={clearNotification}
          />
        )}
      </PageContainer>
    </ErrorBoundary>
  )
}
