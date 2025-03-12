import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useTimer from '../hooks/useTimer';

// 模拟定时器
vi.useFakeTimers();

describe('useTimer Hook', () => {
  const initialSettings = {
    focusTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
    soundOption: 'bell',
    volume: 1.0,
    dailyGoal: 120
  };
  
  const onSessionComplete = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllTimers();
    localStorage.clear();

    // 正确模拟 Notification API
    window.Notification = vi.fn().mockImplementation(() => ({
      // 模拟通知实例的属性和方法
      close: vi.fn()
    }));
    window.Notification.permission = 'granted';
    window.Notification.requestPermission = vi.fn().mockResolvedValue('granted');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('初始化时应该设置正确的默认值', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    expect(result.current.isRunning).toBe(false);
    expect(result.current.mode).toBe('focus');
    expect(result.current.timeLeft).toBe(initialSettings.focusTime * 60);
    expect(result.current.cycles).toBe(1); // 应该从第1个周期开始
    expect(result.current.totalFocusTime).toBe(0);
  });

  test('toggleTimer 应该正确切换计时器状态', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    act(() => {
      result.current.toggleTimer();
    });
    
    expect(result.current.isRunning).toBe(true);
    
    act(() => {
      result.current.toggleTimer();
    });
    
    expect(result.current.isRunning).toBe(false);
  });

  test('resetTimer 应该重置计时器状态', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    // 先启动计时器并让它运行一段时间
    act(() => {
      result.current.toggleTimer();
    });
    
    act(() => {
      vi.advanceTimersByTime(60 * 1000); // 前进 60 秒
    });
    
    // 重置计时器
    act(() => {
      result.current.resetTimer();
    });
    
    // 验证状态已重置
    expect(result.current.isRunning).toBe(false);
    expect(result.current.mode).toBe('focus');
    expect(result.current.timeLeft).toBe(initialSettings.focusTime * 60);
    expect(result.current.totalFocusTime).toBe(0);
  });

  test('计时器应该正确倒计时', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    act(() => {
      result.current.toggleTimer();
    });
    
    // 前进 10 秒
    // act(() => {
    //   vi.advanceTimersByTime(10 * 1000);
    // });
    // 模拟 setInterval 的行为，每次前进 1 秒并触发一次回调
    for (let i = 0; i < 10; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }    
    
    expect(result.current.timeLeft).toBe(initialSettings.focusTime * 60 - 10);
  });

  test('专注时间结束后应该切换到休息模式', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    act(() => {
      result.current.toggleTimer();
    });
    
    // 前进整个专注时间
    // act(() => {
    //   vi.advanceTimersByTime(initialSettings.focusTime * 60 * 1000);
    // });
    for (let i = 0; i < initialSettings.focusTime * 60; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }     
    
    expect(result.current.mode).toBe('break');
    expect(result.current.timeLeft).toBe(initialSettings.breakTime * 60);
    expect(result.current.cycles).toBe(2); // 周期应该增加
  });

  test('完成指定周期后应该进入长休息', () => {
    // 使用较小的时间值以加快测试
    const testSettings = {
      ...initialSettings,
      focusTime: 1,
      breakTime: 1,
      longBreakTime: 3,
      longBreakInterval: 4
    };
    
    const { result } = renderHook(() => useTimer(testSettings, onSessionComplete));
    
    // 检查初始周期是否为1
    expect(result.current.cycles).toBe(1);
    
    // 完成第1个专注周期
    act(() => {
      result.current.toggleTimer(); // 开始计时
    });
    
    // 完成专注时间 (1分钟)
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 检查是否进入休息模式，周期应该变为2
    // 注意：这里需要等待一个额外的时钟周期，让状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.mode).toBe('break');
    expect(result.current.cycles).toBe(2);
    
    // 完成休息时间
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 完成第2个专注周期
    act(() => {
      result.current.toggleTimer();
    });
    
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 检查周期是否变为3
    expect(result.current.cycles).toBe(3);
    expect(result.current.mode).toBe('break');
    
    // 完成第2个休息时间
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 完成第3个专注周期
    act(() => {
      result.current.toggleTimer();
    });
    
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 检查周期是否变为4
    expect(result.current.cycles).toBe(4);
    expect(result.current.mode).toBe('break');
    
    // 完成第3个休息时间
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 开始第4个专注周期
    act(() => {
      result.current.toggleTimer();
    });
    
    // 完成专注时间
    for (let j = 0; j < 60; j++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 确保状态更新完成
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    // 此时应该进入长休息模式
    expect(result.current.mode).toBe('longBreak');
    expect(result.current.timeLeft).toBe(3 * 60); // longBreakTime * 60
  });

  test('updateSettings 应该正确更新设置', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    const newSettings = {
      ...initialSettings,
      focusTime: 30,
      breakTime: 10
    };
    
    act(() => {
      result.current.updateSettings(newSettings);
    });
    
    expect(result.current.settings.focusTime).toBe(30);
    expect(result.current.settings.breakTime).toBe(10);
    expect(result.current.timeLeft).toBe(30 * 60); // 应该更新当前剩余时间
  });

  test('计时器完成时应该调用 onSessionComplete', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    act(() => {
      result.current.toggleTimer();
      vi.advanceTimersByTime(initialSettings.focusTime * 60 * 1000);
    });
    
    expect(onSessionComplete).toHaveBeenCalled();
  });

  test('formatTime 应该正确格式化时间', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    expect(result.current.formatTime(65)).toBe('01:05');
    expect(result.current.formatTime(3600)).toBe('60:00');
  });

  test('calculateProgress 应该正确计算进度百分比', () => {
    const { result } = renderHook(() => useTimer(initialSettings, onSessionComplete));
    
    // 初始时进度为 0
    expect(result.current.calculateProgress()).toBe(0);
    
    // 前进一半时间
    act(() => {
      result.current.toggleTimer();
      vi.advanceTimersByTime(initialSettings.focusTime * 30 * 1000);
    });
    
    expect(result.current.calculateProgress()).toBeCloseTo(50, 1);
  });
});
