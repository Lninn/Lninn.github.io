import { useState, useEffect } from 'react'
import { MobileMenuItem } from './MobileMenuItem'

export function MobileMenu({ items }) {
  const [expandedItem, setExpandedItem] = useState(null)
  const [submenuAnchor, setSubmenuAnchor] = useState(null)

  // 点击页面其他区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandedItem && 
        !event.target.closest('.mobile-submenu-portal') && 
        !event.target.closest('.submenu-toggle')
      ) {
        setExpandedItem(null)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [expandedItem])

  const handleToggleSubmenu = (item, element) => {
    setExpandedItem(curr => curr === item.path ? null : item.path)
    setSubmenuAnchor(element)
  }

  const handleCloseSubmenu = () => {
    setExpandedItem(null)
  }

  return (
    <nav className="mobile-nav">
      <ul>
        {items.map(item => (
          <li key={item.path} className="mobile-nav-item-wrapper">
            <MobileMenuItem
              item={item}
              isExpanded={expandedItem === item.path}
              onToggleSubmenu={handleToggleSubmenu}
              submenuAnchor={submenuAnchor}
              onCloseSubmenu={handleCloseSubmenu}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
