import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookmarkItem } from './BookmarkItem';

describe('BookmarkItem 组件', () => {
  const mockBookmark = {
    name: '测试书签',
    url: 'https://example.com',
    category: '测试分类',
    created_at: new Date().toISOString()
  };

  const mockHandlers = {
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onCopyUrl: vi.fn()
  };

  it('应该正确渲染书签信息', () => {
    render(<BookmarkItem bookmark={mockBookmark} {...mockHandlers} />);
    
    expect(screen.getByText('测试书签')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('测试分类')).toBeInTheDocument();
  });

  it('点击编辑按钮应该调用 onEdit 函数', () => {
    render(<BookmarkItem bookmark={mockBookmark} {...mockHandlers} />);
    
    const editButton = screen.getByTitle('编辑书签');
    fireEvent.click(editButton);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockBookmark);
  });

  it('点击删除按钮应该调用 onDelete 函数', () => {
    render(<BookmarkItem bookmark={mockBookmark} {...mockHandlers} />);
    
    const deleteButton = screen.getByTitle('删除书签');
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockBookmark);
  });

  it('点击复制按钮应该调用 onCopyUrl 函数', () => {
    render(<BookmarkItem bookmark={mockBookmark} {...mockHandlers} />);
    
    const copyButton = screen.getByTitle('复制链接');
    fireEvent.click(copyButton);
    
    expect(mockHandlers.onCopyUrl).toHaveBeenCalledWith(mockBookmark.url);
  });
});