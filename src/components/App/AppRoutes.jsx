import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { ROUTES_CONFIG } from '#/config/routes'
import PageContainer from '#/components/PageContainer'

// 加载指示器组件
function LoadingFallback() {
  return (
    <PageContainer>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        加载中...
      </div>
    </PageContainer>
  )
}

// 404 页面组件
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

export function AppRoutes() {
  const renderRoutes = (routes) => {
    return routes.map(route => {
      const Component = route.component

      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Component />
            </Suspense>
          }
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      )
    })
  }

  return (
    <Routes>
      {renderRoutes(ROUTES_CONFIG)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}