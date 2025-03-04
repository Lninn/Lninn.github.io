import './index.css'

import { use, useMemo } from 'react'
import UrlList from './UrlList'
import { supabase } from '../../supabaseClient'


const fetchBookmarkPromise = fetchBookmarkData()

export default function Bookmark() {
  const originalData = use(fetchBookmarkPromise)

  const data = useMemo(() => {
    return getUrlArray(originalData)
  }, [originalData])

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

function BookmarkCategory({ name, data }) {
  return (
    <div className="bookmark-category">
      <h2 className="category-title">{name}</h2>
      <UrlList list={data} />
    </div>
  )
}

async function fetchBookmarkData() {
  let { data, error } = await supabase
    .from('bookmark')
    .select('*')

  if (error) {
    console.error('Failed to fetch bookmark data:', error)
    return []
  }

  return data
}

function getUrlArray(list) {
  var originalData = list
  var restList = []

  var dataMap = {}

  for (const item of originalData) {
    if ('category' in item) {
      var name = item['category']
      if (name in dataMap) {
        dataMap[name].push(item)
      } else {
        dataMap[name] = [item]
      }
    } else {
      restList.push(item)
    }
  }

  var dataList = Object.entries(dataMap)
  
  return sortByFirstLetter(dataList, false)
}

function sortByFirstLetter(arr, ascending = true) {
  return arr.sort((a, b) => {
      if (ascending) {
          return a[0][0].localeCompare(b[0][0]);
      } else {
          return b[0][0].localeCompare(a[0][0]);
      }
  });
}
