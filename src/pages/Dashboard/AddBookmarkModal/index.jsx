import './index.css'

import { useState, useEffect } from 'react'
import useBookmarkStore from '#/store/bookmark'
import { fetchWebsiteMetadata, checkUrlExists } from '#/utils/bookmarkAnalyzer'
import BookmarkForm from './BookmarkForm'
import AnalysisStatus from './AnalysisStatus'


export default function AddBookmarkModal({ onClose, onSubmit }) {
  const { list: bookmarkList } = useBookmarkStore()
  const [url, setUrl] = useState('')
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    category: '',
    icon: ''
  })
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(null)
  const [analysisError, setAnalysisError] = useState(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [categories, setCategories] = useState([])
  const [urlExists, setUrlExists] = useState(false)

  useEffect(() => {
    if (bookmarkList && bookmarkList.length > 0) {
      const uniqueCategories = [...new Set(bookmarkList.map(item => item.category).filter(Boolean))]
      setCategories(uniqueCategories)
    }
  }, [bookmarkList])

  const analyzeUrl = async () => {
    if (!url || !url.trim()) return
    
    setAnalyzing(true)
    setAnalysisStep('开始分析')
    setAnalysisError(null)
    setAnalysisComplete(false)
    setUrlExists(false) // 重置URL存在状态
    
    try {
      setAnalysisStep('验证URL格式')
      let processedUrl = url
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = 'https://' + url
      }
      
      // 检查URL是否已存在
      const normalizedUrl = processedUrl.toLowerCase().replace(/\/$/, '')
      const exists = bookmarkList.some(bookmark => 
        bookmark.url.toLowerCase().replace(/\/$/, '') === normalizedUrl
      )
      
      if (exists) {
        setUrlExists(true)
        setAnalysisError('该URL已存在于您的书签中')
        setAnalyzing(false)
        return
      }

      setAnalysisStep('获取网站元数据')
      const response = await fetchWebsiteMetadata(processedUrl)
      
      setAnalysisStep('处理分析结果')
      setFormData({
        url: processedUrl,
        name: response.title || '',
        icon: response.icon || '',
        category: response.suggestedCategory || ''
      })
      
      setAnalysisStep('分析完成')
      setAnalysisComplete(true)
    } catch (error) {
      setAnalysisError(`在"${analysisStep}"步骤失败: ${error.message}`)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSubmit = (formData) => {
    // 再次检查URL是否已存在（以防用户修改了表单数据）
    const normalizedUrl = formData.url.toLowerCase().replace(/\/$/, '')
    const exists = checkUrlExists(normalizedUrl, bookmarkList)
    
    if (exists) {
      setUrlExists(true)
      setAnalysisError('该URL已存在于您的书签中')
      return
    }
    
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="add-bookmark-modal">
        <div className="modal-header">
          <h2>添加新书签</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <div className="form-group">
            <label>网址</label>
            <div className="url-input-container">
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="输入网站地址"
                required
              />
              <button
                type="button"
                className="analyze-button"
                onClick={analyzeUrl}
                disabled={analyzing || !url}
              >
                分析
              </button>
            </div>
          </div>

          <AnalysisStatus 
            analyzing={analyzing}
            analysisStep={analysisStep}
            analysisError={analysisError}
            urlExists={urlExists}
          />

          {analysisComplete && (
            <BookmarkForm 
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}
