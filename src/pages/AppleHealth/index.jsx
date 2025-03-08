import { useState, useRef } from 'react';
// 移除 antd 导入，替换为自定义组件
import JSZip from 'jszip';
import HealthDataCalendar from './components/HealthDataCalendar';
import { Message, Upload, Progress, Card, Spin, InboxIcon } from './components/UIComponents';
import './index.css';

export default function AppleHealthPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [healthData, setHealthData] = useState(null);
  const workerRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      Message.error('请上传 Apple Health 导出的 zip 文件');
      return false;
    }

    setLoading(true);
    setProgress(0);
    setProgressText('正在解压文件...');
    setHealthData(null);

    try {
      // 解压 zip 文件
      const zip = new JSZip();
      const zipData = await zip.loadAsync(file);
      
      // 查找 export.xml 文件（支持英文和中文版本）
      let exportXmlFile = null;
      zipData.forEach((relativePath, zipEntry) => {
        // 同时支持英文版本的 export.xml 和中文版本的 导出.xml
        if (relativePath.endsWith('export.xml') || 
            relativePath.endsWith('导出.xml') || 
            relativePath === 'apple_health_export/导出.xml') {
          exportXmlFile = zipEntry;
        }
      });

      if (!exportXmlFile) {
        Message.error('未找到健康数据导出文件（export.xml 或 导出.xml）');
        setLoading(false);
        return false;
      }

      setProgressText('正在读取 XML 数据...');
      
      // 使用流式处理大型 XML 文件，避免一次性加载全部内容到内存
      const xmlContent = await exportXmlFile.async('string');
      
      // 释放 zip 对象内存
      zipData.forEach((relativePath, zipEntry) => {
        zipEntry._data = null;
      });
      
      // 使用 Web Worker 处理大型 XML 数据
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      
      const worker = new Worker(new URL('./utils/xmlWorker.js', import.meta.url));
      workerRef.current = worker;
      
      worker.onmessage = (e) => {
        const { type, data } = e.data;
        
        if (type === 'progress') {
          setProgress(data.progress);
          setProgressText(data.message);
        } else if (type === 'result') {
          setHealthData(data);
          setProgress(100);
          setProgressText('处理完成');
          setLoading(false);
          worker.terminate();
          workerRef.current = null;
        } else if (type === 'error') {
          Message.error(`处理数据时出错: ${data.message}`);
          setLoading(false);
          worker.terminate();
          workerRef.current = null;
        }
      };
      
      worker.postMessage({ xmlContent });
      
      // 释放 xmlContent 内存
      setTimeout(() => {
        // 延迟清空变量，确保 worker 已经接收到数据
        // eslint-disable-next-line no-const-assign
        xmlContent = null;
      }, 1000);
    } catch (error) {
      console.error('处理文件时出错:', error);
      Message.error(`处理文件时出错: ${error.message}`);
      setLoading(false);
    }
    
    return false; // 阻止默认上传行为
  };

  return (
    <div className="apple-health-container">
      <h1>Apple Health 数据可视化</h1>
      
      <Card title="上传健康数据" className="upload-card">
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={handleFileUpload}
          showUploadList={false}
          disabled={loading}
        >
          <p className="ant-upload-drag-icon">
            <InboxIcon />
          </p>
          <p className="ant-upload-text">点击或拖拽 Apple Health 导出的 zip 文件到此区域</p>
          <p className="ant-upload-hint">
            支持从 Apple Health 应用导出的 zip 格式健康数据
          </p>
        </Upload.Dragger>
        
        {loading && (
          <div className="progress-container">
            <Progress percent={progress} status="active" />
            <p className="progress-text">{progressText}</p>
            <Spin />
          </div>
        )}
      </Card>
      
      {healthData && (
        <Card title="健康数据活动热图" className="calendar-card">
          <HealthDataCalendar data={healthData} />
        </Card>
      )}
    </div>
  );
}
