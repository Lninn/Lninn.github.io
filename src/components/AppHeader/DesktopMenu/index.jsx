import { NavLink } from 'react-router-dom'

export function DesktopMenu({ items }) {
  return (
    <nav className="app-nav">
      <ul>
        {items.map(item => (
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
