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
  
  // 使用分位数方法计算强度，更好地反映数据分布
  // 0: 0
  // 1: 1-25% 的数据
  // 2: 26-50% 的数据
  // 3: 51-75% 的数据
  // 4: 76-100% 的数据
  const ratio = count / maxCount;
  
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
};

// 格式化日期
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
