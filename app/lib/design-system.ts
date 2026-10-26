/**
 * Design System Constants
 * Используйте эти константы для согласованного применения дизайна по всему приложению
 */

// Цвета
export const Colors = {
  primary: '#8a5cff',
  primaryDark: '#6d47d9',
  primaryLight: '#a876ff',
  
  accent: '#19e3ff',
  accentDark: '#00c7e0',
  accentLight: '#4df0ff',
  
  bgDark: '#05060d',
  bgSecondary: '#0f1428',
  bgTertiary: '#1a2347',
  
  textPrimary: '#ffffff',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  border: '#1e293b',
  borderLight: '#334155',
} as const;

// Шрифты
export const Fonts = {
  display: "'Unbounded', sans-serif",
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  mono: "'Monaco', 'Courier New', monospace",
} as const;

// Размеры
export const Sizes = {
  // Текст
  text: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  // Отступы (spacing)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
  },
  
  // Радиусы
  radius: {
    none: '0',
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',   // Круг
  },
} as const;

// Переходы
export const Transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
} as const;

// Тени
export const Shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
  glow: '0 0 20px rgba(138, 92, 255, 0.3)',
  glowAccent: '0 0 20px rgba(25, 227, 255, 0.3)',
} as const;

// Адаптивные breakpoints
export const Breakpoints = {
  mobile: '360px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

// Утилита для создания CSS переменных
export function getCSSVar(name: string): string {
  return `var(${name})`;
}

// Утилита для создания RGB значений
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r}, ${g}, ${b}`;
}

// Утилита для классов с выделением
export function getHighlightClass(type: 'primary' | 'accent' | 'success' | 'warning' | 'danger'): string {
  const classes: Record<string, string> = {
    primary: 'text-primary glow-text-primary',
    accent: 'text-accent glow-text',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  };
  
  return classes[type] || '';
}

// Утилита для фоновых градиентов
export function getGradientClass(type: 'primary' | 'accent' | 'cyber' | 'success' | 'warning' | 'danger'): string {
  const classes: Record<string, string> = {
    primary: 'bg-gradient-primary',
    accent: 'bg-gradient-accent',
    cyber: 'bg-gradient-cyber',
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
    danger: 'bg-gradient-danger',
  };
  
  return classes[type] || '';
}

// Утилита для glass эффектов
export function getGlassClass(variant: 'default' | 'dark' | 'accent' | 'strong' | 'light'): string {
  const classes: Record<string, string> = {
    default: 'glass',
    dark: 'glass-dark',
    accent: 'glass-accent',
    strong: 'glass-strong',
    light: 'glass-light',
  };
  
  return classes[variant] || 'glass';
}
