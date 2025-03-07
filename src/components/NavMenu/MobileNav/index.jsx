import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronRight, FiSun, FiMoon } from 'react-icons/fi';
import useRoutesStore from '#/store/routes'
import useThemeStore from '#/store/theme';
import { createPortal } from 'react-dom';
import './styles.css';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const { routes, loading } = useRoutesStore();
  const location = useLocation();
  const drawerRef = useRef(null);
  const { darkMode, setDarkMode } = useThemeStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  const toggleSubMenu = (path, e) => {
    e.preventDefault();
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleNavClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && 
          !event.target.closest('.mobile-nav-button')) {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const renderIcon = (IconComponent) => {
    return IconComponent ? <IconComponent /> : null;
  };

  const isSubMenuActive = (parent) => {
    return parent.children && parent.children.some(child => location.pathname.startsWith(child.path));
  };

  const navContent = (
    <div className={`mobile-nav-drawer-backdrop ${isOpen ? 'active' : ''}`}>
      <div 
        ref={drawerRef}
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
      >
        <div className="mobile-nav-header">
          <button 
            className="mobile-nav-close" 
            onClick={toggleMenu}
            aria-label="关闭菜单"
          >
            <FiX />
          </button>
          <div className="mobile-nav-theme-toggle">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="theme-toggle-button"
              aria-label={!darkMode ? "切换到亮色模式" : "切换到暗色模式"}
            >
              {!darkMode ? <FiSun /> : <FiMoon />}
              <span>{!darkMode ? "亮色模式" : "暗色模式"}</span>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="mobile-nav-loading">加载中...</div>
        ) : (
          <nav className="mobile-nav-menu">
            <ul className="mobile-nav-list">
              {routes.map((route) => (
                <li key={route.path} className="mobile-nav-item">
                  {route.children ? (
                    <>
                      <div 
                        className={`mobile-nav-link-container ${isSubMenuActive(route) ? 'active' : ''}`}
                        onClick={(e) => toggleSubMenu(route.path, e)}
                      >
                        <div className="mobile-nav-link">
                          <span className="nav-icon">{renderIcon(route.icon)}</span>
                          <span className="nav-text">{route.name}</span>
                          {expandedItems[route.path] ? <FiChevronDown /> : <FiChevronRight />}
                        </div>
                      </div>
                      
                      <ul className={`mobile-submenu ${expandedItems[route.path] ? 'expanded' : ''}`}>
                        {route.children.map((child) => (
                          <li key={child.path} className="mobile-submenu-item">
                            <NavLink 
                              to={child.path} 
                              className={({ isActive }) => `mobile-submenu-link ${isActive ? 'active' : ''}`}
                              onClick={handleNavClick}
                            >
                              <span className="nav-icon">{renderIcon(child.icon)}</span>
                              <span className="nav-text">{child.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink 
                      to={route.path} 
                      className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleNavClick}
                    >
                      <span className="nav-icon">{renderIcon(route.icon)}</span>
                      <span className="nav-text">{route.name}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button 
        className="mobile-nav-button" 
        onClick={toggleMenu}
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      {createPortal(navContent, document.body)}
    </>
  );
};

export default MobileNav;
