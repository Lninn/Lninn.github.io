// 导出数据工具函数

// 将数据导出为 JSON 文件
export const exportAsJson = (data, filename = 'apple-health-data.json') => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, filename);
};

// 将数据导出为 CSV 文件
export const exportAsCsv = (data, filename = 'apple-health-data.csv') => {
  if (!data || !data.data || !Array.isArray(data.data)) {
    throw new Error('无效的数据格式');
  }
  
  // 获取所有可能的健康数据类型
  const allTypes = data.activityTypes || [];
  
  // 创建 CSV 头部
  let csvContent = 'Date,RecordCount';
  allTypes.forEach(type => {
    csvContent += `,${type}`;
  });
  csvContent += '\n';
  
  // 添加数据行
  data.data.forEach(dayData => {
    csvContent += `${dayData.date},${dayData.count || 0}`;
    
    allTypes.forEach(type => {
      const value = dayData.details && dayData.details[type] ? dayData.details[type] : 0;
      csvContent += `,${value}`;
    });
    
    csvContent += '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, filename);
};

// 通用下载文件函数
const downloadFile = (blob, filename) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 释放 URL 对象
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 100);
};