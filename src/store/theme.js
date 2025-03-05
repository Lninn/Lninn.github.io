import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      navPosition: 'top', // 'top' 或 'bottom'
      
      setDarkMode: (isDark) => {
        set({ darkMode: isDark });
        document.documentElement.classList.toggle('dark-mode', isDark);
      },
      
      setNavPosition: (position) => {
        set({ navPosition: position });
        document.documentElement.classList.toggle('bottom-nav', position === 'bottom');
      },
      
      initTheme: () => {
        const { darkMode, navPosition } = get();
        document.documentElement.classList.toggle('dark-mode', darkMode);
        document.documentElement.classList.toggle('bottom-nav', navPosition === 'bottom');
      }
    }),
    {
      name: 'theme-storage',
      version: 1,
      partialize: (state) => ({ darkMode: state.darkMode, navPosition: state.navPosition }),
    }
  )
);

export default useThemeStore;
