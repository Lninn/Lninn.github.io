// Web Worker 用于处理大型 XML 数据
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
    
    // 第二步：提取并分组所有健康数据
    updateProgress(30, '正在提取并分组健康数据...');
    const dailyHealthData = extractAndGroupHealthData(xmlContent, updateProgress);
    
    // 第三步：准备可视化数据
    updateProgress(90, '正在生成可视化数据...');
    const visualizationData = prepareVisualizationData(dailyHealthData);
    
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

// 从 XML 字符串中提取属性值
function extractAttribute(xmlString, attributeName) {
  const regex = new RegExp(`${attributeName}="([^"]*)"`, 'i');
  const match = xmlString.match(regex);
  return match ? match[1] : null;
}

// 直接提取并按日期分组所有健康数据
function extractAndGroupHealthData(xmlString, updateProgress) {
  // 估计记录总数，用于进度计算
  const totalEstimatedRecords = (xmlString.match(/<Record /g) || []).length;
  updateProgress(20, `发现约 ${totalEstimatedRecords} 条健康记录`);
  
  // 初始化每日健康数据
  const dailyHealthData = {};
  // 记录所有出现的数据类型
  const activityTypes = new Set();
  let recordCount = 0;
  
  try {
    // 使用正则表达式查找所有记录
    const recordRegex = /<Record [^>]*\/>/g;
    let match;
    
    while ((match = recordRegex.exec(xmlString)) !== null) {
      const recordContent = match[0];
      
      // 解析属性
      const type = extractAttribute(recordContent, 'type');
      const startDate = extractAttribute(recordContent, 'startDate');
      const value = extractAttribute(recordContent, 'value');
      const unit = extractAttribute(recordContent, 'unit');
      
      if (type && startDate && value) {
        try {
          // 添加到活动类型集合
          activityTypes.add(type);
          
          // 提取日期部分
          const date = new Date(startDate);
          const dateStr = date.toISOString().split('T')[0];
          const numValue = parseFloat(value) || 0; // 确保数值有效
          
          // 初始化该日期的数据
          if (!dailyHealthData[dateStr]) {
            dailyHealthData[dateStr] = {
              date: dateStr,
              recordCount: 0,
              types: {},
              details: {}
            };
          }
          
          // 初始化该类型的数据
          if (!dailyHealthData[dateStr].types[type]) {
            dailyHealthData[dateStr].types[type] = {
              count: 0,
              total: 0,
              unit: unit || ''
            };
          }
          
          // 累加数据
          dailyHealthData[dateStr].types[type].count += 1;
          dailyHealthData[dateStr].types[type].total += numValue;
          dailyHealthData[dateStr].recordCount += 1;
          
          // 保存详细信息到 details
          dailyHealthData[dateStr].details[type] = dailyHealthData[dateStr].types[type].total;
        } catch (err) {
          console.warn(`处理记录时出错，已跳过: ${err.message}`);
          // 继续处理下一条记录
        }
      }
      
      // 更新进度
      recordCount++;
      if (recordCount % 5000 === 0) {
        const progress = 30 + Math.floor((recordCount / totalEstimatedRecords) * 60);
        updateProgress(progress, `正在处理记录 ${recordCount} / ${totalEstimatedRecords}...`);
      }
    }
    
    // 最终进度更新
    updateProgress(85, `已处理 ${recordCount} 条健康记录，共 ${Object.keys(dailyHealthData).length} 天数据，${activityTypes.size} 种数据类型`);
    
    return {
      dailyData: dailyHealthData,
      activityTypes: Array.from(activityTypes)
    };
  } catch (error) {
    updateProgress(85, `处理数据时出错: ${error.message}`);
    throw error;
  }
}

// 准备可视化数据
function prepareVisualizationData(healthData) {
  const { dailyData, activityTypes } = healthData;
  const dates = Object.keys(dailyData).sort();
  
  // 转换为数组格式，适合热图显示
  const visualizationData = dates.map(date => {
    const dayData = dailyData[date];
    const result = {
      date,
      count: dayData.recordCount,
      details: dayData.details || {}
    };
    
    // 为每种活动类型添加特定字段
    activityTypes.forEach(type => {
      if (dayData.types && dayData.types[type]) {
        // 特殊处理步数数据，保持向后兼容
        if (type === 'HKQuantityTypeIdentifierStepCount') {
          result.stepCount = dayData.types[type].total;
        }
        
        // 可以添加其他特殊类型的处理
      }
    });
    
    return result;
  });
  
  return {
    data: visualizationData,
    activityTypes: activityTypes
  };
}
