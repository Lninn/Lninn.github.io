import './index.css'
import useRouteStore from '../../store/route'
import useThemeStore from '../../store/theme'

const NAVIGATION_ITEMS = [
  {
    path: 'bookmark',
    name: '书签',
    icon: '📚'
  },
  {
    path: 'log',
    name: '日志',
    icon: '📝'
  },
  {
    path: 'dashboard',
    name: '仪表板',
    icon: '📈'
  }
]

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
  const { activePath, setActivePath } = useRouteStore()

  return (
    <nav className="app-nav">
      <ul>
        {NAVIGATION_ITEMS.map(item => (
          <li key={item.path}>
            <a
              href="#"
              className={`nav-item ${activePath === item.path ? 'active' : ''}`}
              onClick={e => {
                e.preventDefault()
                setActivePath(item.path)
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
