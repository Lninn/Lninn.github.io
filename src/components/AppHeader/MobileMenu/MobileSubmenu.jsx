import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'

export function MobileSubmenu({ items, isOpen, onClose, anchorEl }) {
  const submenuRef = useRef(null)
  
  if (!isOpen || !anchorEl) return null

  const rect = anchorEl.getBoundingClientRect()
  
  return createPortal(
    <div 
      ref={submenuRef}
      className="mobile-submenu-portal"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: `calc(${rect.height}px + 16px)`,
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        zIndex: 1000,
      }}
    >
      <ul className="mobile-submenu">
        {items.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `mobile-submenu-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  )
}
