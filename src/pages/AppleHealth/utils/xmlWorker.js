// Web Worker 用于处理大型 XML 数据
self.onmessage = function(e) {
  const { xmlContent } = e.data;
  
  try {
    // 发送进度更新
    const updateProgress = (progress, message) => {
      self.postMessage({
        type: 'progress',
        data: { progress, message }
      });
    };
    
    // 解析 XML 数据
    updateProgress(10, '正在解析 XML 数据...');
    // 使用字符串操作解析 XML，因为 Worker 中可能不支持 DOMParser
    const records = parseXMLString(xmlContent, updateProgress);
    
    // 按天合并数据
    updateProgress(60, '正在按天合并数据...');
    const dailyData = mergeDailyData(records);
    
    // 处理完成，返回结果
    updateProgress(90, '正在生成可视化数据...');
    const visualizationData = prepareVisualizationData(dailyData);
    
    self.postMessage({
      type: 'result',
      data: visualizationData
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      data: { message: error.message }
    });
  }
};

// 使用字符串操作解析 XML
function parseXMLString(xmlString, updateProgress) {
  const records = [];
  
  // 简单的 XML 解析，查找所有 Record 标签
  let startIndex = 0;
  let recordCount = 0;
  let totalEstimatedRecords = xmlString.split('<Record ').length - 1;
  
  while (true) {
    // 查找下一个 Record 标签的开始
    const recordStart = xmlString.indexOf('<Record ', startIndex);
    if (recordStart === -1) break;
    
    // 查找 Record 标签的结束
    const recordEnd = xmlString.indexOf('/>', recordStart);
    if (recordEnd === -1) break;
    
    // 提取 Record 标签的内容
    const recordContent = xmlString.substring(recordStart, recordEnd + 2);
    
    // 解析属性
    const type = extractAttribute(recordContent, 'type');
    const startDate = extractAttribute(recordContent, 'startDate');
    const value = extractAttribute(recordContent, 'value');
    const unit = extractAttribute(recordContent, 'unit');
    
    if (startDate && value) {
      records.push({
        type,
        date: new Date(startDate),
        value: parseFloat(value),
        unit
      });
    }
    
    // 更新起始位置
    startIndex = recordEnd + 2;
    
    // 更新进度
    recordCount++;
    if (recordCount % 5000 === 0) {
      const progress = Math.min(30 + Math.floor((recordCount / totalEstimatedRecords) * 30), 60);
      updateProgress(progress, `正在处理记录 ${recordCount} / ${totalEstimatedRecords}...`);
    }
  }
  
  return records;
}

// 从 XML 字符串中提取属性值
function extractAttribute(xmlString, attributeName) {
  const regex = new RegExp(`${attributeName}="([^"]*)"`, 'i');
  const match = xmlString.match(regex);
  return match ? match[1] : null;
}

// 按天合并数据
function mergeDailyData(records) {
  // 现有代码保持不变
  const dailyData = {};
  
  records.forEach((record, index) => {
    if (index % 10000 === 0) {
      self.postMessage({
        type: 'progress',
        data: {
          progress: 60 + Math.floor((index / records.length) * 20),
          message: `正在合并数据 ${index} / ${records.length}...`
        }
      });
    }
    
    const dateStr = record.date.toISOString().split('T')[0];
    
    if (!dailyData[dateStr]) {
      dailyData[dateStr] = {
        date: dateStr,
        activities: {},
        totalActivities: 0
      };
    }
    
    if (!dailyData[dateStr].activities[record.type]) {
      dailyData[dateStr].activities[record.type] = 0;
    }
    
    dailyData[dateStr].activities[record.type]++;
    dailyData[dateStr].totalActivities++;
  });
  
  return dailyData;
}

// 准备可视化数据
function prepareVisualizationData(dailyData) {
  // 现有代码保持不变
  const dates = Object.keys(dailyData).sort();
  const activityTypes = new Set();
  
  // 收集所有活动类型
  dates.forEach(date => {
    Object.keys(dailyData[date].activities).forEach(type => {
      activityTypes.add(type);
    });
  });
  
  // 转换为数组格式，适合热图显示
  const visualizationData = dates.map(date => ({
    date,
    count: dailyData[date].totalActivities,
    details: dailyData[date].activities
  }));
  
  return {
    data: visualizationData,
    activityTypes: Array.from(activityTypes)
  };
}