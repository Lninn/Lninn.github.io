import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withTimeout } from './withTimeout';

// 假设我们从 routes.js 中提取了 withTimeout 函数到单独的文件

describe('withTimeout 函数', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在 Promise 解析前返回结果', async () => {
    const mockPromise = Promise.resolve('成功');
    const result = withTimeout(mockPromise, 1000);
    
    await expect(result).resolves.toBe('成功');
  });

  it('应该在超时后拒绝 Promise', async () => {
    const mockPromise = new Promise(resolve => {
      setTimeout(() => resolve('太慢了'), 2000);
    });
    
    const result = withTimeout(mockPromise, 1000);
    
    vi.advanceTimersByTime(1001);
    
    await expect(result).rejects.toThrow('请求超时');
  });
});