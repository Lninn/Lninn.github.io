import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRoutesConfig } from '#/config/routes';
import { FiChevronDown } from 'react-icons/fi';
// import { DEFAULT_ICONS_MAP } from '#/config/nav-shared';
import './styles.css';

// 添加骨架屏组件
const MenuSkeleton = () => (
  <div className="desktop-nav-skeleton">
    <div className="nav-item-skeleton"></div>
    <div className="nav-item-skeleton"></div>
    <div className="nav-item-skeleton"></div>
    <div className="nav-item-skeleton"></div>
  </div>
);

const DesktopNav = () => {
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState({});
  const menuRef = useRef(null);
  const { routes, loading } = useRoutesConfig();
  
  // 初始化时根据当前路径设置打开的子菜单
  useEffect(() => {
    const initialState = {};
    routes.forEach(route => {
      if (route.children) {
        const isActive = route.children.some(child => 
          location.pathname.startsWith(child.path)
        );
        if (isActive) {
          initialState[route.path] = true;
        }
      }
    });
    setOpenSubMenus(initialState);
  }, [location.pathname, routes]);

  // 点击外部区域关闭所有子菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenSubMenus({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 根据字符串获取对应的图标组件
  // const getIconComponent = (iconName) => {
  //   if (!iconName || typeof iconName !== 'string') return null;

  //   return DEFAULT_ICONS_MAP[iconName] || null
  // };

  // 渲染图标组件
  const renderIcon = (IconComponent) => {
    if (!IconComponent) return null;
    
    // const IconComponent = getIconComponent(iconName);
    // return IconComponent ? <IconComponent /> : null;
    return <IconComponent />
  };

  const toggleSubMenu = (path, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setOpenSubMenus(prev => {
      const newState = { ...prev };
      newState[path] = !prev[path];
      return newState;
    });
  };

  const handleMouseEnter = (path) => {
    // 仅在桌面端启用悬停效果
    if (window.innerWidth > 768) {
      setOpenSubMenus(prev => ({
        ...prev,
        [path]: true
      }));
    }
  };

  const handleMouseLeave = (path) => {
    // 仅在桌面端启用悬停效果
    if (window.innerWidth > 768) {
      // 延迟关闭，避免用户移动到子菜单时关闭
      setTimeout(() => {
        setOpenSubMenus(prev => {
          // 如果状态已经改变，不再执行关闭
          if (!prev[path]) return prev;
          return {
            ...prev,
            [path]: false
          };
        });
      }, 100);
    }
  };

  const isSubMenuActive = (parent) => {
    if (!parent.children) return false;
    return parent.children.some(child => location.pathname.startsWith(child.path));
  };

  if (loading) {
    return <MenuSkeleton />
  }

  return (
    <nav className="desktop-nav" ref={menuRef}>
      <ul className="desktop-nav-list">
        {routes.map((route) => (
          <li 
            key={route.path} 
            className="desktop-nav-item"
            onMouseEnter={() => route.children && handleMouseEnter(route.path)}
            onMouseLeave={() => route.children && handleMouseLeave(route.path)}
          >
            {route.children ? (
              <div className={`desktop-nav-link-container ${isSubMenuActive(route) ? 'active' : ''}`}>
                <NavLink 
                  to={route.path}
                  className={({ isActive }) => `desktop-nav-link with-submenu ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    // 阻止导航，只切换子菜单显示状态
                    e.preventDefault();
                    toggleSubMenu(route.path, e);
                  }}
                  aria-expanded={openSubMenus[route.path]}
                  aria-haspopup="true"
                >
                  <span className="nav-icon">{renderIcon(route.icon)}</span>
                  <span className="nav-text">{route.name}</span>
                  <FiChevronDown className={`submenu-arrow ${openSubMenus[route.path] ? 'open' : ''}`} />
                </NavLink>
                
                <ul className={`submenu ${openSubMenus[route.path] ? 'submenu-open' : ''}`}>
                  {route.children.map((child) => (
                    <li key={child.path} className="submenu-item">
                      <NavLink 
                        to={child.path} 
                        className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                      >
                        <span className="nav-icon">{renderIcon(child.icon)}</span>
                        <span className="nav-text">{child.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink 
                to={route.path} 
                className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{renderIcon(route.icon)}</span>
                <span className="nav-text">{route.name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
