import { useEffect } from 'react'

export function useClickOutside(ref, callback, excludeSelectors = []) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current) return

      const isExcluded = excludeSelectors.some(selector => 
        event.target.closest(selector)
      )

      if (!ref.current.contains(event.target) && !isExcluded) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [ref, callback, excludeSelectors])
}