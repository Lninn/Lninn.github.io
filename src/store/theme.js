import { create } from 'zustand'

const useThemeStore = create((set) => ({
  darkMode: false,
  setDarkMode: (isDark) => {
    set({ darkMode: isDark })
    if (isDark) {
      document.documentElement.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  },
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark-mode')
      set({ darkMode: true })
    }
  }
}))

export default useThemeStore