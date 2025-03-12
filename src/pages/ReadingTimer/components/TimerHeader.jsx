import SettingsIcon from './SettingsIcon';
import RecordButton from './RecordButton';
import './TimerHeader.css'

export default function TimerHeader({ onSettingsClick, onRecordsClick }) {
  return (
    <div className="timer-header">
      <h2>专注阅读计时器</h2>
      <div className="header-buttons">
        <RecordButton onClick={onRecordsClick} />
        <button 
          className="settings-button" 
          onClick={onSettingsClick}
          aria-label="设置"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}
