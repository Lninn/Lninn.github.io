import { create } from 'zustand'
import { ROUTES } from '../config/routes'

// 从 URL 获取初始路径
const getInitialPath = () => {
  const hash = window.location.hash.slice(1) // 移除 # 符号
  return hash && Object.values(ROUTES).some(r => r.path === hash) ? hash : 'bookmark'
}

const useRouteStore = create((set) => ({
  activePath: getInitialPath(),
  setActivePath: (path) => {
    window.location.hash = path // 更新 URL hash
    set({ activePath: path })
  }
}))

// 监听 hash 变化
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1)
    if (path && Object.values(ROUTES).some(r => r.path === path)) {
      useRouteStore.getState().setActivePath(path)
    }
  })
}

export default useRouteStore