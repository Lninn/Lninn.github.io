import SettingsIcon from './SettingsIcon';

export default function TimerHeader({ onSettingsClick }) {
  return (
    <div className="timer-header">
      <h2>专注阅读计时器</h2>
      <button 
        className="settings-button" 
        onClick={onSettingsClick}
        aria-label="设置"
      >
        <SettingsIcon />
      </button>
    </div>
  );
}