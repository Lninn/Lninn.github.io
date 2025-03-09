import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HealthDataCalendar from './HealthDataCalendar';
import DataAnalysis from './DataAnalysis';
import { Card, Spin, ErrorBoundary } from '../components';


export default function DataVisualizationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从路由状态中获取数据
    if (location.state && location.state.data) {
      setHealthData(location.state.data);
    } else {
      // 如果没有数据，重定向回数据处理页面
      // 修改:
      // navigate('/apple-health');
      // 改为:
      // navigate('/');
    }
    setLoading(false);
  }, [location, 1]);

  const handleBackToUpload = () => {
    navigate('/dashboard/apple-health');
  };

  if (loading) {
    return (
      <div className="apple-health-container" style={{ textAlign: 'center', padding: '50px' }}>
        <Spin />
        <p>加载数据中...</p>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="apple-health-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>未找到健康数据</h3>
          <p>请先上传并处理 Apple Health 数据</p>
          <button 
            onClick={handleBackToUpload}
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
            返回上传页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="apple-health-container">
        <div className="header-actions">
          <button 
            className="cache-manager-button" 
            onClick={handleBackToUpload}
          >
            返回上传页面
          </button>
        </div>

        <Card title="健康数据日历视图" className="calendar-card">
          <HealthDataCalendar data={healthData} />
        </Card>

        <Card title="健康数据分析" className="analysis-card" style={{ marginTop: '20px' }}>
          <DataAnalysis data={healthData} />
        </Card>
      </div>
    </ErrorBoundary>
  );
}
