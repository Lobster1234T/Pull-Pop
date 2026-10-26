/**
 * Responsive Utilities для адаптивного дизайна
 * Поддерживаемые размеры экранов:
 * - Mobile: 360px - 480px (базовые мобильные устройства)
 * - Mobile Large: 481px - 768px (большие телефоны, планшеты)
 * - Tablet: 769px - 1024px (планшеты в альбомной ориентации)
 * - Desktop: 1025px - 1280px (стандартные десктопы)
 * - Desktop Large: 1281px+ (большие мониторы)
 */

export const BREAKPOINTS = {
  mobile: 360,
  mobileLarge: 481,
  tablet: 769,
  desktop: 1025,
  desktopLarge: 1281,
} as const;

export const BREAKPOINT_NAMES = {
  xs: 'mobile',
  sm: 'mobileLarge',
  md: 'tablet',
  lg: 'desktop',
  xl: 'desktopLarge',
} as const;

/**
 * Контрольный список для проверки адаптивности
 */
export const RESPONSIVE_CHECKLIST = {
  layout: {
    label: 'Layout & Grid',
    items: [
      '✓ На 360px: одноколоночный layout с полями 16px',
      '✓ На 480px: увеличенные поля и шрифты',
      '✓ На 768px: двухколоночный grid где нужен',
      '✓ На 1024px: три колонны для карточек',
      '✓ На 1280px+: четыре и более колонн',
    ],
  },
  typography: {
    label: 'Типография',
    items: [
      '✓ h1: 48px на мобиле → 80px на десктопе',
      '✓ h2: 32px на мобиле → 60px на десктопе',
      '✓ body: 16px везде (не ниже)',
      '✓ Строки не длиннее 80 символов на мобиле',
      '✓ Строки не длиннее 120 символов на десктопе',
    ],
  },
  spacing: {
    label: 'Отступы & Padding',
    items: [
      '✓ Контейнер: 16px padding на мобиле',
      '✓ Контейнер: 24px padding на планшете',
      '✓ Контейнер: 32px padding на десктопе',
      '✓ max-width: 100% на мобиле, 1200px на десктопе',
      '✓ Gap между элементами 12px на мобиле, 16px+ на десктопе',
    ],
  },
  navigation: {
    label: 'Навигация',
    items: [
      '✓ Hamburger меню на экранах <1024px',
      '✓ Desktop меню на экранах ≥1024px',
      '✓ Высота навигации: 56px на мобиле, 64px на десктопе',
      '✓ Touch targets минимум 44x44px на мобиле',
      '✓ Сенсорные элементы с отступами 8px минимум',
    ],
  },
  images: {
    label: 'Изображения',
    items: [
      '✓ На 360px: изображения 100vw ширины',
      '✓ На 768px: max-width 600px',
      '✓ На 1024px: max-width 800px',
      '✓ На 1280px+: max-width 1000px',
      '✓ Используются srcset для отзывчивых изображений',
    ],
  },
  cards: {
    label: 'Карточки (Cards)',
    items: [
      '✓ На 360px: 1 карточка в ряд',
      '✓ На 480px: 1 карточка в ряд',
      '✓ На 768px: 2 карточки в ряд',
      '✓ На 1024px: 3 карточки в ряд',
      '✓ На 1280px+: 4 карточки в ряд',
    ],
  },
  modals: {
    label: 'Модальные окна',
    items: [
      '✓ На 360px: 100% ширины - 32px отступов',
      '✓ На 768px: max-width 500px',
      '✓ На 1024px: max-width 700px',
      '✓ На 1280px+: max-width 800px',
      '✓ Закрытие на ESC или клик вне',
    ],
  },
  forms: {
    label: 'Формы',
    items: [
      '✓ Input ширина 100% на мобиле',
      '✓ Label выше input на мобиле',
      '✓ Label слева от input на десктопе',
      '✓ Высота input: 44px (touch-friendly)',
      '✓ Ошибки видны под input или справа',
    ],
  },
  performance: {
    label: 'Производительность',
    items: [
      '✓ Ленивая загрузка изображений (lazy loading)',
      '✓ Code splitting для критичного пути',
      '✓ CSS минимизирован',
      '✓ JS бандлы не больше 500kb',
      '✓ LCP < 2.5s, FID < 100ms, CLS < 0.1',
    ],
  },
  touch: {
    label: 'Touch Оптимизация',
    items: [
      '✓ Кнопки минимум 44x44px',
      '✓ Отступ между сенсорными элементами 8px',
      '✓ Hover эффекты заменены на active/focus',
      '✓ Поддержка свайп жестов для каруселей',
      '✓ Двойной клик увеличивает элемент',
    ],
  },
  accessibility: {
    label: 'Доступность',
    items: [
      '✓ WCAG 2.1 AA compliance',
      '✓ Контраст текста ≥4.5:1',
      '✓ Фокусные индикаторы видны',
      '✓ Логический tab order',
      '✓ Альтернативный текст для изображений',
    ],
  },
};

/**
 * Тестовые viewport размеры
 */
export const VIEWPORT_TESTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12/13', width: 390, height: 844 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'Google Pixel 6', width: 412, height: 915 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro 11"', width: 834, height: 1194 },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366 },
  { name: 'Desktop 1280x720', width: 1280, height: 720 },
  { name: 'Desktop 1920x1080', width: 1920, height: 1080 },
  { name: 'Desktop 2560x1440', width: 2560, height: 1440 },
];

/**
 * Tailwind breakpoints (для использования в className)
 * sm: 640px
 * md: 768px
 * lg: 1024px
 * xl: 1280px
 * 2xl: 1536px
 */
export const TAILWIND_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Примеры адаптивных классов Tailwind
 */
export const RESPONSIVE_EXAMPLES = {
  container:
    'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto',
  grid:
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8',
  heading:
    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold',
  button:
    'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-lg',
  card:
    'p-4 sm:p-6 md:p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-all',
};

/**
 * Хук для получения текущего breakpoint
 */
export function useBreakpoint(): string {
  if (typeof window === 'undefined') return 'xs';

  const width = window.innerWidth;

  if (width >= BREAKPOINTS.desktopLarge) return 'xl';
  if (width >= BREAKPOINTS.desktop) return 'lg';
  if (width >= BREAKPOINTS.tablet) return 'md';
  if (width >= BREAKPOINTS.mobileLarge) return 'sm';
  return 'xs';
}
