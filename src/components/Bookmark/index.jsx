import './index.css'

import { use, useState, useMemo } from 'react'
import UrlList from './UrlList'
import { getUrlArray } from '../../store/shared'
import { supabase } from '../../supabaseClient'
import ErrorBoundary from '../ErrorBoundary'

const initialFnPromise = fetchBookmarks()

async function fetchBookmarks() {
  // 获取书签数据
  const { data: bookmarks, error: bookmarkError } = await supabase
    .from('bookmark')
    .select('*')
    
  if (bookmarkError) {
    console.error('Failed to fetch bookmark data:', bookmarkError)
    return { list: [], viewsMap: new Map() }
  }

  // 获取分类访问量数据
  const { data: viewsData, error: viewsError } = await supabase
    .from('category_views')
    .select('*')

  if (viewsError) {
    console.error('Failed to fetch views data:', viewsError)
  }

  // 创建访问量映射
  const viewsMap = new Map(
    viewsData?.map(item => [item.category, item.view_count]) || []
  )

  // 对数据进行分组
  const groupedData = getUrlArray(bookmarks)

  // 按访问量排序
  const sortedData = groupedData.sort((a, b) => {
    const viewsA = viewsMap.get(a[0]) || 0
    const viewsB = viewsMap.get(b[0]) || 0
    return viewsB - viewsA
  })

  return { list: sortedData, viewsMap }
}

export default function Bookmark() {
  const { list, viewsMap } = use(initialFnPromise)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  // 获取所有唯一分类
  const categories = useMemo(() => {
    return ['全部', ...new Set(list.map(([category]) => category))]
  }, [list])

  // 过滤数据
  const filteredList = useMemo(() => {
    if (!searchTerm && selectedCategory === '全部') return list

    return list.map(([category, items]) => {
      // 如果选择了特定分类且不匹配，返回空数组
      if (selectedCategory !== '全部' && category !== selectedCategory) {
        return [category, []]
      }

      // 过滤项目
      const filteredItems = items.filter(item => {
        const searchLower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.url.toLowerCase().includes(searchLower)
        )
      })

      return [category, filteredItems]
    }).filter(([, items]) => items.length > 0)
  }, [list, searchTerm, selectedCategory])

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <div className="header-top">
          <h1>我的书签</h1>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="搜索书签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="清除搜索"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="category-filter-container">
          <span className="filter-label">分类筛选:</span>
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  // 如果点击当前选中的分类，则切换回"全部"
                  setSelectedCategory(selectedCategory === category ? '全部' : category)
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="bookmark-grid">
        {filteredList.length > 0 ? (
          filteredList.map(([name, categoryData]) => (
            <ErrorBoundary key={name} showDetails={false}>
              <BookmarkCategory 
                name={name} 
                data={categoryData}
                searchTerm={searchTerm}
                viewCount={viewsMap.get(name) || 0}
              />
            </ErrorBoundary>
          ))
        ) : (
          <div className="no-results">
            <p>没有找到匹配的书签</p>
            <button 
              className="reset-search"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('全部')
              }}
            >
              重置搜索
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function BookmarkCategory({ name, data, searchTerm }) {
  return (
    <div className="bookmark-category">
      <h2 className="category-title">{name}</h2>
      <UrlList 
        list={data} 
        searchTerm={searchTerm}
        category={name}
      />
    </div>
  )
}
