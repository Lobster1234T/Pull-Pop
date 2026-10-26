# Адаптивность Avatar Gaming Club

## 🎯 Поддерживаемые размеры экранов

| Устройство | Размер | Breakpoint | Описание |
|-----------|--------|-----------|----------|
| **Мобильные** | | | |
| iPhone SE | 375px | xs | Маленькие смартфоны |
| iPhone 12/13 | 390px | xs | Стандартные смартфоны |
| Samsung Galaxy S21 | 360px | xs | Android смартфоны |
| Google Pixel 6 | 412px | xs | Большие смартфоны |
| **Планшеты** | | | |
| iPad Mini | 768px | md | Маленькие планшеты |
| iPad Pro 11" | 834px | md | Средние планшеты |
| iPad Pro 12.9" | 1024px | lg | Большие планшеты |
| **Десктопы** | | | |
| Ноутбук | 1280px | lg | Стандартные ноутбуки |
| Desktop 1080p | 1920px | xl | Full HD мониторы |
| Desktop 1440p | 2560px | 2xl | 2K мониторы |

## 📐 Tailwind Breakpoints

```css
/* Tailwind v4 breakpoints */
xs:   /* default (mobile) */
sm:   640px   /* small devices */
md:   768px   /* tablets */
lg:   1024px  /* desktop */
xl:   1280px  /* wide desktop */
2xl:  1536px  /* ultra-wide */
```

## ✅ Контрольный список адаптивности

### 1. Layout & Сетка
- [x] На 360px: одноколоночный layout с полями 16px
- [x] На 480px: увеличенные поля и шрифты
- [x] На 768px: двухколоночный grid где нужен
- [x] На 1024px: три колонны для карточек
- [x] На 1280px+: четыре и более колонн
- [x] max-width контейнера: 100% на мобиле, 1200px на десктопе

### 2. Типография
- [x] h1: 48px (3xl) на мобиле → 80px (5xl-6xl) на десктопе
- [x] h2: 32px (2xl) на мобиле → 60px (4xl) на десктопе
- [x] Основной текст: 16px (base) везде, не ниже
- [x] Использование Unbounded для заголовков
- [x] Строки не превышают 80 символов на мобиле
- [x] Строки не превышают 120 символов на десктопе

### 3. Отступы & Padding
- [x] Контейнер padding: 16px на мобиле (px-4)
- [x] Контейнер padding: 24px на планшете (sm:px-6)
- [x] Контейнер padding: 32px на десктопе (lg:px-8)
- [x] Gap между элементами: 12px на мобиле (gap-3)
- [x] Gap между элементами: 16px+ на десктопе (md:gap-6 lg:gap-8)

### 4. Навигация
- [x] Hamburger меню на экранах <1024px (lg:hidden)
- [x] Desktop меню на экранах ≥1024px (hidden lg:flex)
- [x] Высота навигации: 56px (py-4) на мобиле
- [x] Высота навигации: 64px (py-4) на десктопе
- [x] Touch targets минимум 44x44px на мобиле
- [x] Сенсорные элементы с отступами 8px минимум

### 5. Изображения
- [x] На 360px: изображения 100vw ширины
- [x] На 768px: max-width 600px
- [x] На 1024px: max-width 800px
- [x] На 1280px+: max-width 1000px
- [x] Используются Next.js Image для оптимизации
- [x] Lazy loading для изображений ниже fold

### 6. Карточки (Cards)
- [x] На 360px: 1 карточка в ряд (grid-cols-1)
- [x] На 480px: 1 карточка в ряд
- [x] На 768px: 2 карточки в ряд (md:grid-cols-2)
- [x] На 1024px: 3 карточки в ряд (lg:grid-cols-3)
- [x] На 1280px+: 4 карточки в ряд (xl:grid-cols-4)

### 7. Модальные окна
- [x] На 360px: 100% ширины - 32px отступов
- [x] На 768px: max-width 500px (max-w-2xl)
- [x] На 1024px: max-width 700px (max-w-4xl)
- [x] На 1280px+: max-width 800px (max-w-5xl)
- [x] Закрытие на ESC или клик вне модала

### 8. Формы
- [x] Input ширина 100% на мобиле
- [x] Label выше input на мобиле (flex-col)
- [x] Label слева от input на десктопе (lg:flex-row)
- [x] Высота input: 44px (py-2.5) - touch-friendly
- [x] Ошибки видны под input

### 9. Производительность
- [x] Ленивая загрузка изображений (loading="lazy")
- [x] Code splitting для критичного пути
- [x] CSS минимизирован (Tailwind)
- [x] Поддержка prefers-reduced-motion
- [x] LCP < 2.5s, FID < 100ms, CLS < 0.1

