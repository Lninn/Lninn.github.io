// 将原来的 import './index.css' 改为：
import './index.css'
import useThemeStore from '#/store/theme'
import NavMenu from '#/components/NavMenu'

export default function AppHeader() {
  const { darkMode, setDarkMode } = useThemeStore()

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

          <NavMenu />

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
    </>
  )
}

