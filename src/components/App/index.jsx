import './index.css'
import { Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from '../AppHeader'
import Footer from '../Footer'
import ErrorBoundary from '../ErrorBoundary'
import ROUTES_CONFIG from '../../config/routes'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>Loading...</span>
    </div>
  )
}

function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>页面不存在</p>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <AppHeader />
        <main className="app-main">
          <div className="content-container">
            <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* 默认重定向到书签页 */}
                  <Route path="/" element={<Navigate to="/bookmark" replace />} />
                  
                  {/* 动态生成路由 */}
                  {ROUTES_CONFIG.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}

                  {/* 404 路由 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
