// Web Worker 用于处理大型 XML 数据
// 导入解析函数
import { parseHealthRecords, groupRecordsByDateAndType } from './parse.js';

self.onmessage = function(e) {
  const { xmlContent } = e.data;
  
  try {
    // 添加日志，检查收到的数据大小
    console.log(`Worker 收到数据，大小约 ${Math.round(xmlContent.length / 1024)} KB`);
    
    // 发送进度更新
    const updateProgress = (progress, message) => {
      // 确保每次进度更新都能发送到主线程
      self.postMessage({
        type: 'progress',
        data: { progress, message }
      });
      console.log(`进度更新: ${progress}%, ${message}`);
    };
    
    // 第一步：解析 XML 数据
    updateProgress(10, '正在解析 XML 数据...');
    
    // 使用 parseHealthRecords 解析数据
    updateProgress(30, '正在提取健康数据...');
    const parsedRecords = parseHealthRecords(xmlContent);
    updateProgress(60, `已解析 ${parsedRecords.length} 条健康记录`);
    
    // 使用 groupRecordsByDateAndType 分组数据
    updateProgress(70, '正在按日期和类型分组数据...');
    const groupedRecords = groupRecordsByDateAndType(parsedRecords);
    
    // 第三步：准备可视化数据
    updateProgress(90, '正在生成可视化数据...');
    const visualizationData = prepareVisualizationData(groupedRecords);
    
    // 发送最终结果
    self.postMessage({
      type: 'result',
      data: visualizationData
    });
  } catch (error) {
    console.error('处理健康数据时出错:', error);
    self.postMessage({
      type: 'error',
      data: { message: error.message || '处理数据时发生未知错误' }
    });
  }
};

// 准备可视化数据
function prepareVisualizationData(groupedRecords) {
  // 获取所有活动类型
  const activityTypes = Object.keys(groupedRecords);
  
  // 创建日期到数据的映射
  const dateMap = {};
  
  // 遍历每种活动类型
  activityTypes.forEach(type => {
    const typeRecords = groupedRecords[type];
    
    // 遍历该类型的每条记录
    typeRecords.forEach(record => {
      const dateStr = record.date.toISOString().split('T')[0];
      
      // 初始化该日期的数据
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = {
          date: dateStr,
          count: 0,
          details: {}
        };
      }
      
      // 更新记录计数
      dateMap[dateStr].count += record.values.length;
      
      // 添加详细信息
      dateMap[dateStr].details[type] = record.totalValue;
      
      // 特殊处理步数数据，保持向后兼容
      if (type === 'HKQuantityTypeIdentifierStepCount') {
        dateMap[dateStr].stepCount = record.totalValue;
      }
    });
  });
  
  // 转换为数组格式，适合热图显示
  const visualizationData = Object.values(dateMap).sort((a, b) => 
    a.date.localeCompare(b.date)
  );
  
  return {
    data: visualizationData,
    activityTypes: activityTypes
  };
}
