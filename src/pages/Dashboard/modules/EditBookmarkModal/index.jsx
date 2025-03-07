import './index.css'
import { useState, useEffect, useRef } from 'react'
import useBookmarkStore from '#/store/bookmark'
import Modal from '#/components/Modal'

/**
 * 编辑书签模态框组件
 * 用于编辑和保存书签信息
 */
export default function EditBookmarkModal({ bookmark, onClose, onSubmit }) {
  const { list: bookmarkList } = useBookmarkStore()
  const [formData, setFormData] = useState({
    name: bookmark.name,
    category: bookmark.category,
    icon: bookmark.icon
  })
  const [categories, setCategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const initialFormData = useRef({
    name: bookmark.name,
    category: bookmark.category,
    icon: bookmark.icon
  }).current

  // 检测表单是否有变更
  useEffect(() => {
    const changed = 
      formData.name !== initialFormData.name ||
      formData.category !== initialFormData.category ||
      formData.icon !== initialFormData.icon
    
    setHasChanges(changed)
  }, [formData, initialFormData])

  useEffect(() => {
    if (bookmarkList && bookmarkList.length > 0) {
      // 从现有书签中提取唯一的分类列表
      const uniqueCategories = [...new Set(bookmarkList.map(item => item.category).filter(Boolean))]
      setCategories(uniqueCategories)
    }
  }, [bookmarkList])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCategoryDropdown && !event.target.closest('.category-select-container')) {
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCategoryDropdown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!hasChanges || isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      // 提交表单数据
      await onSubmit({
        ...bookmark,
        ...formData
      })
      
      // 成功后关闭模态框
      onClose()
    } catch (error) {
      // 处理错误情况
      console.error('保存书签失败:', error)
      // 这里可以添加错误提示
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="编辑书签"
      size="md"
      position="center"
    >
      <div className="bookmark-modal-content">
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
            <label>图标</label>
            <div className="icon-input-container">
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="输入图标 URL"
              />
              {formData.icon && (
                <div className="icon-preview">
                  <img 
                    src={formData.icon} 
                    alt="图标预览"
                    onError={(e) => e.target.src = '/fallback-icon.svg'}
                  />
                </div>
              )}
            </div>
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
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={!hasChanges || isSubmitting}
            >
              {isSubmitting ? '保存中...' : '保存修改'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
