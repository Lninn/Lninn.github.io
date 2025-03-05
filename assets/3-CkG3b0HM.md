# React 项目优化指南

## 一、错误处理体系

### 1.1 统一错误处理
目前项目已有 `errorHandler.js`，但需要在整个项目中统一使用。建议按以下方式改进：

```javascript:/Users/lninn/Codebase/Lninn.github.io/src/utils/errorHandler.js
// 添加错误类型定义
export const ErrorTypes = {
  NETWORK: 'NETWORK',
  DATABASE: 'DATABASE',
  VALIDATION: 'VALIDATION',
  UNKNOWN: 'UNKNOWN'
}

// 添加重试机制
export const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) throw error
    await new Promise(resolve => setTimeout(resolve, delay))
    return withRetry(fn, retries - 1, delay * 2)
  }
}

// 扩展错误处理
export const handleApiError = (error, component = '') => {
  logError(error, component)
  
  // 根据错误类型返回用户友好消息
  if (error?.status === 401) return '请先登录'
  if (error?.status === 403) return '没有权限'
  if (error?.status === 404) return '资源不存在'
  if (error?.status === 500) return '服务器错误'
  
  return '操作失败，请稍后重试'
}
```

## 二、状态管理优化

### 2.1 Store 统一管理
创建统一的 store 入口：

```javascript:/Users/lninn/Codebase/Lninn.github.io/src/store/index.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createBookmarkSlice } from './bookmarkSlice'
import { createThemeSlice } from './themeSlice'
import { createHistorySlice } from './historySlice'

const useStore = create(
  persist(
    (...args) => ({
      ...createBookmarkSlice(...args),
      ...createThemeSlice(...args),
      ...createHistorySlice(...args),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        theme: state.theme,
      }),
    }
  )
)

export default useStore
```

## 三、性能优化

### 3.1 列表虚拟化
对于长列表，使用虚拟列表优化：

```jsx:/Users/lninn/Codebase/Lninn.github.io/src/components/Dashboard/VirtualBookmarkList.jsx
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function VirtualBookmarkList({ items }) {
  const Row = ({ index, style }) => {
    const bookmark = items[index]
    return (
      <div style={style} className="bookmark-item">
        {/* 现有的书签项内容 */}
      </div>
    )
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={items.length}
          itemSize={100}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}
```

### 3.2 懒加载优化
对于不是首屏必需的组件，使用懒加载：

```jsx:/Users/lninn/Codebase/Lninn.github.io/src/components/App/index.jsx
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('../Dashboard'))
const HistoryList = lazy(() => import('../Dashboard/HistoryList'))
```

## 四、用户体验优化

### 4.1 批量操作功能
添加批量操作组件：

```jsx:/Users/lninn/Codebase/Lninn.github.io/src/components/Dashboard/BatchOperations.jsx
export default function BatchOperations({ selectedItems, onDelete, onUpdateCategory }) {
  return (
    <div className="batch-operations">
      <button 
        className="batch-delete"
        onClick={() => onDelete(selectedItems)}
      >
        批量删除
      </button>
      <select 
        onChange={(e) => onUpdateCategory(selectedItems, e.target.value)}
      >
        <option value="">批量修改分类</option>
        {/* 分类选项 */}
      </select>
    </div>
  )
}
```

### 4.2 导入导出功能
添加数据导入导出功能：

```jsx:/Users/lninn/Codebase/Lninn.github.io/src/components/Dashboard/ImportExport.jsx
export default function ImportExport() {
  const handleExport = async () => {
    const bookmarks = await fetchAllBookmarks()
    const blob = new Blob([JSON.stringify(bookmarks)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bookmarks.json'
    a.click()
  }

  return (
    <div className="import-export">
      <input 
        type="file" 
        accept=".json"
        onChange={handleImport} 
      />
      <button onClick={handleExport}>导出书签</button>
    </div>
  )
}
```

## 五、代码组织优化

### 5.1 目录结构规范
```plaintext
/src
  /api          # API 请求封装
  /hooks        # 自定义 hooks
  /components   # 组件
  /store        # 状态管理
  /utils        # 工具函数
  /constants    # 常量定义
  /types        # 类型定义
  /i18n         # 国际化
```

## 六、测试覆盖

### 6.1 单元测试
```javascript:/Users/lninn/Codebase/Lninn.github.io/src/components/Dashboard/__tests__/Dashboard.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from '../index'

describe('Dashboard Component', () => {
  test('renders bookmark list', () => {
    render(<Dashboard />)
    expect(screen.getByText('书签列表')).toBeInTheDocument()
  })

  test('adds new bookmark', async () => {
    render(<Dashboard />)
    // 测试添加书签功能
  })
})
```

## 七、国际化支持

### 7.1 翻译文件
```javascript:/Users/lninn/Codebase/Lninn.github.io/src/i18n/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhCN from './zh-CN'
import enUS from './en-US'

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zhCN },
    en: { translation: enUS }
  },
  lng: 'zh',
  fallbackLng: 'zh'
})

export default i18n
```

## 八、构建优化

### 8.1 Vite 配置优化
```javascript:/Users/lninn/Codebase/Lninn.github.io/vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'zustand']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser'
  }
})
```

## 九、监控与日志

### 9.1 性能监控
```javascript:/Users/lninn/Codebase/Lninn.github.io/src/utils/monitor.js
export const measurePerformance = (component, action) => {
  const start = performance.now()
  return () => {
    const duration = performance.now() - start
    console.log(`${component} ${action}: ${duration}ms`)
    // 可以发送到监控服务
  }
}
```

## 后续开发建议

1. 优先级排序：
   - 高优先级：错误处理、性能优化
   - 中优先级：用户体验、测试覆盖
   - 低优先级：国际化、监控系统

2. 开发流程：
   - 先完善错误处理系统
   - 实现基础的性能优化
   - 逐步添加新功能
   - 同步编写测试用例

3. 维护建议：
   - 定期更新依赖
   - 保持代码风格一致
   - 及时处理代码异味
   - 持续集成测试用例

按照这个指南逐步实施优化，可以显著提升项目的质量和可维护性。建议根据实际情况调整优先级和实施顺序。
