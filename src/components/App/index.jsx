import './index.css'
import { Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from '#/components/AppHeader'
import Footer from '#/components/Footer'
import ROUTES_CONFIG from '#/config/routes'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>页面加载中...</span>
    </div>
  )
}

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h2>404</h2>
        <p>页面不存在</p>
        <a href="/" className="back-home">返回首页</a>
      </div>
    </div>
  )
}

// 创建一个永远处于加载状态的组件用于测试
const TestLoading = () => {
  // 这个效果会让组件永远处于加载状态
  throw new Promise(() => {
    // 空的Promise，永远不会resolve
  });
};

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <AppHeader />
        <main className="app-main">
          <div className="content-wrapper">
            <div className="page-container">
              {/* 测试加载效果 - 将此行注释掉即可恢复正常功能 */}
              <Suspense fallback={<LoadingSpinner />}>
                {/* <TestLoading /> */}
                {/* 原始路由代码 - 测试完成后取消注释 */}
                <Routes>
                  <Route path="/" element={<Navigate to="/bookmarks" replace />} />
                  {ROUTES_CONFIG.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
               
              </Suspense>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
