import { useEffect, useState } from 'react'
import useBookmarkStore from '../../store/bookmark'
import AddBookmarkModal from './AddBookmarkModal'
import './index.css'


export default function Dashboard() {

  const { bookmarkList, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [])
  const [showAddModal, setShowAddModal] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  // const [originalData, setOriginalData] = useState([])
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
            添加书签
          </button>
          <button 
            className="sync-button"
            onClick={() => setShowDiff(true)}
          >
            同步更改
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="list-section">
          <h2>书签列表</h2>
          <div className="bookmark-list">
            {bookmarkList.map(bookmark => (
              <div key={bookmark.url} className="bookmark-item">
                <img src={bookmark.icon} alt="" className="bookmark-icon" />
                <div className="bookmark-info">
                  <h3>{bookmark.name}</h3>
                  <p>{bookmark.category}</p>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    {bookmark.url}
                  </a>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(bookmark.url)}
                >
                  删除
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
        <div className="modal">
          <div className="modal-content">
            <h2>确认更改</h2>
            <DiffView original={bookmarkList} modified={bookmarks} />
            <div className="modal-actions">
              <button onClick={handleConfirmSync}>确认</button>
              <button onClick={() => setShowDiff(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


function BookmarkForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    category: '',
    icon: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ url: '', name: '', category: '', icon: '' })
  }

  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="URL"
          value={formData.url}
          onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="名称"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="分类"
          value={formData.category}
          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="图标URL"
          value={formData.icon}
          onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          required
        />
      </div>
      <button type="submit">添加书签</button>
    </form>
  )
}

function DiffView({ original, modified }) {
  return (
    <div className="diff-view">
      <div className="diff-column">
        <h3>原数据</h3>
        <pre>{JSON.stringify(original, null, 2)}</pre>
      </div>
      <div className="diff-column">
        <h3>新数据</h3>
        <pre>{JSON.stringify(modified, null, 2)}</pre>
      </div>
    </div>
  )
}
