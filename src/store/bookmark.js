import { create } from 'zustand'
import { supabase } from '../supabaseClient'

const useBookmarkStore = create((set) => ({
  bookmarkList: [],
  groupedBookmarks: [],
  
  fetchBookmarks: async () => {
    const { data, error } = await supabase.from('bookmark').select('*')
    
    if (error) {
      console.error('Failed to fetch bookmark data:', error)
      return
    }

    const groupedData = getUrlArray(data)
    set({ 
      bookmarkList: data,
      groupedBookmarks: groupedData
    })
  },

  addBookmark: (bookmark) => set(state => ({
    bookmarkList: [...state.bookmarkList, bookmark],
    groupedBookmarks: getUrlArray([...state.bookmarkList, bookmark])
  })),

  removeBookmark: (url) => set(state => {
    const newList = state.bookmarkList.filter(item => item.url !== url)
    return {
      bookmarkList: newList,
      groupedBookmarks: getUrlArray(newList)
    }
  })
}))

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
      return a[0][0].localeCompare(b[0][0])
    } else {
      return b[0][0].localeCompare(a[0][0])
    }
  })
}

export default useBookmarkStore