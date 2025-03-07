import './index.css'
import { Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from '#/components/AppHeader'
import Footer from '#/components/Footer'
import ErrorBoundary from '#/components/ErrorBoundary'
import ROUTES_CONFIG from '#/config/routes'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>加载中...</span>
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

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <AppHeader />
        <main className="app-main">
          <div className="content-wrapper">
            <div className="page-container">
              <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
                <Suspense fallback={<LoadingSpinner />}>
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
              </ErrorBoundary>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
