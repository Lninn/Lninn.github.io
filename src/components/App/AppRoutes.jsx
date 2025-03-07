import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { ROUTES_CONFIG } from '#/config/routes'
import PageContainer from '#/components/PageContainer'

// 加载指示器组件
function LoadingFallback() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      加载中...
    </div>
  )
}

// 404 页面组件
function NotFound() {
  return (
    <PageContainer>
      <div className="not-found">
        <div className="not-found-content">
          <h2>404</h2>
          <p>页面不存在</p>
          <a href="/" className="back-home">返回首页</a>
        </div>
      </div>
    </PageContainer>
  )
}

export function AppRoutes() {
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/bookmarks" replace />} />
        
        {ROUTES_CONFIG.map(route => {
          const Component = route.component;
          
          if (route.children) {
            return (
              <Route key={route.path} path={route.path}>
                <Route 
                  index 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Component />
                    </Suspense>
                  } 
                />
                
                {route.children.map(child => {
                  const ChildComponent = child.component;
                  const relativePath = child.path.replace(route.path, '').replace(/^\//, '');
                  
                  return (
                    <Route
                      key={child.path}
                      path={relativePath}
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          {ChildComponent ? <ChildComponent /> : <Component />}
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
            );
          }
          
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageContainer>
  );
}