### 10. Touch Оптимизация
- [x] Кнопки минимум 44x44px
- [x] Отступ между сенсорными элементами 8px
- [x] Hover эффекты с поддержкой prefers-reduced-motion
- [x] Active states вместо hover на мобиле
- [x] Focus states видны (outline)

### 11. Доступность
- [x] WCAG 2.1 AA compliance
- [x] Контраст текста ≥4.5:1
- [x] Фокусные индикаторы видны
- [x] Логический tab order
- [x] Альтернативный текст для изображений (alt)

## 🧪 Как протестировать адаптивность

### 1. Используя DevTools Chrome/Firefox
```bash
# Открыть DevTools
F12 или Cmd+Option+I

# Включить режим Device Emulation
Ctrl+Shift+M или Cmd+Shift+M

# Выбрать нужное устройство из списка
```

### 2. Используя встроенный Responsive Test компонент
```bash
# Доступен только в development режиме
# Находится в нижнем правом углу экрана
```

### 3. Размеры для тестирования
```
360px   - iPhone SE, Galaxy S10e
375px   - iPhone 12/13
390px   - Pixel 6
412px   - Galaxy S21
480px   - Большие смартфоны
768px   - iPad Mini
834px   - iPad Pro 11"
1024px  - iPad Pro 12.9", Desktop минимум
1280px  - Ноутбуки
1920px  - Full HD
2560px  - 2K
3840px  - 4K
```

## 📝 Примеры адаптивных классов

### Контейнер
```jsx
// px-4 (16px) на мобиле, px-8 (32px) на десктопе
<div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 max-w-full lg:max-w-6xl mx-auto">
  {/* Content */}
</div>
```

### Grid
```jsx
// 1 колона на мобиле, 3 на десктопе
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Cards */}
</div>
```

### Типография
```jsx
// 32px на мобиле, 64px на десктопе
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Заголовок
</h1>
```

### Модальное окно
```jsx
// 100% - 32px на мобиле, max-w-2xl на планшете
<div className="w-full sm:w-auto sm:max-w-2xl md:max-w-4xl">
  {/* Modal content */}
</div>
```

## 🎨 CSS переменные дизайн-системы

```css
/* Отступы */
--spacing-1: 4px    /* sm */
--spacing-2: 8px    /* base */
--spacing-3: 12px   /* md */
--spacing-4: 16px   /* lg */
--spacing-6: 24px   /* xl */
--spacing-8: 32px   /* 2xl */

/* Шрифты */
--text-xs: 0.75rem  /* 12px */
--text-sm: 0.875rem /* 14px */
--text-base: 1rem   /* 16px */
--text-lg: 1.125rem /* 18px */
--text-xl: 1.25rem  /* 20px */
--text-2xl: 1.5rem  /* 24px */
--text-3xl: 1.875rem /* 30px */
--text-4xl: 2.25rem /* 36px */
--text-5xl: 3rem    /* 48px */

/* Радиусы */
--radius-sm: 6px    /* lg для кнопок */
--radius-md: 8px    /* standard */
--radius-lg: 12px   /* cards */
--radius-xl: 16px   /* modals */
```

## 🚀 Best Practices

1. **Mobile First подход**
   - Начинайте с мобильного дизайна
   - Добавляйте правила для больших экранов (min-width)

2. **Избегайте hardcoded значений**
   ```jsx
   // ❌ Плохо
   <div style={{ width: '800px' }}>
   
   // ✅ Хорошо
   <div className="w-full md:w-[800px]">
   ```

3. **Используйте Tailwind классы**
   ```jsx
   // ❌ Плохо - собственные media queries
   @media (max-width: 768px) { ... }
   
   // ✅ Хорошо - Tailwind классы
   className="md:hidden lg:block"
   ```

4. **Тестируйте на реальных устройствах**
   - Chrome DevTools эмуляция может не совпадать с реальностью
   - Проверяйте на физических устройствах перед релизом

5. **Проверяйте производительность**
   ```bash
   # Используйте Lighthouse
   npm run build
   npm run start
   # Открыть DevTools → Lighthouse → Generate report
   ```

## 📊 Метрики производительности

| Метрика | Целевое значение | Наше значение |
|---------|-----------------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | ✓ |
| FID (First Input Delay) | < 100ms | ✓ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✓ |
| FCP (First Contentful Paint) | < 1.8s | ✓ |
| TTFB (Time to First Byte) | < 600ms | ✓ |

## 🔧 Отладка адаптивности

### Включить сетку (Tailwind v4)
```html
<div className="debug-grid">
  <!-- Сетка видна в development -->
</div>
```

### Проверить контраст
```bash
# Chrome DevTools → Elements → Styles → Check contrast ratio
# Должно быть ≥ 4.5:1
```

### Проверить touch targets
```bash
# Chrome DevTools → Elements → Computed → Box Model
# Минимум 44x44px на мобиле
```

## 📚 Ресурсы

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
