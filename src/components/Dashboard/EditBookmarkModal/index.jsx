import { useState, useEffect } from 'react'
import '../AddBookmarkModal/index.css'
import useBookmarkStore from '../../../store/bookmark'

export default function EditBookmarkModal({ bookmark, onClose, onSubmit }) {
  const { list: bookmarkList } = useBookmarkStore()
  const [formData, setFormData] = useState({
    name: bookmark.name,
    category: bookmark.category
  })
  const [categories, setCategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  useEffect(() => {
    if (bookmarkList && bookmarkList.length > 0) {
      // 从现有书签中提取唯一的分类列表
      const uniqueCategories = [...new Set(bookmarkList.map(item => item.category).filter(Boolean))]
      setCategories(uniqueCategories)
    }
  }, [bookmarkList])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...bookmark,
      ...formData
    })
  }

  return (
    <div className="modal-overlay">
      <div className="add-bookmark-modal">
        <div className="modal-header">
          <h2>编辑书签</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>分类</label>
              <div className="category-select-container">
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  onFocus={() => setShowCategoryDropdown(true)}
                  placeholder="选择或输入新分类"
                />
                {showCategoryDropdown && categories.length > 0 && (
                  <div className="category-dropdown">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`category-option ${category === formData.category ? 'selected' : ''}`}
                        onClick={() => {
                          setFormData({ ...formData, category })
                          setShowCategoryDropdown(false)
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                取消
              </button>
              <button type="submit" className="submit-button">
                保存修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}