import { useState, useEffect } from 'react';

export default function useRecords() {
  // 从本地存储加载记录
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem('reading-timer-records');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  // 当记录变化时保存到本地存储
  useEffect(() => {
    localStorage.setItem('reading-timer-records', JSON.stringify(records));
  }, [records]);

  // 添加新记录
  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setRecords(prevRecords => [newRecord, ...prevRecords]);
  };

  // 清除所有记录
  const clearRecords = () => {
    setRecords([]);
  };

  // 获取统计数据
  const getStats = () => {
    if (records.length === 0) {
      return {
        totalFocusTime: 0,
        totalSessions: 0,
        totalCycles: 0,
        averageFocusTime: 0
      };
    }

    const totalFocusTime = records.reduce((sum, record) => 
      sum + (record.focusTime || 0), 0);
    
    return {
      totalFocusTime,
      totalSessions: records.length,
      totalCycles: records.reduce((sum, record) => sum + (record.cycles || 0), 0),
      averageFocusTime: Math.round(totalFocusTime / records.length)
    };
  };

  return {
    records,
    addRecord,
    clearRecords,
    getStats
  };
}