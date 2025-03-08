import { useEffect, useState } from 'react';
import './index.css';

const SplashScreen = ({ 
  text = "探索无限可能", 
  progress = 0, 
  onLoadingComplete = () => {} 
}) => {
  const [loadingText, setLoadingText] = useState("初始化中");
  
  const loadingPhrases = [
    "正在构建数字世界",
    "连接创意与技术",
    "探索无限可能",
    "打造完美体验",
    "汇聚精彩内容"
  ];
  
  // 监听进度变化，完成时触发回调
  useEffect(() => {
    if (progress >= 100) {
      onLoadingComplete();
    }
  }, [progress, onLoadingComplete]);
  
  // 随机切换加载文案
  useEffect(() => {
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
      setLoadingText(loadingPhrases[randomIndex]);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, []);
  
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="logo-container">
          <h1 className="logo-text">Lninn's Space</h1>
          <div className="logo-animation">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="loading-text">
          <span className="phrase">{loadingText}</span>
          <span className="dots">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </div>
        
        <p className="splash-message">{text}</p>
      </div>
    </div>
  );
};

export default SplashScreen;