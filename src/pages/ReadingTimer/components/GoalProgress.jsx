import './GoalProgress.css';

export default function GoalProgress({ current, goal }) {
  const percentage = Math.min(100, Math.round((current / goal) * 100));
  
  return (
    <div className="goal-progress">
      <div className="goal-header">
        <span>今日专注目标</span>
        <span>{current} / {goal} 分钟</span>
      </div>
      <div className="goal-bar">
        <div 
          className="goal-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}