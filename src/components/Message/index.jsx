import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import './styles.css';

const MessageComponent = ({ type, content, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className={`message ${type} ${isExiting ? 'fade-out' : ''}`}>
      <span className="message-icon">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span className="message-content">{content}</span>
    </div>,
    document.body
  );
};

let messageContainer = null;
let root = null;

const Message = {
  success: (content) => {
    if (messageContainer) {
      root.unmount();
      document.body.removeChild(messageContainer);
    }
    
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
    
    root = createRoot(messageContainer);
    root.render(
      <MessageComponent 
        type="success" 
        content={content}
        onClose={() => {
          root.unmount();
          document.body.removeChild(messageContainer);
          messageContainer = null;
          root = null;
        }}
      />
    );
  },

  error: (content) => {
    if (messageContainer) {
      root.unmount();
      document.body.removeChild(messageContainer);
    }
    
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
    
    root = createRoot(messageContainer);
    root.render(
      <MessageComponent 
        type="error" 
        content={content}
        onClose={() => {
          root.unmount();
          document.body.removeChild(messageContainer);
          messageContainer = null;
          root = null;
        }}
      />
    );
  }
};

export default Message;
