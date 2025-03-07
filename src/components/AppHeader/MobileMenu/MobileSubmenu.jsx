import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { useClickOutside } from './hooks'

export function MobileSubmenu({ items, isOpen, onClose, anchorEl }) {
  const submenuRef = useRef(null)
  
  useClickOutside(submenuRef, onClose, ['.submenu-toggle'])
  
  // 添加ESC键关闭菜单
  useEffect(() => {
    if (!isOpen) return
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen || !anchorEl) return null

  // 获取移动导航栏元素
  const mobileNav = document.querySelector('.mobile-nav')
  // 计算移动导航栏的实际高度（包括padding和border）
  const mobileNavHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0
  
  return createPortal(
    <div 
      ref={submenuRef}
      className="mobile-submenu-portal"
      style={{
        position: 'fixed',
        left: '50%',
        // 使用计算得到的实际高度
        bottom: `calc(${mobileNavHeight}px + 8px)`,
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
