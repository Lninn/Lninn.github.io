import { useState } from 'react'
import { bookmarkApi } from '#/api/bookmark'

export function useBookmarkActions(fetchBookmarks, notify) {
  const [isProcessing, setIsProcessing] = useState(false)
  
  const addBookmark = async (newBookmark) => {
    setIsProcessing(true)
    try {
      await bookmarkApi.create(newBookmark)
      notify('success', '成功添加书签')
      await fetchBookmarks()
    } catch (err) {
      console.error('添加书签失败:', err)
      notify('error', '添加书签失败，请稍后重试')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const updateBookmark = async (bookmark) => {
    setIsProcessing(true)
    try {
      await bookmarkApi.update(bookmark)
      notify('success', '成功更新书签')
      await fetchBookmarks()
    } catch (err) {
      console.error('更新书签失败:', err)
      notify('error', '更新书签失败，请稍后重试')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const deleteBookmark = async (bookmark) => {
    setIsProcessing(true)
    try {
      await bookmarkApi.delete(bookmark)
      notify('success', '成功删除书签')
      await fetchBookmarks()
    } catch (err) {
      console.error('删除书签失败:', err)
      notify('error', '删除书签失败')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => notify('success', 'URL已复制到剪贴板'))
      .catch(() => notify('error', '复制失败，请手动复制'))
  }
  
  return {
    isProcessing,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    copyUrl
  }
}