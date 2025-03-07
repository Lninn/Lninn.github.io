import { Routes, Route, Navigate } from 'react-router-dom'
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
  return (
    <Routes>
      {/* 默认路由重定向 */}
      <Route path="/" element={<Navigate to="/bookmarks" replace />} />
      
      {/* 渲染主路由 */}
      {ROUTES_CONFIG.map(route => {
        const Component = route.component;
        
        // 处理有子路由的情况
        if (route.children) {
          return (
            <Route key={route.path} path={route.path}>
              {/* 父路由路径精确匹配时渲染父组件 */}
              <Route 
                index 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Component />
                  </Suspense>
                } 
              />
              
              {/* 渲染子路由 */}
              {route.children.map(child => {
                const ChildComponent = child.component;
                // 提取子路由的相对路径（去掉父路径部分）
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
        
        // 处理没有子路由的普通路由
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
      
      {/* 404路由 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}