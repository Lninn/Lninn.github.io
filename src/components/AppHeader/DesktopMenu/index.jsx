import { NavLink } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'

export function DesktopMenu({ items }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRefs = useRef({});
  
  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeSubmenu && menuRefs.current[activeSubmenu] && 
          !menuRefs.current[activeSubmenu].contains(event.target)) {
        setActiveSubmenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSubmenu]);
  
  // 点击处理函数
  const handleSubmenuToggle = (path, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === path ? null : path);
  };

  return (
    <nav className="app-nav">
      <ul>
        {items.map(item => {
          // 为每个菜单项创建ref
          if (!menuRefs.current[item.path]) {
            menuRefs.current[item.path] = React.createRef();
          }
          
          return (
            <li 
              key={item.path} 
              className="nav-item-wrapper"
              ref={menuRefs.current[item.path]}
            >
              {item.children ? (
                <div 
                  className="nav-item has-submenu"
                  onClick={(e) => handleSubmenuToggle(item.path, e)}
                >
                  <span className="nav-icon">{item.icon && <item.icon />}</span>
                  <span className="nav-text">{item.name}</span>
                  <span className="submenu-arrow">▾</span>
                  
                  {/* 使用条件渲染而不是样式控制显示/隐藏 */}
                  {activeSubmenu === item.path && (
                    <ul className="submenu submenu-active">
                      {item.children.map(child => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
                            onClick={(e) => e.stopPropagation()} // 防止冒泡
                          >
                            <span className="nav-icon">{child.icon && <child.icon />}</span>
                            <span className="nav-text">{child.name}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon && <item.icon />}</span>
                  <span className="nav-text">{item.name}</span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  )
}
