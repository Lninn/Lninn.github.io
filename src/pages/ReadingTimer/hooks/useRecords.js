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
    if (window.confirm('确定要清除所有阅读记录吗？此操作不可恢复。')) {
      setRecords([]);
    }
  };

  // 删除单条记录
  const deleteRecord = (id) => {
    setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
  };

  // 获取统计数据
  const getStats = () => {
    if (records.length === 0) {
      return {
        totalFocusTime: 0,
        totalSessions: 0,
        totalCycles: 0,
        averageFocusTime: 0,
        lastWeekFocusTime: 0,
        todayFocusTime: 0
      };
    }

    const totalFocusTime = records.reduce((sum, record) => 
      sum + (record.focusTime || 0), 0);
    
    // 计算今日和本周的专注时间
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = new Date(today - (now.getDay() * 86400000)).getTime();
    
    const todayFocusTime = records
      .filter(record => new Date(record.timestamp).getTime() >= today)
      .reduce((sum, record) => sum + (record.focusTime || 0), 0);
      
    const lastWeekFocusTime = records
      .filter(record => new Date(record.timestamp).getTime() >= weekStart)
      .reduce((sum, record) => sum + (record.focusTime || 0), 0);
    
    return {
      totalFocusTime,
      totalSessions: records.length,
      totalCycles: records.reduce((sum, record) => sum + (record.cycles || 0), 0),
      averageFocusTime: Math.round(totalFocusTime / records.length),
      todayFocusTime,
      lastWeekFocusTime
    };
  };

  return {
    records,
    addRecord,
    clearRecords,
    deleteRecord,
    getStats
  };
}