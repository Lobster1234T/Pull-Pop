# Анимация для клуба «Аватар»

Веб-компонент `<avatar-club-animation>`: слова падают и собираются, пол из неоновой сетки уходит к горизонту, расходятся шестиугольники, иногда проскакивает глитч. Один файл, без зависимостей.

## Подключение

1. Положите `avatar-animation.js` в проект (`public/` или `src/`).
2. Подключите скрипт один раз и вставьте тег:

```html
<script src="/avatar-animation.js"></script>
<avatar-club-animation text="AVATAR" subtitle="КОМПЬЮТЕРНЫЙ КЛУБ"></avatar-club-animation>
```

### React / Next.js / Vite

```jsx
import './avatar-animation.js';

export default function Hero() {
  return <avatar-club-animation text="AVATAR" subtitle="КОМПЬЮТЕРНЫЙ КЛУБ" />;
}
```

В Next.js импортируйте файл внутри клиентского компонента (`'use client'`).
Для TypeScript добавьте в `global.d.ts`:

```ts
declare namespace JSX {
  interface IntrinsicElements {
    'avatar-club-animation': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      text?: string; subtitle?: string; 'color-a'?: string; 'color-b'?: string; font?: string; speed?: number;
    };
  }
}
```

## Настройка

| Атрибут | Что делает | По умолчанию |
|---|---|---|
| `text` | крупный заголовок | `AVATAR` |
| `subtitle` | строка под заголовком | `КОМПЬЮТЕРНЫЙ КЛУБ` |
| `color-a`, `color-b` | два акцентных цвета, `#rrggbb` | `#8a5cff`, `#19e3ff` |
| `font` | CSS `font-family` | `Unbounded, "Arial Black", sans-serif` |
| `speed` | скорость | `1` |

Шрифт Unbounded подключается отдельно (см. `index.html`). Без него будет запасной.
Методы: `el.play()`, `el.pause()`, `el.replay()`. Событие `intro-end` приходит, когда буквы встали на место.

Анимация останавливается, когда её не видно на экране, и показывает статичный кадр при включённом «уменьшении движения» в системе.

## Для Kiro

Скажите агенту: «Подключи компонент из `avatar-animation.js` как hero-блок на главной странице, используй атрибуты `text` и `subtitle`».
