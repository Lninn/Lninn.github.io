import './index.css'
import { useEffect } from 'react'
import UrlList from './UrlList'
import useBookmarkStore from '../../store/bookmark'

export default function Bookmark() {
  const { groupedBookmarks, fetchBookmarks } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h1>我的书签</h1>
      </div>

      <section className="bookmark-grid">
        {groupedBookmarks.map(([name, categoryData]) => (
          <BookmarkCategory 
            key={name} 
            name={name} 
            data={categoryData} 
          />
        ))}
      </section>
    </div>
  )
}

function BookmarkCategory({ name, data }) {
  return (
    <div className="bookmark-category">
      <h2 className="category-title">{name}</h2>
      <UrlList list={data} />
    </div>
  )
}
