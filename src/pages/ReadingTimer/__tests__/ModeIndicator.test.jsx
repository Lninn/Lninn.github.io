import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModeIndicator from '../components/ModeIndicator';

describe('ModeIndicator 组件', () => {
  test('应该正确显示专注模式', () => {
    render(<ModeIndicator mode="focus" cycles={1} />);
    
    expect(screen.getByText('专注阅读')).toBeInTheDocument();
    expect(screen.getByText('第 1 个周期')).toBeInTheDocument();
  });
  
  test('应该正确显示短休息模式', () => {
    render(<ModeIndicator mode="break" cycles={2} />);
    
    expect(screen.getByText('短休息')).toBeInTheDocument();
    expect(screen.getByText('第 2 个周期')).toBeInTheDocument();
  });
  
  test('应该正确显示长休息模式', () => {
    render(<ModeIndicator mode="longBreak" cycles={4} />);
    
    expect(screen.getByText('长休息')).toBeInTheDocument();
    expect(screen.getByText('第 4 个周期')).toBeInTheDocument();
  });
  
  test('应该正确处理未知模式', () => {
    render(<ModeIndicator mode="unknown" cycles={1} />);
    
    expect(screen.getByText('未知模式')).toBeInTheDocument();
  });
  
  test('周期数应该从传入的值直接显示', () => {
    render(<ModeIndicator mode="focus" cycles={0} />);
    
    expect(screen.getByText('第 0 个周期')).toBeInTheDocument();
  });
});