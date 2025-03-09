import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import PageContainer from '#/components/PageContainer'
import ErrorBoundary from '#/components/ErrorBoundary'
import LoadingSpinner from '#/components/LoadingSpinner'
import { useRouteChange } from '#/hooks/useRouteChange'

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

export const AppRoutes = ({ routes }) => {
  const isRouteChanging = useRouteChange();
  
  // 递归渲染路由
  const renderRoutes = (routesList) => {
    return routesList.map((route) => {
      // 如果有子路由，递归渲染
      if (route.children && route.children.length > 0) {
        return (
          <Route key={route.path} path={route.path} element={
            <Suspense fallback={<LoadingSpinner text="页面加载中..." />}>
              <route.component />
            </Suspense>
          }>
            {renderRoutes(route.children)}
            {/* 默认重定向到第一个子路由 */}
            <Route
              index
              element={<Navigate to={route.children[0].path} replace />}
            />
          </Route>
        );
      }

      // 没有子路由，直接渲染
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner text="页面加载中..." />}>
                <route.component />
              </Suspense>
            </ErrorBoundary>
          }
        />
      );
    });
  };

  return (
    <PageContainer>
      {/* 全局路由变化加载指示器 */}
      {isRouteChanging && <LoadingSpinner text="页面获取中..." />}
      
      <Routes>
        {renderRoutes(routes)}
        {/* 默认重定向到第一个路由 */}
        <Route path="/" element={<Navigate to={routes[0].path} replace />} />
        {/* 404页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageContainer>
  );
};
