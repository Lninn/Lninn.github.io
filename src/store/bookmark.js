import { create } from 'zustand'
import { getUrlArray } from './shared'
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

export default useBookmarkStore
