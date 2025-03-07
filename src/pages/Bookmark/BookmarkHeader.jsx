import React from 'react';

const BookmarkHeader = ({ 
  title, 
  searchTerm, 
  onSearchChange, 
  onClearSearch,
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="bookmark-header">
      <div className="header-top">
        <h1>{title}</h1>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="搜索书签..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={onClearSearch}
              title="清除搜索"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="category-filter-container">
        <span className="filter-label">分类筛选:</span>
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarkHeader;