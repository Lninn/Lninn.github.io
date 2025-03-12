import './ModeIndicator.css'

export default function ModeIndicator({ mode, cycles }) {
  const getModeText = (mode) => {
    switch (mode) {
      case 'focus':
        return '专注阅读';
      case 'break':
        return '短休息';
      case 'longBreak':
        return '长休息';
      default:
        return '未知模式';
    }
  };

  return (
    <div className="mode-indicator">
      <span className={`mode-badge ${mode}`}>
        {getModeText(mode)}
      </span>
      <span className="cycles-count">第 {cycles} 个周期</span>
    </div>
  );
}
