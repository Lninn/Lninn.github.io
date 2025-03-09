import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { Message, Upload, Progress, Card, Spin, InboxIcon } from '../components/UIComponents';
import { saveHealthData, loadHealthData, getAllCachedData, clearCacheItem, clearAllCache } from '../utils/cacheManager';
import CacheManager from '../components/CacheManager';
import ErrorBoundary from '../components/ErrorBoundary';
import '../index.css';

export default function DataProcessingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [cachedFiles, setCachedFiles] = useState([]);
  const [showCacheManager, setShowCacheManager] = useState(false);
  // 删除未使用的状态变量
  const [logs, setLogs] = useState([]);
  const workerRef = useRef(null);
  const currentFileRef = useRef(null);

  // 加载缓存文件列表
  useEffect(() => {
    loadCachedFilesList();
  }, []);

  // 添加日志函数
  const addLog = (message) => {
    setLogs(prevLogs => [...prevLogs, { time: new Date().toLocaleTimeString(), message }]);
  };

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
    // 清空之前的日志
    setLogs([]);
  
    console.log(`开始处理文件: ${file.name}, 大小: ${Math.round(file.size / 1024)} KB`);
    addLog(`开始处理文件: ${file.name}, 大小: ${Math.round(file.size / 1024)} KB`);
    
    const zip = new JSZip();
    try {
      const zipData = await zip.loadAsync(file);
      console.log('ZIP 文件加载成功，查找 XML 文件');
      
      // 列出所有文件
      const fileList = Object.keys(zipData.files);
      console.log('ZIP 内文件列表:', fileList);
      
      const exportXmlFile = findExportXmlFile(zipData);
      if (!exportXmlFile) {
        console.error('未找到 export.xml 文件');
        throw new Error('未找到健康数据导出文件（export.xml 或 导出.xml）');
      }
      
      console.log('找到 XML 文件，开始读取内容');
      setProgressText('正在读取 XML 数据...');
      const xmlContent = await exportXmlFile.async('string');
      console.log(`XML 内容读取完成，大小约 ${Math.round(xmlContent.length / 1024)} KB`);
      
      // 释放 zip 对象内存
      zipData.forEach((relativePath, zipEntry) => {
        zipEntry._data = null;
      });
      
      // 使用 Web Worker 处理数据
      const result = await processXmlWithWorker(xmlContent);
      
      // 保存结果
      await saveResult(file, result);
      
      return result;
    } catch (error) {
      console.error('处理健康数据文件时发生错误:', error);
      throw error;
    }
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
    
    console.log('创建新的 Worker 实例');
    addLog('创建新的 Worker 实例');
    
    workerRef.current = new Worker(new URL('../utils/xmlWorker.js', import.meta.url), {
      type: 'module'
    });

    try {
      const result = await new Promise((resolve, reject) => {
        workerRef.current.onmessage = (e) => {
          const { type, data } = e.data;
          console.log(`收到 Worker 消息: ${type}`);
          addLog(`收到 Worker 消息: ${type}`);
          
          if (type === 'result') {
            console.log('处理完成，收到结果数据');
            addLog('处理完成，收到结果数据');
            resolve(data);
          } else if (type === 'progress') {
            setProgress(data.progress);
            setProgressText(data.message);
          } else if (type === 'error') {
            console.error('Worker 处理错误:', data.message);
            addLog(`错误: ${data.message}`);
            reject(new Error(data.message));
          }
        };
        
        workerRef.current.onerror = (error) => {
          console.error('Worker 错误:', error);
          addLog(`Worker 错误: ${error.message}`);
          reject(error);
        };
        
        console.log('发送数据到 Worker 处理');
        addLog('发送数据到 Worker 处理');
        workerRef.current.postMessage({ xmlContent });
      });
      
      return result;

    } finally {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    }
  };

  // 保存处理结果
  const saveResult = async (file, result) => {
    try {
      setProgressText('正在保存数据...');
      await saveHealthData(file, result);
      // 删除对 setLastProcessed 的调用
      setProgressText('数据处理完成');
      setProgress(100);
      
      // 重新加载缓存列表
      await loadCachedFilesList();
      
      // 显示成功消息
      Message.success('健康数据处理完成');
      
      // 导航到可视化页面
      navigate('/data-visual', { state: { data: result } });
    } catch (error) {
      console.error('保存结果失败:', error);
      throw error;
    }
  };

  // 从缓存加载数据
  const handleLoadFromCache = async (cachedData) => {
    try {
      setProgressText('从缓存加载数据...');
      setProgress(50);
      
      // 模拟加载过程
      setTimeout(() => {
        setProgress(100);
        setProgressText('数据加载完成');
        // 删除对 setLastProcessed 的调用
        
        // 显示成功消息
        Message.success('从缓存加载数据成功');
        
        // 导航到可视化页面
        navigate('/data-visual', { state: { data: cachedData.data } });
      }, 500);
    } catch (error) {
      console.error('从缓存加载数据失败:', error);
      throw error;
    }
  };

  // 处理从缓存管理器加载数据
  const handleLoadCachedData = async (fileId) => {
    try {
      setLoading(true);
      setProgress(0);
      setProgressText('正在加载缓存数据...');
      
      // 查找缓存数据
      const cachedItem = cachedFiles.find(item => item.id === fileId);
      if (!cachedItem) {
        throw new Error('未找到缓存数据');
      }
      
      // 关闭缓存管理器
      setShowCacheManager(false);
      
      // 加载缓存数据
      await handleLoadFromCache(cachedItem);
    } catch (error) {
      console.error('加载缓存数据失败:', error);
      Message.error(`加载缓存数据失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 处理删除缓存数据
  const handleDeleteCachedData = async (fileId) => {
    try {
      await clearCacheItem(fileId);
      
      // 重新加载缓存列表
      await loadCachedFilesList();
      
      Message.success('缓存数据已删除');
    } catch (error) {
      console.error('删除缓存数据失败:', error);
      Message.error(`删除缓存数据失败: ${error.message}`);
    }
  };

  // 处理清除所有缓存
  const handleClearAllCache = async () => {
    try {
      await clearAllCache();
      
      // 重新加载缓存列表
      await loadCachedFilesList();
      
      Message.success('所有缓存数据已清除');
    } catch (error) {
      console.error('清除所有缓存数据失败:', error);
      Message.error(`清除所有缓存数据失败: ${error.message}`);
    }
  };

  return (
    <ErrorBoundary>
      <div className="apple-health-container">
        <div className="header-actions">
          <button 
            className="cache-manager-button" 
            onClick={() => setShowCacheManager(!showCacheManager)}
          >
            {showCacheManager ? '关闭缓存管理' : '缓存管理'}
          </button>
        </div>
        
        {showCacheManager && (
          <CacheManager 
            cachedFiles={cachedFiles}
            onLoadCache={handleLoadCachedData}
            onDeleteCache={handleDeleteCachedData}
            onClearAll={handleClearAllCache}
            onClose={() => setShowCacheManager(false)}
          />
        )}
        
        <Card title="上传 Apple Health 数据" className="upload-card">
          <Upload.Dragger
            beforeUpload={handleFileUpload}
            disabled={loading}
          >
            <div style={{ padding: '20px 0' }}>
              <p className="upload-icon">
                <InboxIcon />
              </p>
              <p className="upload-text">点击或拖拽文件到此区域上传</p>
              <p className="upload-hint">
                支持从 Apple Health 应用导出的 ZIP 文件
              </p>
            </div>
          </Upload.Dragger>
          
          {loading && (
            <div className="progress-container">
              <Progress percent={progress} />
              <span className="progress-status">{progressText}</span>
            </div>
          )}
          
          {logs.length > 0 && (
            <div className="logs-container" style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto' }}>
              <h4>处理日志</h4>
              {logs.map((log, index) => (
                <div key={index} className="log-item">
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </ErrorBoundary>
  );
}
