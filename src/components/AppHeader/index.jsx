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
  const { darkMode, setDarkMode, navPosition, setNavPosition } = useThemeStore()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const toggleNavPosition = () => {
    setNavPosition(navPosition === 'top' ? 'bottom' : 'top')
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
            className="layout-toggle mobile-only" 
            aria-label="切换导航位置"
            onClick={toggleNavPosition}
            title={navPosition === 'top' ? '切换到底部导航' : '切换到顶部导航'}
          >
            {navPosition === 'top' ? '⬇️' : '⬆️'}
          </button>
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
