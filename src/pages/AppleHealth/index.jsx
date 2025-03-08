import { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import HealthDataCalendar from './components/HealthDataCalendar';
import { Message, Upload, Progress, Card, Spin, InboxIcon } from './components/UIComponents';
import { saveHealthData, loadHealthData, getAllCachedData, clearCacheItem, clearAllCache, formatDateTime } from './utils/cacheManager';
import './index.css';

export default function AppleHealthPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [healthData, setHealthData] = useState(null);
  const [cachedFiles, setCachedFiles] = useState([]);
  const [showCacheManager, setShowCacheManager] = useState(false);
  const [lastProcessed, setLastProcessed] = useState(null);
  const workerRef = useRef(null);
  const currentFileRef = useRef(null);

  // 加载缓存文件列表
  useEffect(() => {
    loadCachedFilesList();
  }, []);

  const loadCachedFilesList = async () => {
    try {
      const cachedData = await getAllCachedData();
      setCachedFiles(cachedData);
    } catch (error) {
      console.error('加载缓存列表失败:', error);
    }
  };

  const handleFileUpload = async (file) => {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      Message.error('请上传 Apple Health 导出的 zip 文件');
      return false;
    }

    // 保存当前文件引用
    currentFileRef.current = file;
    
    // 尝试从缓存加载数据
    try {
      setLoading(true);
      setProgress(0);
      setProgressText('检查缓存数据...');
      
      const cachedData = await loadHealthData(file);
      
      if (cachedData) {
        // 使用缓存数据
        setProgressText('从缓存加载数据...');
        setProgress(100);
        setHealthData(cachedData.data);
        setLastProcessed(formatDateTime(cachedData.timestamp));
        setLoading(false);
        Message.success(`已从缓存加载数据 (${formatDateTime(cachedData.timestamp)})`);
        return false;
      }
      
      // 没有缓存，继续处理文件
      setProgress(0);
      setProgressText('正在解压文件...');
      setHealthData(null);

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
      var xmlContent = await exportXmlFile.async('string');
      
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
      
      worker.onmessage = async (e) => {
        const { type, data } = e.data;
        
        if (type === 'progress') {
          setProgress(data.progress);
          setProgressText(data.message);
        } else if (type === 'result') {
          setHealthData(data);
          setProgress(100);
          setProgressText('处理完成，正在保存缓存...');
          
          // 保存到缓存
          try {
            await saveHealthData(file, data);
            // 更新缓存文件列表
            loadCachedFilesList();
            const now = new Date();
            setLastProcessed(formatDateTime(now.getTime()));
          } catch (cacheError) {
            console.error('保存缓存失败:', cacheError);
          }
          
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
         
        xmlContent = null;
      }, 1000);
    } catch (error) {
      console.error('处理文件时出错:', error);
      Message.error(`处理文件时出错: ${error.message}`);
      setLoading(false);
    }
    
    return false; // 阻止默认上传行为
  };

  // 处理清除单个缓存
  const handleClearCacheItem = async (fileId, fileName) => {
    try {
      await clearCacheItem(fileId);
      Message.success(`已清除缓存: ${fileName}`);
      loadCachedFilesList();
    } catch (error) {
      Message.error(`清除缓存失败: ${error.message}`);
    }
  };

  // 处理清除所有缓存
  const handleClearAllCache = async () => {
    try {
      await clearAllCache();
      Message.success('已清除所有缓存');
      setCachedFiles([]);
    } catch (error) {
      Message.error(`清除所有缓存失败: ${error.message}`);
    }
  };

  // 从缓存加载特定数据
  const handleLoadFromCache = async (cachedItem) => {
    setHealthData(cachedItem.data);
    setLastProcessed(formatDateTime(cachedItem.timestamp));
    setShowCacheManager(false);
  };

  // 渲染缓存管理器
  const renderCacheManager = () => {
    return (
      <Card title="缓存管理" className="cache-manager-card">
        <div className="cache-controls">
          <button 
            className="clear-all-button" 
            onClick={handleClearAllCache}
            disabled={cachedFiles.length === 0}
          >
            清除所有缓存
          </button>
          <button 
            className="close-button" 
            onClick={() => setShowCacheManager(false)}
          >
            关闭
          </button>
        </div>
        
        {cachedFiles.length === 0 ? (
          <p className="no-cache">没有缓存数据</p>
        ) : (
          <div className="cache-list">
            {cachedFiles.map(item => (
              <div key={item.id} className="cache-item">
                <div className="cache-info">
                  <div className="cache-name">{item.fileName}</div>
                  <div className="cache-date">处理时间: {formatDateTime(item.timestamp)}</div>
                  <div className="cache-size">文件大小: {(item.fileSize / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
                <div className="cache-actions">
                  <button 
                    className="load-button" 
                    onClick={() => handleLoadFromCache(item)}
                  >
                    加载
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleClearCacheItem(item.id, item.fileName)}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="apple-health-container">
      <h1>Apple Health 数据可视化</h1>
      
      <div className="header-actions">
        <button 
          className="cache-manager-button" 
          onClick={() => setShowCacheManager(!showCacheManager)}
        >
          {showCacheManager ? '隐藏缓存管理' : '缓存管理'}
        </button>
      </div>
      
      {showCacheManager && renderCacheManager()}
      
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
        
        {lastProcessed && !loading && (
          <div className="last-processed">
            <p>上次处理时间: {lastProcessed}</p>
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
