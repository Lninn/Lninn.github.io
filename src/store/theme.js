import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 删除这些注释和未使用的代码
const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      setDarkMode: (isDark) => {
        set({ darkMode: isDark });
        document.documentElement.classList.toggle('dark-mode', isDark);
      },
      initTheme: () => {
        const { darkMode } = get();
        document.documentElement.classList.toggle('dark-mode', darkMode);
      }
    }),
    {
      name: 'theme-storage',
      version: 1,
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);

// 确保在 DOM 加载完成后初始化主题
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    useThemeStore.getState().initTheme();
    console.log('Theme initialized after DOM loaded');
  });
}

export default useThemeStore;
