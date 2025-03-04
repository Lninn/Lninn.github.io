import { useState } from 'react'
import './AddBookmarkModal.css'

export default function AddBookmarkModal({ onClose, onSubmit }) {
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
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="add-bookmark-modal">
        <div className="modal-header">
          <h2>添加新书签</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>分类</label>
            <input
              type="text"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>图标URL</label>
            <input
              type="text"
              value={formData.icon}
              onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>取消</button>
            <button type="submit" className="submit-button">添加</button>
          </div>
        </form>
      </div>
    </div>
  )
}