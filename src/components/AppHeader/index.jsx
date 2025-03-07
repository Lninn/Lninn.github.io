// 将原来的 import './index.css' 改为：
import './styles/index.css'
import useThemeStore from '#/store/theme'
import { ROUTES_CONFIG } from '#/config/routes'
import { useState, useEffect } from 'react'
import { Menu } from './Menu'

export default function AppHeader() {
  const { darkMode, setDarkMode } = useThemeStore()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

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

          {!isMobile && <Menu items={ROUTES_CONFIG} isMobile={false} />}

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
      
      {isMobile && <Menu items={ROUTES_CONFIG} isMobile={true} />}
    </>
  )
}

