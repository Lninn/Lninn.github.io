import { BookmarkItem } from './BookmarkItem'

export function BookmarkList({ 
  bookmarks, 
  isLoading, 
  onEdit, 
  onDelete, 
  onCopyUrl 
}) {
  console.log('BookmarkList 渲染:', { isLoading, bookmarksLength: bookmarks?.length }) // 添加调试信息
  
  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>正在加载书签...</p>
      </div>
    )
  }
  
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p>暂无书签</p>
        <p className="empty-tip">点击"添加书签"按钮开始添加</p>
      </div>
    )
  }
  
  return (
    <div className="bookmark-list">
      {bookmarks.map(bookmark => (
        <BookmarkItem 
          key={bookmark.id} 
          bookmark={bookmark} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onCopyUrl={onCopyUrl}
        />
      ))}
    </div>
  )
}