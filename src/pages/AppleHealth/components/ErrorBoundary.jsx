import React from 'react';
import { Message } from './UIComponents';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Apple Health 应用错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#fff2f0', 
          border: '1px solid #ffccc7',
          borderRadius: '4px',
          margin: '20px 0'
        }}>
          <h3>应用出现错误</h3>
          <p>很抱歉，应用处理数据时遇到问题。</p>
          <p>错误信息: {this.state.error && this.state.error.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
