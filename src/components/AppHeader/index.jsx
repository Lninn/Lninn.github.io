import './index.css'
import { NavLink } from 'react-router-dom'
import useThemeStore from '../../store/theme'
import { NAVIGATION_ITEMS } from '../../config/routes'

export default function AppHeader() {
  const { darkMode, setDarkMode } = useThemeStore()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">Lninn's Space</span>
        </div>

        <AppNav />

        <div className="header-actions">
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
