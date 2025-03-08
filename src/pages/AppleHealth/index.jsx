import { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import HealthDataCalendar from './components/HealthDataCalendar';
import DataAnalysis from './components/DataAnalysis';
import { Message, Upload, Progress, Card, Spin, InboxIcon } from './components/UIComponents';
import { saveHealthData, loadHealthData, getAllCachedData, clearCacheItem, clearAllCache, formatDateTime } from './utils/cacheManager';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

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

  // 处理文件上传
  const handleFileUpload = async (file) => {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      Message.error('请上传 Apple Health 导出的 zip 文件');
      return false;
    }

    currentFileRef.current = file;
    
    try {
      setLoading(true);
      setProgress(0);
      setProgressText('检查缓存数据...');
      
      const cachedData = await loadHealthData(file);
      
      if (cachedData) {
        await handleLoadFromCache(cachedData);
        return false;
      }
      
      await processHealthFile(file);
    } catch (error) {
      console.error('处理健康数据文件失败:', error);
      Message.error(`处理文件失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
    
    return false;
  };

  // 处理健康数据文件
  const processHealthFile = async (file) => {
    setProgress(0);
    setProgressText('正在解压文件...');
    setHealthData(null);

    const zip = new JSZip();
    const zipData = await zip.loadAsync(file);
    
    const exportXmlFile = findExportXmlFile(zipData);
    if (!exportXmlFile) {
      throw new Error('未找到健康数据导出文件（export.xml 或 导出.xml）');
    }

    setProgressText('正在读取 XML 数据...');
    const xmlContent = await exportXmlFile.async('string');
    
    // 释放 zip 对象内存
    zipData.forEach((relativePath, zipEntry) => {
      zipEntry._data = null;
    });
    
    // 使用 Web Worker 处理数据
    const result = await processXmlWithWorker(xmlContent);
    
    // 保存结果
    await saveResult(file, result);
    
    return result;
  };

  // 查找导出的 XML 文件
  const findExportXmlFile = (zipData) => {
    let exportXmlFile = null;
    zipData.forEach((relativePath, zipEntry) => {
      if (relativePath.endsWith('export.xml') || 
          relativePath.endsWith('导出.xml') || 
          relativePath === 'apple_health_export/导出.xml' ||
          relativePath === 'apple_health_export/export.xml') {
        exportXmlFile = zipEntry;
      }
    });
    return exportXmlFile;
  };

  // 使用 Web Worker 处理 XML 数据
  const processXmlWithWorker = async (xmlContent) => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    
    workerRef.current = new Worker(new URL('./utils/xmlWorker.js', import.meta.url));
    
    try {
      const result = await new Promise((resolve, reject) => {
        workerRef.current.onmessage = (e) => {
          const { type, data } = e.data;
          if (type === 'result') {
            resolve(data);
          } else if (type === 'error') {
            reject(new Error(data.message));
          } else if (type === 'progress') {
            setProgress(data.progress);
            setProgressText(data.message);
          }
        };
        
        workerRef.current.onerror = (error) => {
          reject(new Error(`Worker 错误: ${error.message}`));
        };
        
        workerRef.current.postMessage({ xmlContent });
      });
      
      return result;
    } finally {
      // 清理 Worker
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    }
  };

  // 保存处理结果
  const saveResult = async (file, result) => {
    try {
      await saveHealthData(file, result);
      await loadCachedFilesList();
      setHealthData(result);
      setLastProcessed(formatDateTime(new Date().getTime()));
      Message.success('健康数据处理完成');
    } catch (error) {
      console.error('保存数据失败:', error);
      // 仍然设置数据，但提示保存失败
      setHealthData(result);
      Message.warning('数据已处理，但保存到缓存失败');
    }
  };

  // 从缓存加载数据
  const handleLoadFromCache = async (cachedItem) => {
    try {
      setHealthData(cachedItem.data);
      setLastProcessed(formatDateTime(cachedItem.timestamp));
      setShowCacheManager(false);
      Message.success(`已从缓存加载数据 (${formatDateTime(cachedItem.timestamp)})`);
    } catch (error) {
      Message.error(`加载缓存数据失败: ${error.message}`);
    }
  };

  // 缓存管理相关函数
  const handleClearCacheItem = async (fileId, fileName) => {
    try {
      await clearCacheItem(fileId);
      Message.success(`已清除缓存: ${fileName}`);
      loadCachedFilesList();
    } catch (error) {
      Message.error(`清除缓存失败: ${error.message}`);
    }
  };

  const handleClearAllCache = async () => {
    try {
      await clearAllCache();
      Message.success('已清除所有缓存');
      loadCachedFilesList();
    } catch (error) {
      Message.error(`清除所有缓存失败: ${error.message}`);
    }
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
      <ErrorBoundary>
        <div className="header-actions">
          <button 
            className="cache-manager-button" 
            onClick={() => setShowCacheManager(!showCacheManager)}
          >
            {showCacheManager ? '隐藏缓存管理' : '缓存管理'}
          </button>
        </div>
        
        {showCacheManager && renderCacheManager()}
        
        <Card title="上传 Apple Health 数据" className="upload-card">
          <Upload.Dragger
            beforeUpload={handleFileUpload}
            disabled={loading}
          >
            <p className="upload-icon"><InboxIcon /></p>
            <p className="upload-text">点击或拖拽文件到此区域上传</p>
            <p className="upload-hint">请上传从 Apple Health 导出的 zip 文件</p>
          </Upload.Dragger>
          
          {loading && (
            <div className="progress-container">
              <Progress percent={progress} />
              <div className="progress-status">{progressText}</div>
            </div>
          )}
          
          {lastProcessed && (
            <div className="last-processed">
              上次处理时间: {lastProcessed}
            </div>
          )}
        </Card>
        
        {healthData && (
          <>
            <Card title="健康数据日历视图" className="calendar-card">
              <HealthDataCalendar data={healthData} />
            </Card>
            <Card title="数据分析" className="analysis-card">
              <DataAnalysis data={healthData} />
            </Card>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}

