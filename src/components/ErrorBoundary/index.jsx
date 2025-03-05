import { Component } from 'react'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // 可以在这里记录错误信息
    console.error('ErrorBoundary caught an error', error, errorInfo)
    this.setState({ errorInfo })
    
    // 这里可以添加错误上报逻辑，例如发送到服务器
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 自定义降级UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>页面出现了问题</h2>
            <p>很抱歉，页面加载过程中出现了错误。</p>
            {this.props.showDetails && this.state.error && (
              <details className="error-details">
                <summary>查看错误详情</summary>
                <p>{this.state.error.toString()}</p>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
            <button 
              className="retry-button"
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null })
                window.location.reload()
              }}
            >
              重新加载
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary