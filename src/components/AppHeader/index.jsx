import './index.css'
import { NavLink } from 'react-router-dom'
import useThemeStore from '#/store/theme'
import { NAVIGATION_ITEMS } from '#/config/routes'
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
        {NAVIGATION_ITEMS.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <ul>
        {NAVIGATION_ITEMS.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
