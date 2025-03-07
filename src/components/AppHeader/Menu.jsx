import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function Menu({ items, isMobile }) {
  if (isMobile) {
    return <MobileMenu items={items} />
  }
  return <DesktopMenu items={items} />
}

function DesktopMenu({ items }) {
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

function MobileMenu({ items }) {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <nav className="mobile-nav">
      <ul>
        {items.map(item => (
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
