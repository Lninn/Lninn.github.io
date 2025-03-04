import { useEffect } from 'react';
import './index.css';

export default function Notification({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">
        {type === 'success' ? '✓' : '✕'}
      </span>
      <span className="notification-message">{message}</span>
    </div>
  );
}