import './styles.css';

const LoadingSpinner = ({ fullScreen = false, size = 'medium', text = '加载中...' }) => {
  const spinnerClass = `loading-spinner ${size} ${fullScreen ? 'fullscreen' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner-container">
        <div className="spinner"></div>
        {text && <div className="spinner-text">{text}</div>}
      </div>
    </div>
  );
};

export default LoadingSpinner;