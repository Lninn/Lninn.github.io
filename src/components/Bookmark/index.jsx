import { use } from 'react'
import UrlList from './UrlList'
import { getUrlArray } from './url-support'
import './index.css'

const urlListPromise = getUrlList()

function BookmarkCategory({ name, data }) {
  return (
    <div className="bookmark-category">
      <h2 className="category-title">{name}</h2>
      <UrlList list={data} />
    </div>
  )
}

export default function Bookmark() {
  const data = use(urlListPromise)

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h1>我的书签</h1>
      </div>

      <section className="bookmark-grid">
        {data.map(([name, categoryData]) => (
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

function getUrlList() {
  return fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch bookmark data')
      }
      return response.text()
    })
    .then(list => {
      try {
        return getUrlArray(list)
      } catch (error) {
        console.error('Failed to parse bookmark data:', error)
        return []
      }
    })
    .catch(error => {
      console.error('Failed to load bookmark data:', error)
      return []
    })
}
