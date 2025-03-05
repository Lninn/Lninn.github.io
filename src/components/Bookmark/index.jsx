import './index.css'

import { use } from 'react'
import UrlList from './UrlList'
import { getUrlArray } from '../../store/shared'
import { supabase } from '../../supabaseClient'
import ErrorBoundary from '../ErrorBoundary'

const initialFnPromise = fetchBookmarks()

export default function Bookmark() {
  const list = use(initialFnPromise)

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h1>我的书签</h1>
      </div>

      <section className="bookmark-grid">
        {list.map(([name, categoryData]) => (
          <ErrorBoundary key={name} showDetails={false}>
            <BookmarkCategory 
              name={name} 
              data={categoryData} 
            />
          </ErrorBoundary>
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

async function fetchBookmarks() {
  const { data, error } = await supabase.from('bookmark').select('*')
    
  if (error) {
    console.error('Failed to fetch bookmark data:', error)
    return
  }

  const groupedData = getUrlArray(data)
  return groupedData
}
