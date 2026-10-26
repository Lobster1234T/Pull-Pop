import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'auto',
      isDark: false,
      
      setTheme: (theme: Theme) => {
        set({ theme });
        
        // Применить тему
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          set({ isDark: true });
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
          set({ isDark: false });
        } else {
          // Auto mode - используем предпочтение системы
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
            set({ isDark: true });
          } else {
            document.documentElement.classList.remove('dark');
            set({ isDark: false });
          }
        }
      },

      setIsDark: (isDark: boolean) => {
        set({ isDark, theme: isDark ? 'dark' : 'light' });
        
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
