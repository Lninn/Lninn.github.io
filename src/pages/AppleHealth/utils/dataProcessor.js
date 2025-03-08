// 处理 XML 数据的辅助函数
export const processXMLData = () => {
  return new Promise((resolve, reject) => {
    try {
      // 这些函数在 Web Worker 中实现，这里只是为了在主线程中有备用
      // 实际处理会在 xmlWorker.js 中进行
      resolve({ message: '数据处理已转移到 Web Worker' });
    } catch (error) {
      reject(error);
    }
  });
};

// 获取颜色强度，用于热图
export const getColorIntensity = (count, maxCount) => {
  if (count === 0) return 0;
  if (maxCount === 0) return 0; // 防止除以零错误
  
  // 使用对数比例更好地显示数据差异
  const logBase = 4;
  const logMax = Math.log(maxCount + 1) / Math.log(logBase);
  const logCount = Math.log(count + 1) / Math.log(logBase);
  
  const intensity = Math.min(Math.ceil((logCount / logMax) * 4), 4);
  return intensity;
};

// 格式化日期
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
