import { useState } from 'react';
import './index.css';

// 导入自定义 Hook
import useTimer from './hooks/useTimer';
import useRecords from './hooks/useRecords';

// 导入组件
import TimerHeader from './components/TimerHeader';
import ModeIndicator from './components/ModeIndicator';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SettingsPanel from './components/SettingsPanel';
import TimerTips from './components/TimerTips';
import RecordsPanel from './components/RecordsPanel';

export default function ReadingTimer() {
  const [showSettings, setShowSettings] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  
  // 初始化记录管理
  const { records, addRecord, clearRecords, getStats } = useRecords();
  
  // 初始化计时器，并传入会话完成的回调
  const timer = useTimer({
    focusTime: 25, // 专注时间（分钟）
    breakTime: 5,  // 休息时间（分钟）
    longBreakTime: 15, // 长休息时间（分钟）
    longBreakInterval: 4, // 几个周期后长休息
    soundOption: 'bell', // 默认使用bell.mp3
  }, addRecord);
  
  // 切换设置面板
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (timer.isRunning) {
      timer.toggleTimer(); // 暂停计时器
    }
    setShowRecords(false); // 关闭记录面板
  };
  
  // 切换记录面板
  const toggleRecords = () => {
    setShowRecords(!showRecords);
    setShowSettings(false); // 关闭设置面板
  };
  
  // 应用设置
  const applySettings = (newSettings) => {
    timer.updateSettings(newSettings);
    setShowSettings(false);
  };
  
  return (
    <div className="reading-timer-container">
      <div className="timer-card">
        <TimerHeader 
          onSettingsClick={toggleSettings} 
          onRecordsClick={toggleRecords} 
        />
        
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
        
        {showRecords && (
          <RecordsPanel 
            records={records}
            stats={getStats()}
            onClear={clearRecords}
            onClose={() => setShowRecords(false)}
          />
        )}
        
        <TimerTips />
      </div>
    </div>
  );
}
