import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiSettings } from 'react-icons/fi';
import './index.css';

export default function ReadingTimer() {
  // 状态管理
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' 或 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 默认25分钟，以秒为单位
  const [settings, setSettings] = useState({
    focusTime: 25, // 专注时间（分钟）
    breakTime: 5,  // 休息时间（分钟）
    longBreakTime: 15, // 长休息时间（分钟）
    longBreakInterval: 4, // 几个周期后长休息
    soundOption: 'bell', // 默认使用bell.mp3
  });
  const [showSettings, setShowSettings] = useState(false);
  const [cycles, setCycles] = useState(0);
  
  // 音频引用
  const alarmSound = useRef(null);
  
  // 初始化音频
  useEffect(() => {
    alarmSound.current = new Audio('/sounds/bell.mp3'); // 确保有这个音频文件
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current = null;
      }
    };
  }, []);

  // 然后在初始化音频时使用选择的音效
  useEffect(() => {
    const soundMap = {
      bell: '/sounds/bell.mp3',
      complete: '/sounds/complete.mp3',
      meditation: '/sounds/meditation-bell.mp3'
    };
    
    alarmSound.current = new Audio(soundMap[settings.soundOption]);
    
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current = null;
      }
    };
  }, [settings.soundOption]);
  
  // 计时器逻辑
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // 时间到，播放提示音
      if (alarmSound.current) {
        alarmSound.current.play();
      }
      
      // 切换模式
      if (mode === 'focus') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        
        // 判断是否需要长休息
        if (newCycles % settings.longBreakInterval === 0) {
          setMode('longBreak');
          setTimeLeft(settings.longBreakTime * 60);
        } else {
          setMode('break');
          setTimeLeft(settings.breakTime * 60);
        }
      } else {
        setMode('focus');
        setTimeLeft(settings.focusTime * 60);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, settings, cycles]);
  
  // 格式化时间显示
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 计算进度条百分比
  const calculateProgress = () => {
    const totalTime = mode === 'focus' 
      ? settings.focusTime * 60 
      : mode === 'break' 
        ? settings.breakTime * 60 
        : settings.longBreakTime * 60;
    
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  
  // 处理开始/暂停
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  // 重置计时器
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setTimeLeft(settings.focusTime * 60);
    } else if (mode === 'break') {
      setTimeLeft(settings.breakTime * 60);
    } else {
      setTimeLeft(settings.longBreakTime * 60);
    }
  };
  
  // 切换设置面板
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (isRunning) {
      setIsRunning(false);
    }
  };
  
  // 更新设置
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseInt(value, 10)
    });
  };
  
  // 应用设置
  const applySettings = () => {
    // 根据当前模式重置时间
    if (mode === 'focus') {
      setTimeLeft(settings.focusTime * 60);
    } else if (mode === 'break') {
      setTimeLeft(settings.breakTime * 60);
    } else {
      setTimeLeft(settings.longBreakTime * 60);
    }
    setShowSettings(false);
  };
  
  return (
    <div className="reading-timer-container">
      <div className="timer-card">
        <div className="timer-header">
          <h2>专注阅读计时器</h2>
          <button 
            className="settings-button" 
            onClick={toggleSettings}
            aria-label="设置"
          >
            {/* 调整SVG大小和样式 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        
        <div className="mode-indicator">
          <span className={`mode-badge ${mode}`}>
            {mode === 'focus' ? '专注阅读' : mode === 'break' ? '短休息' : '长休息'}
          </span>
          <span className="cycles-count">第 {cycles + 1} 个周期</span>
        </div>
        
        <div className="timer-display">
          <div className="time-text">{formatTime(timeLeft)}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
        
        <div className="timer-controls">
          <button 
            className="control-button reset" 
            onClick={resetTimer}
            aria-label="重置"
          >
            {/* 调整SVG大小和样式 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: 'auto' }}>
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
          <button 
            className={`control-button ${isRunning ? 'pause' : 'play'}`} 
            onClick={toggleTimer}
            aria-label={isRunning ? "暂停" : "开始"}
          >
            {isRunning ? (
              /* 调整SVG大小和样式 */
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: 'auto' }}>
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              /* 调整SVG大小和样式 */
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: 'auto' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </div>
        
        {showSettings && (
          <div className="settings-panel">
            <h3>计时器设置</h3>
            <div className="settings-form">
              <div className="setting-group">
                <label htmlFor="focusTime">专注时间 (分钟)</label>
                <input 
                  type="number" 
                  id="focusTime"
                  name="focusTime"
                  min="1"
                  max="60"
                  value={settings.focusTime}
                  onChange={handleSettingChange}
                />
              </div>
              
              <div className="setting-group">
                <label htmlFor="breakTime">短休息时间 (分钟)</label>
                <input 
                  type="number" 
                  id="breakTime"
                  name="breakTime"
                  min="1"
                  max="30"
                  value={settings.breakTime}
                  onChange={handleSettingChange}
                />
              </div>
              
              <div className="setting-group">
                <label htmlFor="longBreakTime">长休息时间 (分钟)</label>
                <input 
                  type="number" 
                  id="longBreakTime"
                  name="longBreakTime"
                  min="5"
                  max="60"
                  value={settings.longBreakTime}
                  onChange={handleSettingChange}
                />
              </div>
              
              <div className="setting-group">
                <label htmlFor="longBreakInterval">长休息间隔 (周期数)</label>
                <input 
                  type="number" 
                  id="longBreakInterval"
                  name="longBreakInterval"
                  min="1"
                  max="10"
                  value={settings.longBreakInterval}
                  onChange={handleSettingChange}
                />
              </div>
              
              <div className="settings-actions">
                <button 
                  className="cancel-button" 
                  onClick={() => setShowSettings(false)}
                >
                  取消
                </button>
                <button 
                  className="apply-button" 
                  onClick={applySettings}
                >
                  应用
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="timer-tips">
          <h4>阅读小贴士</h4>
          <ul>
            <li>专注阅读期间避免分心</li>
            <li>休息时远眺窗外，让眼睛放松</li>
            <li>每完成4个周期，给自己一个长休息奖励</li>
            <li>休息时做些简单的伸展运动</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
