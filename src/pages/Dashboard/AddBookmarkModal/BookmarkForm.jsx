import { useState, useEffect } from 'react'

/**
 * 书签表单组件
 * 用于显示和编辑书签信息
 */
export default function BookmarkForm({ formData, setFormData, categories, onSubmit, onCancel }) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch {
      // 错误会在父组件中处理
      throw new Error('添加书签失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bookmark-form">
      <h3>书签信息</h3>
      <div className="form-group">
        <label>名称</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="书签名称"
          required
        />
      </div>

      <div className="form-group">
        <label>分类</label>
        <div className="category-select-container">
          <input
            type="text"
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            onFocus={() => setShowCategoryDropdown(true)}
            placeholder="选择或输入新分类"
            required
          />
          {showCategoryDropdown && categories.length > 0 && (
            <div className="category-dropdown">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`category-option ${formData.category === category ? 'selected' : ''}`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category }))
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

      <div className="form-group">
        <label>图标</label>
        <div className="icon-input-container">
          <input
            type="text"
            value={formData.icon}
            onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
            placeholder="图标URL"
          />
          {formData.icon && (
            <div className="icon-preview">
              <img 
                src={formData.icon} 
                alt="网站图标"
                onError={(e) => e.target.src = '/fallback-icon.svg'}
              />
            </div>
          )}
        </div>
      </div>

      <div className="modal-actions">
        <button 
          type="button" 
          className="cancel-button" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          取消
        </button>
        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '添加中...' : '添加书签'}
        </button>
      </div>
    </form>
  )
}
