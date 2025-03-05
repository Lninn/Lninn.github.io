import { supabase } from '../supabaseClient'
import { handleApiError } from '../utils/errorHandler'

export const bookmarkApi = {
  async fetchAll() {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .select('*')
        .order('create_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async create(bookmark) {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .insert([bookmark])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  // ... other methods
}