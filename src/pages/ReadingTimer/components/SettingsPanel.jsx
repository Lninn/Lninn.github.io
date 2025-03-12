import { useState } from 'react';

export default function SettingsPanel({ settings, onCancel, onApply }) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: parseInt(value, 10)
    });
  };
  
  const handleApply = () => {
    onApply(localSettings);
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