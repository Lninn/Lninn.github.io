import './index.css'

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
]

export default function AppHeader({ activePath, onChange }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">My Blog</span>
        </div>

        <AppNav activePath={activePath} onChange={onChange} />

        <div className="header-actions">
          <button className="theme-toggle" aria-label="切换主题">
            🌙
          </button>
        </div>
      </div>
    </header>
  )
}

function AppNav({ activePath, onChange }) {
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
                onChange(item.path)
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
