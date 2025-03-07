import { create } from 'zustand'
import { DEFAULT_ROUTES_CONFIG } from '#/utils/globalInitial'
import { convertToRouteConfig } from '#/api/navigationApi'

const useRoutesStore = create((set) => ({
  routes: DEFAULT_ROUTES_CONFIG,
  loading: true,
  error: null,
  
  // 初始化路由配置
  initRoutes: async () => {
    try {
      set({ loading: true, error: null })
      const apiRoutes = await convertToRouteConfig()
      
      if (apiRoutes && apiRoutes.length > 0) {
        set({ routes: apiRoutes, loading: false })
      } else {
        set({ routes: DEFAULT_ROUTES_CONFIG, loading: false })
      }
    } catch (err) {
      console.error('Failed to load routes from API:', err)
      set({ 
        error: err, 
        loading: false,
        routes: DEFAULT_ROUTES_CONFIG // 使用默认配置作为回退
      })
    }
  },
  
  // 更新路由配置（例如在管理界面修改后）
  updateRoutes: (newRoutes) => {
    set({ routes: newRoutes })
  }
}))

export default useRoutesStore
