import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
// 或者使用下面的导入方式
// import matchers from '@testing-library/jest-dom/matchers';


// 模拟 localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn(key => {
      delete store[key];
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// 模拟 Audio API
window.Audio = class {
  constructor() {
    this.pause = vi.fn();
    this.play = vi.fn();
    this.volume = 1.0;
  }
};

// 模拟 Notification API
window.Notification = {
  permission: 'granted',
  requestPermission: vi.fn().mockResolvedValue('granted'),
};
// 扩展 Vitest 的 expect 方法
expect.extend(matchers);

// 每个测试后自动清理
afterEach(() => {
  cleanup();
});
