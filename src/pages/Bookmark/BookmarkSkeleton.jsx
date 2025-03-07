import React from 'react';
import './BookmarkSkeleton.css';

const BookmarkSkeleton = () => {
  // 生成多个骨架屏分类
  const renderSkeletonCategories = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bookmark-category skeleton-category">
        <div className="skeleton-title"></div>
        <div className="skeleton-list">
          {Array(Math.floor(Math.random() * 3) + 3).fill(0).map((_, i) => (
            <div key={i} className="skeleton-item">
              <div className="skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton-name"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section className="bookmark-grid">
      {renderSkeletonCategories()}
    </section>
  );
};

export default BookmarkSkeleton;