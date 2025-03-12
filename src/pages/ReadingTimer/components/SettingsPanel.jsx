import { useState, useEffect, useRef } from 'react';
import './SettingsPanel.css'

// 在 SettingsPanel 组件中添加专注目标设置
export default function SettingsPanel({ settings, onCancel, onApply }) {
  const [localSettings, setLocalSettings] = useState({
    ...settings,
    dailyGoal: settings.dailyGoal || 120, // 默认每日目标120分钟
    volume: settings.volume || 1.0
  });
  const testAudioRef = useRef(null);
  
  // 初始化测试音频
  useEffect(() => {
    const soundMap = {
      bell: '/sounds/bell.mp3',
      complete: '/sounds/complete.mp3',
      meditation: '/sounds/meditation-bell.mp3'
    };
    
    testAudioRef.current = new Audio(soundMap[localSettings.soundOption]);
    
    return () => {
      if (testAudioRef.current) {
        testAudioRef.current.pause();
        testAudioRef.current = null;
      }
    };
  }, [localSettings.soundOption]);
  
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: name === 'soundOption' ? value : parseInt(value, 10)
    });
  };
  
  const handleApply = () => {
    onApply(localSettings);
  };
  
  // 测试音频
  const testSound = () => {
    if (testAudioRef.current) {
      testAudioRef.current.volume = localSettings.volume;
      testAudioRef.current.currentTime = 0;
      testAudioRef.current.play();
    }
  };
  
  return (
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
            value={localSettings.focusTime}
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
            value={localSettings.breakTime}
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
            value={localSettings.longBreakTime}
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
            value={localSettings.longBreakInterval}
            onChange={handleSettingChange}
          />
        </div>
        
        <div className="setting-group">
          <label htmlFor="dailyGoal">每日专注目标 (分钟)</label>
          <input 
            type="number" 
            id="dailyGoal"
            name="dailyGoal"
            min="10"
            max="480"
            value={localSettings.dailyGoal}
            onChange={handleSettingChange}
          />
        </div>
        
        <div className="setting-group">
          <label htmlFor="soundOption">提示音效</label>
          <div className="sound-option-container">
            <select
              id="soundOption"
              name="soundOption"
              value={localSettings.soundOption}
              onChange={handleSettingChange}
            >
              <option value="bell">铃声</option>
              <option value="complete">完成音</option>
              <option value="meditation">冥想钟</option>
            </select>
            <button 
              type="button" 
              className="test-sound-button" 
              onClick={testSound}
              aria-label="测试音效"
            >
              测试
            </button>
          </div>
        </div>
        
        <div className="setting-group">
          <label htmlFor="volume">音量</label>
          <div className="volume-control">
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="0.1"
              value={localSettings.volume}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                volume: parseFloat(e.target.value)
              })}
            />
            <span className="volume-value">{Math.round(localSettings.volume * 100)}%</span>
          </div>
        </div>
        
        <div className="settings-actions">
          <button 
            className="cancel-button" 
            onClick={onCancel}
          >
            取消
          </button>
          <button 
            className="apply-button" 
            onClick={handleApply}
          >
            应用
          </button>
        </div>
      </div>
    </div>
  );
}
