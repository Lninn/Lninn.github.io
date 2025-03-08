import './index.css'
import { createRoot } from 'react-dom/client'
import App from '#/components/App'
import ErrorBoundary from '#/components/ErrorBoundary'
import { initializeApp } from '#/utils/appInitializer'
import '#/utils/globalInitial'

// 创建根元素
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 渲染初始应用
root.render(
  <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
    <App />
  </ErrorBoundary>
);

// 初始化应用
initializeApp().catch(error => {
  console.error('应用初始化失败:', error);
});
