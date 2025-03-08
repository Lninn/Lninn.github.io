import './index.css'
import { HashRouter } from 'react-router-dom'
import AppHeader from '#/components/AppHeader'
import Footer from '#/components/Footer'
import { AppRoutes } from './AppRoutes'
import { Suspense, useEffect, useState } from 'react'
import useRoutesStore from '#/store/routes'
import SplashScreen from '#/components/SplashScreen'
import { appInitState } from '#/utils/appInitializer'

export default function App() {
  const { routes, loading, error } = useRoutesStore();
  const [showSplash, setShowSplash] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    if (error) {
      console.error('路由加载错误:', error);
    }
    
    // 定期更新加载进度
    const progressInterval = setInterval(() => {
      setLoadingProgress(appInitState.progress);
      
      // 如果初始化完成且不再显示加载界面，清除定时器
      if (appInitState.isComplete && !showSplash) {
        clearInterval(progressInterval);
      }
    }, 100);
    
    return () => clearInterval(progressInterval);
  }, [error, showSplash]);
  
  const handleLoadingComplete = () => {
    // 只有当真正初始化完成时才隐藏加载界面
    if (appInitState.isComplete) {
      setShowSplash(false);
    }
  };
  
  if (loading || showSplash) {
    return (
      <SplashScreen 
        text="欢迎来到 Lninn 的数字空间，精彩内容即将呈现..." 
        progress={loadingProgress}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <HashRouter>
      <div className="app-container">
        <AppHeader />
        <main className="app-main">
          <div className="content-wrapper">
            <AppRoutes routes={routes} />
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
