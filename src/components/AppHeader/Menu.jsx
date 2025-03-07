import { MobileMenu } from './MobileMenu'
import { DesktopMenu } from './DesktopMenu'

export function Menu({ items, isMobile }) {
  if (isMobile) {
    return <MobileMenu items={items} />
  }
  return <DesktopMenu items={items} />
}
