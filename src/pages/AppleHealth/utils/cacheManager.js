// 健康数据缓存管理工具
const DB_NAME = 'AppleHealthDB';
const STORE_NAME = 'healthData';
const DB_VERSION = 1;

// 打开数据库连接
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      reject(new Error('无法打开数据库'));
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // 创建对象存储，使用 id 作为键
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        // 创建索引
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// 生成文件哈希值（简化版，实际应用可能需要更复杂的哈希算法）
const generateFileHash = async (file) => {
  // 使用文件名和大小作为简单标识
  // 实际应用中可以使用 Web Crypto API 计算真正的哈希值
  return `${file.name}-${file.size}-${file.lastModified}`;
};

// 保存健康数据到缓存
export const saveHealthData = async (file, data) => {
  try {
    const db = await openDB();
    const fileId = await generateFileHash(file);
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // 存储数据，包括时间戳和文件信息
    await store.put({
      id: fileId,
      data: data,
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().getTime(),
    });
    
    return fileId;
  } catch (error) {
    console.error('保存缓存数据失败:', error);
    throw error;
  }
};

// 从缓存加载健康数据
export const loadHealthData = async (file) => {
  try {
    const db = await openDB();
    const fileId = await generateFileHash(file);
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(fileId);
      
      request.onsuccess = (event) => {
        const result = event.target.result;
        if (result) {
          resolve(result);
        } else {
          resolve(null); // 没有找到缓存数据
        }
      };
      
      request.onerror = () => {
        reject(new Error('读取缓存数据失败'));
      };
    });
  } catch (error) {
    console.error('加载缓存数据失败:', error);
    return null;
  }
};

// 获取所有缓存的健康数据列表
export const getAllCachedData = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    
    return new Promise((resolve, reject) => {
      const request = index.getAll();
      
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      
      request.onerror = () => {
        reject(new Error('获取缓存列表失败'));
      };
    });
  } catch (error) {
    console.error('获取缓存列表失败:', error);
    return [];
  }
};

// 清除指定的缓存数据
export const clearCacheItem = async (fileId) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(fileId);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject(new Error('删除缓存数据失败'));
      };
    });
  } catch (error) {
    console.error('删除缓存数据失败:', error);
    throw error;
  }
};

// 清除所有缓存数据
export const clearAllCache = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject(new Error('清除所有缓存数据失败'));
      };
    });
  } catch (error) {
    console.error('清除所有缓存数据失败:', error);
    throw error;
  }
};

// 格式化日期时间
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};
