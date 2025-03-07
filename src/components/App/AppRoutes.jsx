import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { useRoutesConfig } from '#/config/routes';
import PageContainer from '#/components/PageContainer'
import ErrorBoundary from '#/components/ErrorBoundary'
import LoadingSpinner from '#/components/LoadingSpinner'


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

export const AppRoutes = () => {
  const { routes, loading, error } = useRoutesConfig();

  useEffect(() => {
    if (error) {
      console.error('路由加载错误:', error);
    }
  }, [error]);

  // 递归渲染路由
  const renderRoutes = (routesList) => {
    return routesList.map((route) => {
      // 如果有子路由，递归渲染
      if (route.children && route.children.length > 0) {
        return (
          <Route key={route.path} path={route.path} element={<route.component />}>
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
              <route.component />
            </ErrorBoundary>
          }
        />
      );
    });
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="系统初始化中..." />;
  }

  const routesDom = renderRoutes(routes)
  
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="页面加载中..." />} >
      <PageContainer>
        <Routes>
          {routesDom}
          {/* 默认重定向到第一个路由 */}
          <Route path="/" element={<Navigate to={routes[0].path} replace />} />
          {/* 404页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageContainer>
    </Suspense>
  );
};
