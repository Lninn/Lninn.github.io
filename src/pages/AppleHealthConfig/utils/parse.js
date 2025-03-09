
/**
 * 解析 Apple Health 数据中的 Record 元素
 * @param {string} xmlContent - Apple Health 导出的 XML 内容
 * @returns {Array} 解析后的健康记录对象数组
 */
export function parseHealthRecords(xmlContent) {
  const records = [];
  
  // 使用正则表达式匹配所有 Record 标签
  const recordRegex = /<Record\b[^>]*?(?:\/>|>[\s\S]*?<\/Record>)/g;
  let match;
  
  while ((match = recordRegex.exec(xmlContent)) !== null) {
    const attributesStr = match[0];
    
    // 提取 Record 标签的属性，只关注 type, startDate, endDate, value
    const typeMatch = /type="([^"]+)"/.exec(attributesStr);
    const startDateMatch = /startDate="([^"]+)"/.exec(attributesStr);
    const endDateMatch = /endDate="([^"]+)"/.exec(attributesStr);
    const valueMatch = /value="([^"]+)"/.exec(attributesStr);
    
    // 只有当所有必要的属性都存在时才创建记录
    if (typeMatch && startDateMatch && endDateMatch && valueMatch) {
      // 创建记录对象，只包含指定的属性
      const record = {
        type: typeMatch[1],
        startDate: parseAppleHealthDate(startDateMatch[1]),
        endDate: parseAppleHealthDate(endDateMatch[1]),
        value: parseFloat(valueMatch[1]),
      };
      
      records.push(record);
    }
  }

  return records;
}

/**
 * 按日期合并并按类型分组健康记录
 * @param {Array} records - 健康记录数组
 * @returns {Object} 按类型分组的健康记录
 */
export function groupRecordsByDateAndType(records) {
  // 按日期合并记录
  const recordsByDate = {};
  
  records.forEach(record => {
    if (!record.startDate) return;
    
    // 提取日期部分（年-月-日）
    const dateKey = record.startDate.toISOString().split('T')[0];
    
    if (!recordsByDate[dateKey]) {
      recordsByDate[dateKey] = [];
    }
    
    // 将记录添加到对应日期
    recordsByDate[dateKey].push(record);
  });
  
  // 对每个日期内的记录按类型分组并合并值
  const result = {};
  
  Object.keys(recordsByDate).forEach(dateKey => {
    const dayRecords = recordsByDate[dateKey];
    const typeGroups = {};
    
    // 按类型分组
    dayRecords.forEach(record => {
      if (!record.type) return;
      
      if (!typeGroups[record.type]) {
        typeGroups[record.type] = {
          type: record.type,
          date: new Date(dateKey),
          values: [],
          totalValue: 0
        };
      }
      
      // 添加值到对应类型组
      if (record.value !== null) {
        typeGroups[record.type].values.push(record.value);
        typeGroups[record.type].totalValue += record.value;
      }
    });
    
    // 将分组结果添加到最终结果
    Object.keys(typeGroups).forEach(type => {
      if (!result[type]) {
        result[type] = [];
      }
      
      result[type].push(typeGroups[type]);
    });
  });
  
  return result;
}

/**
 * 解析 Apple Health 格式的日期字符串
 * @param {string} dateString - 格式如 "2024-07-20 13:47:27 +0800" 的日期字符串
 * @returns {Date} 按照 YYYY-MM-DD 格式的日期字符串, 返回 Date
 */
function parseAppleHealthDate(dateString) {
  // 将 Apple Health 格式的日期转换为 ISO 格式
  // 例如: "2024-07-20 13:47:27 +0800" -> "2024-07-20"

  const dateParts = dateString.split(' ');

  if (dateParts.length >= 1) {
    const isoDate = dateParts[0];
    return new Date(isoDate);
  }

  return null;
}
