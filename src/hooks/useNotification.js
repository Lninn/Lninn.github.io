import { useState } from 'react'

export function useNotification() {
  const [notification, setNotification] = useState(null)
  
  const notify = (type, message) => {
    setNotification({ type, message })
  }
  
  const clearNotification = () => {
    setNotification(null)
  }
  
  return {
    notification,
    notify,
    clearNotification
  }
}