import React from 'react';
import './ArticleSkeleton.css';

export function ArticleSkeleton() {
  return (
    <div className="article-skeleton">
      <div className="skeleton-sidebar">
        <div className="skeleton-header"></div>
        <div className="skeleton-list">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="skeleton-item"></div>
          ))}
        </div>
      </div>
      
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-paragraph"></div>
        <div className="skeleton-paragraph"></div>
        <div className="skeleton-paragraph short"></div>
        <div className="skeleton-subtitle"></div>
        <div className="skeleton-paragraph"></div>
        <div className="skeleton-paragraph"></div>
        <div className="skeleton-paragraph short"></div>
        <div className="skeleton-code"></div>
        <div className="skeleton-paragraph"></div>
      </div>
      
      {/* 移除 skeleton-toc 部分 */}
    </div>
  );
}