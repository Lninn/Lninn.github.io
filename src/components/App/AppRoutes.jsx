import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import PageContainer from '#/components/PageContainer'
import ErrorBoundary from '#/components/ErrorBoundary'
import LoadingSpinner from '#/components/LoadingSpinner'
import { useState, useEffect } from 'react'

// 创建一个页面切换指示器组件
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // 页面加载开始
    setIsLoading(true);
    
    // 使用 requestAnimationFrame 确保在下一帧渲染前设置为 false
    // 这样可以确保即使是快速加载的组件也能显示加载状态
    const timer = requestAnimationFrame(() => {
      // 使用 setTimeout 确保加载状态至少显示一小段时间
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    });
    
    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner fullScreen text="页面加载中..." />;
  }
  
  return children;
};

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
  // 递归渲染路由
  const renderRoutes = (routesList) => {
    return routesList.map((route) => {
      // 如果有子路由，递归渲染
      if (route.children && route.children.length > 0) {
        return (
          <Route key={route.path} path={route.path} element={
            <Suspense fallback={<LoadingSpinner fullScreen text="页面加载中..." />}>
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
              <Suspense fallback={<LoadingSpinner fullScreen text="页面加载中..." />}>
                <PageTransition>
                  <route.component />
                </PageTransition>
              </Suspense>
            </ErrorBoundary>
          }
        />
      );
    });
  };

  return (
    <PageContainer>
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
