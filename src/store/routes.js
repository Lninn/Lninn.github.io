import { create } from 'zustand'
import { DEFAULT_ROUTES_CONFIG } from '#/utils/globalInitial'
import { convertToRouteConfig } from '#/api/navigationApi'

// 添加超时处理的 Promise
const withTimeout = (promise, timeout = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('请求超时')), timeout)
    )
  ]);
};

const useRoutesStore = create((set) => ({
  routes: DEFAULT_ROUTES_CONFIG,
  loading: true,
  error: null,
  
  // 初始化路由配置
  initRoutes: async () => {
    try {
      set({ loading: true, error: null })
      
      // 添加超时处理
      const apiRoutes = await withTimeout(convertToRouteConfig(), 8000);
      
      if (apiRoutes && apiRoutes.length > 0) {
        set({ routes: apiRoutes, loading: false })
      } else {
        set({ routes: DEFAULT_ROUTES_CONFIG, loading: false })
      }
      
      return apiRoutes;
    } catch (err) {
      console.error('Failed to load routes from API:', err)
      set({ 
        error: err, 
        loading: false,
        routes: DEFAULT_ROUTES_CONFIG // 使用默认配置作为回退
      })
      
      // 重新抛出错误，让调用者知道发生了错误
      throw err;
    }
  },
  
  // 更新路由配置（例如在管理界面修改后）
  updateRoutes: (newRoutes) => {
    set({ routes: newRoutes })
  }
}))

export default useRoutesStore
