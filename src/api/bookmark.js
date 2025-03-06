import { supabase } from '#/supabaseClient'
import { handleApiError } from '#/utils/errorHandler'
import { getUrlArray } from '#/store/shared'

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
      // 生成唯一ID和创建时间
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000)
      const bookmarkData = {
        ...bookmark,
        id: uniqueId,
        create_at: new Date().toISOString()
      }
      
      const { data, error } = await supabase
        .from('bookmark')
        .insert([bookmarkData])
        .select()
      
      if (error) throw error
      
      // 记录历史
      await this.recordHistory('add', bookmarkData)
      
      return data[0]
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
  
  async update(bookmark) {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .update({
          name: bookmark.name,
          category: bookmark.category,
          icon: bookmark.icon
        })
        .eq('url', bookmark.url)
        .select()
      
      if (error) throw error
      
      // 记录历史
      await this.recordHistory('update', bookmark)
      
      return data[0]
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
  
  async delete(bookmark) {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .delete()
        .eq('url', bookmark.url)
        .select()
      
      if (error) throw error
      
      // 记录历史
      await this.recordHistory('delete', bookmark)
      
      return data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
  
  async recordHistory(action, bookmarkData) {
    try {
      const { error } = await supabase
        .from('bookmark_history')
        .insert([{
          action,
          bookmark_id: bookmarkData.id,
          bookmark_data: bookmarkData
        }])
      
      if (error) throw error
    } catch (error) {
      console.error('记录历史失败:', error)
      // 这里我们只记录错误但不抛出，避免影响主要操作
    }
  },
  
  // 添加新方法用于获取书签和分类访问量
  async fetchBookmarksWithViews() {
    try {
      // 获取书签数据
      const { data: bookmarks, error: bookmarkError } = await supabase
        .from('bookmark')
        .select('*')
      
      if (bookmarkError) throw bookmarkError

      // 获取分类访问量数据
      const { data: viewsData, error: viewsError } = await supabase
        .from('category_views')
        .select('*')

      if (viewsError) throw viewsError

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
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }
}
