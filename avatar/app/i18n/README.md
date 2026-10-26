# Система локализации (i18n)

Этот модуль предоставляет полнофункциональную систему локализации для приложения AVATAR Gaming Club с поддержкой трёх языков: русский (ru), английский (en) и кыргызский (kg).

## Структура

```
app/i18n/
├── locales/
│   ├── ru/
│   │   └── main.json          # Русские переводы
│   ├── en/
│   │   └── main.json          # Английские переводы
│   └── kg/
│       └── main.json          # Кыргызские переводы
├── config.ts                   # Конфигурация языков
├── translations.ts             # Функции получения переводов
├── useLanguage.ts              # React хук для работы с языком
├── LanguageSwitcher.tsx        # Компонент переключения языков
├── index.ts                    # Экспорт всех компонентов
└── README.md                   # Этот файл
```

## Использование

### 1. В компонентах (использование хука)

```tsx
'use client';

import { useLanguage } from '@/app/i18n';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

### 2. На сервере (использование функции t)

```ts
import { t } from '@/app/i18n';

const russianTitle = t('ru', 'hero.title');
const englishTitle = t('en', 'hero.title');
```

### 3. Добавление переключателя языков

Просто импортируйте и используйте компонент `LanguageSwitcher`:

```tsx
import { LanguageSwitcher } from '@/app/i18n';

export default function Header() {
  return (
    <nav>
      <h1>AVATAR</h1>
      <LanguageSwitcher />
    </nav>
  );
}
```

## API

### `useLanguage()` - React хук

Возвращает объект с следующими свойствами и методами:

```ts
{
  language: Language;                           // Текущий язык ('ru' | 'en' | 'kg')
  setLanguage: (lang: Language) => void;       // Установить язык
  t: (key: string, defaultValue?: string) => string;  // Получить перевод
  translations: () => Translations;            // Получить все переводы
  isLoaded: boolean;                           // Загружены ли переводы
  supportedLanguages: Language[];              // Список поддерживаемых языков
}
```

### `t(language, key, defaultValue?)` - Функция (server/client)

Получить перевод по ключу:

```ts
import { t } from '@/app/i18n';

// На сервере
const text = t('ru', 'navigation.zones');

// На клиенте (через хук)
const { t } = useLanguage();
const text = t('navigation.zones');
```

**Параметры:**
- `language` (только для функции) - код языка
- `key` - путь к ключу (с точками для вложенных значений)
- `defaultValue` - значение по умолчанию, если ключ не найден

### `getTranslation(language)` - Функция

Получить объект всех переводов для языка:

```ts
import { getTranslation } from '@/app/i18n';

const ruTranslations = getTranslation('ru');
console.log(ruTranslations.hero.title);
```

### `LanguageSwitcher` - Компонент

Компонент с кнопками для переключения между языками. Автоматически сохраняет выбор в localStorage.

```tsx
import { LanguageSwitcher } from '@/app/i18n';

export default function Header() {
  return <LanguageSwitcher />;
}
```

## Добавление новых переводов

### 1. Добавьте ключ в JSON файлы

Отредактируйте файлы в `app/i18n/locales/{lang}/main.json`:

```json
{
  "newSection": {
    "newKey": "значение на языке"
  }
}
```

### 2. Используйте в компоненте

```tsx
const { t } = useLanguage();
const text = t('newSection.newKey');
```

## Персистентность

Язык автоматически сохраняется в `localStorage` с ключом `avatar-language`. При перезагрузке страницы выбранный язык восстанавливается.

## Поддерживаемые языки

- `ru` - Русский
- `en` - English
- `kg` - Кыргызча (Kyrgyz)

Язык по умолчанию: `ru` (Русский)

## Типы

```ts
type Language = 'ru' | 'en' | 'kg';
type Translations = typeof ruMain;  // Полная структура переводов
```

## Примеры

### Полный пример компонента

```tsx
'use client';

import { useLanguage, LanguageSwitcher } from '@/app/i18n';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="flex justify-between items-center">
        <div>
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.description')}</p>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
```

### Условный перевод

```tsx
'use client';

import { useLanguage } from '@/app/i18n';

export default function Tariffs() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h2>{t('tariffs.title')}</h2>
      {/* Разные текст в зависимости от языка */}
      {language === 'ru' && <p>Специальное предложение для русскоязычных!</p>}
    </div>
  );
}
```

## Заметки

- Все компоненты, использующие `useLanguage` хук, должны быть `'use client'`
- Переводы загружаются из JSON файлов при старте приложения
- Система автоматически синхронизирует `lang` атрибут в HTML элементе
- При использовании на сервере используйте функцию `t()` вместо хука
