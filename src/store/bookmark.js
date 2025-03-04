import { create } from 'zustand'
import { supabase } from '../supabaseClient'

const useBookmarkStore = create((set) => ({
  list: [],
  
  fetchBookmarks: async () => {
    const { data, error } = await supabase.from('bookmark').select('*')
    
    if (error) {
      console.error('Failed to fetch bookmark data:', error)
      return
    }

    set({ 
      list: data,
    })
  },

}))

export default useBookmarkStore
