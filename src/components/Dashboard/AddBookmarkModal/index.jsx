import './index.css'

import { useState, useEffect } from 'react'

import useBookmarkStore from '../../../store/bookmark'

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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  
  useEffect(() => {
    if (bookmarkList && bookmarkList.length > 0) {
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

  const analyzeUrl = async () => {
    if (!url || !url.trim()) return
    
    setAnalyzing(true)
    setAnalysisStep('开始分析')
    setAnalysisError(null)
    setAnalysisComplete(false)
    
    try {
      setAnalysisStep('验证URL格式')
      let processedUrl = url
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = 'https://' + url
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
  
  // 模拟获取网站元数据的函数
  // 实际项目中应该替换为真实的API调用
  const fetchWebsiteMetadata = async (url) => {
    try {
      // 使用 cors-anywhere 代理服务来解决 CORS 问题
      const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('无法获取网站内容');
      }

      // 创建一个 DOM 解析器
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      // 获取网站标题
      let title = doc.querySelector('title')?.textContent || '';
      if (!title) {
        // 尝试获取 og:title
        title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      }
      
      // 获取网站图标
      let icon = '';
      // 首先尝试获取 favicon
      const favicon = doc.querySelector('link[rel="icon"]') || 
                     doc.querySelector('link[rel="shortcut icon"]');
      if (favicon) {
        icon = new URL(favicon.getAttribute('href'), url).href;
      }
      
      // 如果没有找到 favicon，使用 Google Favicon 服务作为备选
      if (!icon) {
        icon = `https://www.google.com/s2/favicons?domain=${url}`;
      }

      // 尝试从 meta 标签获取关键词来辅助分类
      let keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      let description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // 根据关键词和描述推测分类
      let suggestedCategory = guessCategoryFromContent(keywords + ' ' + description) || 
                             guessCategory(new URL(url).hostname);

      return {
        title: title || getDefaultTitle(url),
        icon,
        suggestedCategory
      };
    } catch (error) {
      console.error('获取网站信息失败:', error);
      return getFallbackMetadata(url);
    }
  };

  // 从网站内容推测分类
  const guessCategoryFromContent = (content = '') => {
    const contentLower = content.toLowerCase();
    const categoryPatterns = {
      '技术': ['programming', 'developer', 'coding', '编程', '开发', '技术'],
      '新闻': ['news', 'daily', 'report', '新闻', '资讯'],
      '购物': ['shop', 'store', 'buy', 'price', '商城', '购物'],
      '教育': ['learn', 'course', 'education', 'study', '教育', '学习'],
      '娱乐': ['game', 'entertainment', 'movie', 'music', '游戏', '电影', '音乐'],
      '社交': ['social', 'community', 'forum', '社区', '论坛']
    };

    for (const [category, patterns] of Object.entries(categoryPatterns)) {
      if (patterns.some(pattern => contentLower.includes(pattern))) {
        return category;
      }
    }
    return null;
  };

  // 获取默认标题
  const getDefaultTitle = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.split('.')[0].charAt(0).toUpperCase() + 
             domain.split('.')[0].slice(1);
    } catch {
      return url;
    }
  };

  // 当所有方法都失败时的备选方案
  const getFallbackMetadata = (url) => {
    try {
      const domain = new URL(url).hostname;
      return {
        title: getDefaultTitle(url),
        icon: `https://www.google.com/s2/favicons?domain=${url}`,
        suggestedCategory: guessCategory(domain)
      };
    } catch {
      throw new Error('无效的URL格式');
    }
  };
  
  // 根据域名猜测分类
  const guessCategory = (domain) => {
    const categories = {
      'github': '开发工具',
      'stackoverflow': '开发工具',
      'youtube': '视频',
      'bilibili': '视频',
      'google': '搜索',
      'baidu': '搜索',
      'zhihu': '社交',
      'weibo': '社交',
      'twitter': '社交',
      'facebook': '社交',
      'instagram': '社交',
      'amazon': '购物',
      'taobao': '购物',
      'jd': '购物'
    }
    
    for (const [key, value] of Object.entries(categories)) {
      if (domain.includes(key)) {
        return value
      }
    }
    
    return '其他'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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

          {analyzing && (
            <div className="analysis-status">
              <h3>正在分析网站...</h3>
              <div className="analysis-steps">
                {['开始分析', '验证URL格式', '获取网站元数据', '处理分析结果', '分析完成'].map((step, index) => (
                  <div 
                    key={index} 
                    className={`analysis-step ${analysisStep === step ? 'active' : ''} ${
                      ['开始分析', '验证URL格式', '获取网站元数据', '处理分析结果'].indexOf(step) < 
                      ['开始分析', '验证URL格式', '获取网站元数据', '处理分析结果'].indexOf(analysisStep) ? 'complete' : ''
                    }`}
                  >
                    <div className="step-indicator">{index + 1}</div>
                    <div className="step-label">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisError && (
            <div className="analysis-error">
              <p>{analysisError}</p>
              <p className="error-tip">提示：请检查网址是否正确，或稍后再试。</p>
            </div>
          )}

          {analysisComplete && (
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
                <div className="icon-preview">
                  {formData.icon && <img src={formData.icon} alt="网站图标" />}
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="图标URL"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={onClose}>取消</button>
                <button type="submit" className="submit-button">添加书签</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
