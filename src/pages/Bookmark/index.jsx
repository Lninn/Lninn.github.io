import './index.css'

import { useState, useEffect, useMemo } from 'react'
import ErrorBoundary from '#/components/ErrorBoundary'
import { bookmarkApi } from '#/api/bookmark'
import UrlList from './UrlList'
import BookmarkSkeleton from './BookmarkSkeleton'
import BookmarkHeader from './BookmarkHeader'


export default function Bookmark() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookmarkData, setBookmarkData] = useState({ list: [], viewsMap: new Map() })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await bookmarkApi.fetchBookmarksWithViews()
        setBookmarkData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const { list, viewsMap } = bookmarkData

  // 获取所有唯一分类
  const categories = useMemo(() => {
    return ['全部', ...new Set(list.map(([category]) => category))]
  }, [list])

  // 过滤数据
  const filteredList = useMemo(() => {
    if (!searchTerm && selectedCategory === '全部') return list

    return list.map(([category, items]) => {
      if (selectedCategory !== '全部' && category !== selectedCategory) {
        return [category, []]
      }

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

  // 处理分类选择
  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? '全部' : category);
  };

  if (error) {
    return (
      <div className="error-state">
        <p>加载失败: {error}</p>
        <button onClick={() => window.location.reload()}>重试</button>
      </div>
    )
  }

  return (
    <>
      <BookmarkHeader 
        title="我的书签"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={() => setSearchTerm('')}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {isLoading ? (
        <BookmarkSkeleton />
      ) : (
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
      )}
    </>
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
