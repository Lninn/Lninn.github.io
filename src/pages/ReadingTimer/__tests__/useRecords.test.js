import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useRecords from '../hooks/useRecords';

describe('useRecords Hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    
    // 模拟 window.confirm
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    
    // 确保 localStorage 的模拟正确实现
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('初始化时应该从 localStorage 加载记录', () => {
    const mockRecords = [
      { id: 1, focusTime: 25, cycles: 1, timestamp: '2023-01-01T00:00:00.000Z' },
      { id: 2, focusTime: 50, cycles: 2, timestamp: '2023-01-02T00:00:00.000Z' }
    ];
    
    // 修改这里，确保在 hook 初始化前设置模拟返回值
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockRecords));
    
    const { result } = renderHook(() => useRecords());
    
    // 使用 toMatchObject 或 expect.arrayContaining 来进行更灵活的匹配
    expect(result.current.records).toMatchObject(mockRecords);
    expect(localStorage.getItem).toHaveBeenCalledWith('reading-timer-records');
  });

  test('addRecord 应该添加新记录并保存到 localStorage', () => {
    const { result } = renderHook(() => useRecords());
    
    const newRecord = { focusTime: 25, cycles: 1 };
    
    act(() => {
      result.current.addRecord(newRecord);
    });
    
    expect(result.current.records.length).toBe(1);
    expect(result.current.records[0].focusTime).toBe(25);
    expect(result.current.records[0].cycles).toBe(1);
    expect(result.current.records[0].id).toBeDefined();
    expect(result.current.records[0].timestamp).toBeDefined();
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'reading-timer-records',
      JSON.stringify(result.current.records)
    );
  });

  test('clearRecords 应该清除所有记录', () => {
    const mockRecords = [
      { id: 1, focusTime: 25, cycles: 1, timestamp: '2023-01-01T00:00:00.000Z' }
    ];
    
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(mockRecords));
    
    const { result } = renderHook(() => useRecords());
    
    act(() => {
      result.current.clearRecords();
    });
    
    expect(result.current.records).toEqual([]);
    expect(window.confirm).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'reading-timer-records',
      JSON.stringify([])
    );
  });

  test('deleteRecord 应该删除指定记录', () => {
    const mockRecords = [
      { id: 1, focusTime: 25, cycles: 1, timestamp: '2023-01-01T00:00:00.000Z' },
      { id: 2, focusTime: 50, cycles: 2, timestamp: '2023-01-02T00:00:00.000Z' }
    ];
    
    // 使用 localStorage.getItem 而不是 vi.spyOn
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockRecords));
    
    const { result } = renderHook(() => useRecords());
    
    // 确保初始记录加载正确
    expect(result.current.records.length).toBe(2);
    
    act(() => {
      result.current.deleteRecord(1);
    });
    
    expect(result.current.records.length).toBe(1);
    expect(result.current.records[0].id).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'reading-timer-records',
      JSON.stringify([mockRecords[1]])
    );
  });

  test('getStats 应该正确计算统计数据', () => {
    // 修复 Date 模拟实现
    const mockDate = new Date(2023, 0, 3);
    const originalDate = window.Date;
    
    // 保留原始 Date 的功能，但覆盖 new Date() 的行为
    window.Date = class extends originalDate {
      constructor(...args) {
        if (args.length === 0) {
          return mockDate;
        }
        return new originalDate(...args);
      }
    };
    
    // 保留原始静态方法
    window.Date.now = originalDate.now;
    window.Date.parse = originalDate.parse;
    window.Date.UTC = originalDate.UTC;
    
    const mockRecords = [
      // 今天的记录
      { id: 1, focusTime: 25, cycles: 1, timestamp: '2023-01-03T10:00:00.000Z' },
      { id: 2, focusTime: 50, cycles: 2, timestamp: '2023-01-03T14:00:00.000Z' },
      // 本周的记录 (假设 2023-01-01 是周日)
      { id: 3, focusTime: 30, cycles: 1, timestamp: '2023-01-01T10:00:00.000Z' },
      { id: 4, focusTime: 45, cycles: 2, timestamp: '2023-01-02T14:00:00.000Z' },
      // 更早的记录
      { id: 5, focusTime: 60, cycles: 3, timestamp: '2022-12-25T10:00:00.000Z' }
    ];
    
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockRecords));
    
    const { result } = renderHook(() => useRecords());
    
    const stats = result.current.getStats();
    
    expect(stats.totalFocusTime).toBe(210); // 25 + 50 + 30 + 45 + 60
    expect(stats.totalSessions).toBe(5);
    expect(stats.totalCycles).toBe(9); // 1 + 2 + 1 + 2 + 3
    expect(stats.averageFocusTime).toBe(42); // 210 / 5
    expect(stats.todayFocusTime).toBe(75); // 25 + 50
    expect(stats.lastWeekFocusTime).toBe(150); // 25 + 50 + 30 + 45
    
    // 恢复原始 Date
    window.Date = originalDate;
  });

  test('getStats 应该在没有记录时返回默认值', () => {
    const { result } = renderHook(() => useRecords());
    
    const stats = result.current.getStats();
    
    expect(stats.totalFocusTime).toBe(0);
    expect(stats.totalSessions).toBe(0);
    expect(stats.totalCycles).toBe(0);
    expect(stats.averageFocusTime).toBe(0);
    expect(stats.todayFocusTime).toBe(0);
    expect(stats.lastWeekFocusTime).toBe(0);
  });
});
