# Система аутентификации AVATAR

## Обзор

Реализована полная система аутентификации с поддержкой:
- **Email/Пароль регистрация и вход**
- **Google OAuth 2.0**
- **JWT токены**
- **Сессии в базе данных**

## Конфигурация

### Переменные окружения (.env)

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# База данных
DATABASE_URL="postgresql://..."
```

## Компоненты

### 1. AuthModal (`app/components/AuthModal.tsx`)
- Модальное окно с переключателем между входом и регистрацией
- Валидация полей
- Поддержка Google OAuth
- Обработка ошибок

### 2. Header (`app/components/Header.tsx`)
- Кнопка входа
- Меню профиля для залогиненных пользователей
- Синхронизация статуса между вкладками

## API маршруты

### Регистрация
**POST** `/api/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Вход
**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Google OAuth Callback
**POST** `/api/auth/google-callback`

Request:
```json
{
  "code": "authorization-code"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cuid",
    "email": "user@gmail.com",
    "name": "John Doe",
    "picture": "https://..."
  }
}
```

## Использование на клиенте

### Получение текущего пользователя
```typescript
import { getCurrentUser, getAuthToken } from '@/app/utils/auth';

const user = getCurrentUser();
const token = getAuthToken();
```

### Проверка авторизации
```typescript
import { isLoggedIn } from '@/app/utils/auth';

if (isLoggedIn()) {
  // Пользователь залогинен
}
```

### Выход из системы
```typescript
import { clearAuth } from '@/app/utils/auth';

clearAuth();
```

## Модель данных

Система использует следующие основные модели:

### User
- `id`: уникальный идентификатор
- `email`: электронная почта (уникальная)
- `passwordHash`: хеш пароля (bcrypt)
- `status`: статус пользователя (active, blocked, suspended, pending)
- `emailVerified`: верификация email
- `lastLoginAt`: последний вход
- `createdAt`: дата создания

### UserProfile
- Хранит информацию профиля пользователя
- firstName, lastName, displayName
- avatarFileId
- language, timezone

### UserSession
- Хранит активные сессии
- token: JWT токен
- expiresAt: время истечения
- userAgent, ipAddress

### Customer
- Расширенная информация о клиенте
- loyaltyLevel: уровень лояльности
- totalVisits, totalSpent
- preferredBranch

## Безопасность

1. **Пароли**: хешируются с помощью bcryptjs (10 salt rounds)
2. **Токены**: подписаны с JWT секретом
3. **Сессии**: сохраняются в БД для дополнительного контроля
4. **Валидация**: проверка email и требования к паролю
5. **HTTPS**: рекомендуется использовать в production

## Установка

```bash
npm install bcryptjs jsonwebtoken jose
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

## Миграция БД

Убедитесь, что Prisma схема синхронизирована:

```bash
npm run prisma:migrate
# или
npx prisma migrate dev --name add_auth
```

## Следующие шаги

1. Добавить двухфакторную аутентификацию
2. Реализовать восстановление пароля по email
3. Добавить социальные сети (GitHub, Facebook)
4. Реализовать email верификацию
5. Добавить защиту от brute-force атак
