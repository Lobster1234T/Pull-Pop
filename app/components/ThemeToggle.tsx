'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/app/lib/theme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Применить сохраненную тему при загрузке
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      const { state } = JSON.parse(savedTheme);
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 rounded-lg hover:border-cyan-500/80 transition-all"
      title={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-slate-400" />
      )}
    </button>
  );
}
