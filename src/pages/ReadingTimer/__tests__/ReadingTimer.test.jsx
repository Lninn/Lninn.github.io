import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ReadingTimer from '../index';

// 模拟 Modal 组件
vi.mock('../../../components/Modal', () => ({
  // eslint-disable-next-line no-unused-vars
  default: ({ isOpen, onClose, children }) => (
    isOpen ? <div data-testid="modal">{children}</div> : null
  )
}));

describe('ReadingTimer 组件', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.clearAllTimers();
    localStorage.clear();
    
    // 使用假定时器
    vi.useFakeTimers();
    
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
    vi.useRealTimers();
  });

  test('应该正确渲染初始状态', () => {
    render(<ReadingTimer />);
    
    // 检查标题是否存在
    expect(screen.getByText('专注阅读计时器')).toBeInTheDocument();
    
    // 检查模式指示器
    expect(screen.getByText('专注阅读')).toBeInTheDocument();
    expect(screen.getByText('第 1 个周期')).toBeInTheDocument();
    
    // 检查计时器显示（初始值为25:00）
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // 检查控制按钮
    expect(screen.getByLabelText('开始')).toBeInTheDocument();
    expect(screen.getByLabelText('重置')).toBeInTheDocument();
  });

  test('点击开始按钮应该启动计时器', async () => {
    render(<ReadingTimer />);
    
    const startButton = screen.getByLabelText('开始');
    fireEvent.click(startButton);
    
    // 模拟 setInterval 的行为，每次前进 1 秒并触发一次回调
    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 检查计时器是否更新（减少了 5 秒）
    expect(screen.getByText('24:55')).toBeInTheDocument();
    
    // 按钮应该变为暂停
    expect(screen.getByLabelText('暂停')).toBeInTheDocument();
  });

  test('点击暂停按钮应该暂停计时器', () => {
    render(<ReadingTimer />);
    
    // 先启动计时器
    const startButton = screen.getByLabelText('开始');
    fireEvent.click(startButton);
    
    // 前进 5 秒
     // 模拟 setInterval 的行为，每次前进 1 秒并触发一次回调
    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 暂停计时器
    const pauseButton = screen.getByLabelText('暂停');
    fireEvent.click(pauseButton);
    
    // 再前进 5 秒
    act(() => {
      vi.advanceTimersByTime(5 * 1000);
    });
    
    // 计时器应该保持不变
    expect(screen.getByText('24:55')).toBeInTheDocument();
    
    // 按钮应该变回开始
    expect(screen.getByLabelText('开始')).toBeInTheDocument();
  });

  test('点击重置按钮应该重置计时器', () => {
    render(<ReadingTimer />);
    
    // 先启动计时器
    const startButton = screen.getByLabelText('开始');
    fireEvent.click(startButton);
    
    // 前进 5 秒
    act(() => {
      vi.advanceTimersByTime(5 * 1000);
    });
    
    // 重置计时器
    const resetButton = screen.getByLabelText('重置');
    fireEvent.click(resetButton);
    
    // 计时器应该重置
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // 按钮应该变回开始
    expect(screen.getByLabelText('开始')).toBeInTheDocument();
  });

  test('完成一个专注周期后应该切换到休息模式', () => {
    render(<ReadingTimer />);
    
    // 启动计时器
    const startButton = screen.getByLabelText('开始');
    fireEvent.click(startButton);
    
    // 模拟 setInterval 的行为，每次前进 1 秒并触发一次回调
    for (let i = 0; i < 25 * 60; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    
    // 应该切换到休息模式
    expect(screen.getByText('短休息')).toBeInTheDocument();
    expect(screen.getByText('第 2 个周期')).toBeInTheDocument();
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  test('点击设置按钮应该打开设置面板', () => {
    render(<ReadingTimer />);
    
    const settingsButton = screen.getByLabelText('设置');
    fireEvent.click(settingsButton);
    
    // 设置面板应该显示
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('计时器设置')).toBeInTheDocument();
  });

  test('点击记录按钮应该打开记录面板', () => {
    render(<ReadingTimer />);
    
    const recordsButton = screen.getByLabelText('查看记录');
    fireEvent.click(recordsButton);
    
    // 记录面板应该显示
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('阅读记录')).toBeInTheDocument();
  });
});
