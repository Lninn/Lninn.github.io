import { NavLink } from 'react-router-dom'
import { MobileSubmenu } from './MobileSubmenu'

export function MobileMenuItem({ 
  item, 
  isExpanded, 
  onToggleSubmenu,
  submenuAnchor,
  onCloseSubmenu
}) {
  if (item.children) {
    return (
      <div className={`mobile-nav-item has-submenu ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="submenu-toggle"
          onClick={(e) => {
            e.stopPropagation()
            onToggleSubmenu(item, e.currentTarget)
          }}
          aria-expanded={isExpanded}
          aria-haspopup="true"
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.name}</span>
          <span className="submenu-arrow">▾</span>
        </button>
        <MobileSubmenu
          items={item.children}
          isOpen={isExpanded}
          onClose={onCloseSubmenu}
          anchorEl={submenuAnchor}
        />
      </div>
    )
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="nav-icon">{item.icon}</span>
      <span className="nav-text">{item.name}</span>
    </NavLink>
  )
}
