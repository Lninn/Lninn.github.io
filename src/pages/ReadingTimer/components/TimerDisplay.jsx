export default function TimerDisplay({ timeText, progress }) {
  return (
    <div className="timer-display">
      <div className="time-text">{timeText}</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}