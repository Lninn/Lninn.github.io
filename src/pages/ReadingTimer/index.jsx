import { useState } from 'react';
import './index.css';

// 导入自定义 Hook
import useTimer from './hooks/useTimer';

// 导入组件
import TimerHeader from './components/TimerHeader';
import ModeIndicator from './components/ModeIndicator';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SettingsPanel from './components/SettingsPanel';
import TimerTips from './components/TimerTips';

export default function ReadingTimer() {
  const [showSettings, setShowSettings] = useState(false);
  
  // 初始化计时器
  const timer = useTimer({
    focusTime: 25, // 专注时间（分钟）
    breakTime: 5,  // 休息时间（分钟）
    longBreakTime: 15, // 长休息时间（分钟）
    longBreakInterval: 4, // 几个周期后长休息
    soundOption: 'bell', // 默认使用bell.mp3
  });
  
  // 切换设置面板
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (timer.isRunning) {
      timer.toggleTimer(); // 暂停计时器
    }
  };
  
  // 应用设置
  const applySettings = (newSettings) => {
    timer.updateSettings(newSettings);
    setShowSettings(false);
  };
  
  return (
    <div className="reading-timer-container">
      <div className="timer-card">
        <TimerHeader onSettingsClick={toggleSettings} />
        
        <ModeIndicator mode={timer.mode} cycles={timer.cycles} />
        
        <TimerDisplay 
          timeText={timer.formatTime(timer.timeLeft)} 
          progress={timer.calculateProgress()} 
        />
        
        <TimerControls 
          isRunning={timer.isRunning} 
          onToggle={timer.toggleTimer} 
          onReset={timer.resetTimer} 
        />
        
        {showSettings && (
          <SettingsPanel 
            settings={timer.settings} 
            onCancel={() => setShowSettings(false)} 
            onApply={applySettings} 
          />
        )}
        
        <TimerTips />
      </div>
    </div>
  );
}
