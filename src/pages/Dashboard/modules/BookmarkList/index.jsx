import './index.css'
import { BookmarkItem } from './BookmarkItem'
import LoadingSpinner from '#/components/LoadingSpinner'


export default function BookmarkList({ 
  bookmarks, 
  isLoading, 
  onEdit, 
  onDelete, 
  onCopyUrl 
}) {
  if (isLoading) {
    return (<LoadingSpinner text="正在加载书签..."/>)
  }
  
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="list-section">
        <div className="empty-state">
          <p>暂无书签</p>
          <p className="empty-tip">点击"添加书签"按钮开始添加</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="list-section">
      <div className="section-header">
        <h2>书签列表</h2>
        <span className="item-count">{bookmarks.length} 个书签</span>
      </div>
      <div className="bookmark-list bookmark-list-wrap">
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
    </div>
  )
}
