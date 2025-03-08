import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useRouteChange() {
  const [isChanging, setIsChanging] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // 路由变化时立即显示加载状态
    setIsChanging(true);
    
    // 使用 requestIdleCallback 或 setTimeout 延迟关闭加载状态
    // 这样可以确保组件有足够时间加载
    const timerId = setTimeout(() => {
      setIsChanging(false);
    }, 200);
    
    return () => clearTimeout(timerId);
  }, [location.pathname]);
  
  return isChanging;
}
