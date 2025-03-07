import './index.css'
import { NavLink } from 'react-router-dom'
import useThemeStore from '#/store/theme'
import { ROUTES_CONFIG } from '#/config/routes'
import { useState, useEffect } from 'react'

export default function AppHeader() {
  const { darkMode, setDarkMode } = useThemeStore()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Lninn's Space</span>
          </div>

          {!isMobile && <AppNav />}

          <div className="app-header-actions">
            <button 
              className="theme-toggle" 
              aria-label="切换主题"
              onClick={toggleTheme}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
      
      {isMobile && <MobileNav />}
    </>
  )
}

function AppNav() {
  return (
    <nav className="app-nav">
      <ul>
        {ROUTES_CONFIG.map(item => (
          <li key={item.path} className="nav-item-wrapper">
            {item.children ? (
              <div className="nav-item has-submenu">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
                <span className="submenu-arrow">▾</span>
                <ul className="submenu">
                  {item.children.map(child => (
                    <li key={child.path}>
                      <NavLink
                        to={child.path}
                        className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
                      >
                        <span className="nav-icon">{child.icon}</span>
                        <span className="nav-text">{child.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MobileNav() {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <nav className="mobile-nav">
      <ul>
        {ROUTES_CONFIG.map(item => (
          <li key={item.path} className="mobile-nav-item-wrapper">
            {item.children ? (
              <div className={`mobile-nav-item has-submenu ${expandedItem === item.path ? 'expanded' : ''}`}>
                <button 
                  className="submenu-toggle"
                  onClick={() => setExpandedItem(curr => curr === item.path ? null : item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                  <span className="submenu-arrow">▾</span>
                </button>
                <ul className="mobile-submenu">
                  {item.children.map(child => (
                    <li key={child.path}>
                      <NavLink
                        to={child.path}
                        className={({ isActive }) => `mobile-submenu-item ${isActive ? 'active' : ''}`}
                        onClick={() => setExpandedItem(null)}
                      >
                        <span className="nav-icon">{child.icon}</span>
                        <span className="nav-text">{child.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
