# 🛍️ AVATAR — E-Commerce Platform

Полнофункциональная e-commerce платформа с 40+ компонентами, API endpoints, админ-панелью, платежами, уведомлениями и мультиязычностью.

## ✨ Основные возможности

### 🎯 Функциональность

- ✅ **Каталог товаров** — поиск, фильтрация, сортировка
- ✅ **Корзина и заказы** — оформление заказов с отслеживанием
- ✅ **Система отзывов** — оценки, рейтинги, комментарии
- ✅ **Аутентификация** — JWT токены, регистрация, вход, выход
- ✅ **Админ-панель** — управление товарами, пользователями, заказами
- ✅ **Платежи** — Stripe, Post.kg, demo режим
- ✅ **Загрузка изображений** — Cloudinary интеграция
- ✅ **Уведомления** — Email, Telegram, реал-тайм
- ✅ **Мультиязычность** — Кыргызский, Русский, Английский
- ✅ **Темы** — Светлая и темная темы
- ✅ **RBAC** — Управление доступом (admin, moderator, user, guest)
- ✅ **Пагинация и скелеты** — Loading состояния и pagination
- ✅ **Ошибка обработка** — Error Boundary компоненты

### 🏗️ Архитектура

```
avatar/
├── app/
│   ├── api/              # API endpoints
│   │   ├── auth/         # Authentication (register, login, logout)
│   │   ├── products/     # Product CRUD
│   │   ├── orders/       # Order management
│   │   ├── reviews/      # Reviews & ratings
│   │   ├── payments/     # Payment processing
│   │   ├── admin/        # Admin operations
│   │   ├── upload/       # Image upload
│   │   ├── search/       # Product search & filtering
│   │   ├── cart/         # Shopping cart
│   │   ├── favorites/    # Favorites management
│   │   ├── tariffs/      # Tariff management
│   │   └── zones/        # Zone management
│   ├── components/       # React components (40+)
│   ├── lib/              # Utilities & libraries
│   │   ├── auth.ts       # JWT & bcrypt
│   │   ├── prisma.ts     # Database client
│   │   ├── i18n.ts       # Internationalization (Zustand)
│   │   ├── theme.ts      # Theme management (Zustand)
│   │   ├── rbac.ts       # Role-based access control
│   │   ├── socket.ts     # Socket.io client
│   │   ├── telegram.ts   # Telegram notifications
│   │   ├── email.ts      # Email notifications (Nodemailer)
│   │   └── prisma.ts     # Prisma ORM
│   └── pages/            # Next.js pages
├── prisma/
│   ├── schema.prisma     # Database schema (50+ models)
│   ├── seed.ts           # Database seed script
│   └── migrations/       # Migration history
├── public/               # Static assets
├── .env.example          # Environment variables template
├── vercel.json           # Vercel deployment config
├── DEPLOYMENT.md         # Deployment guide
└── package.json          # Dependencies & scripts
```

### 📊 Компоненты

**40+ компонентов включая:**

**Каталог товаров:**
- ProductCard, ProductGrid, ProductSearch, ProductFilter

**Корзина и заказы:**
- ShoppingCart, Checkout, OrderConfirmation, OrderHistory

**Отзывы:**
- ReviewForm, ReviewCard, ReviewList, RatingStars

**Аутентификация:**
- LoginForm, RegisterForm, ProtectedRoute, AdminGate

**Админ-панель:**
- AdminDashboard, ProductManagement

**Платежи:**
- PaymentMethod, PaymentStatus

**UI компоненты:**
- Button, Input, Modal, Toast, Pagination, LoadingSkeleton, ErrorBoundary

**Прочее:**
- LanguageSwitcher, ThemeToggle, Favorite, ImageUpload, RealtimeNotification

### 🗄️ База данных

**50+ моделей Prisma включая:**

- User, Product, Order, Review, Cart, CartItem
- Payment, PaymentMethod, Transaction
- Category, Tag, Inventory
- Booking, Tariff, Timezone, Zone
- GameStation, GameType, Tournament
- SupportTicket, Notification, Wallet
- Customer, Employee, Branch, Department
- EmployeeRole, UserRole, Permission
- Analytics, Log, Audit

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn
- PostgreSQL база данных

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/YOUR_USERNAME/avatar.git
cd avatar

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Заполнить переменные окружения в .env
# DATABASE_URL, JWT_SECRET, CLOUDINARY_*, STRIPE_*, TELEGRAM_*, SMTP_*

# Выполнить миграции Prisma
npx prisma migrate dev --name init

# (Опционально) Загрузить тестовые данные
npm run prisma:seed

# Запустить dev сервер
npm run dev

# Открыть http://localhost:3000
```

### Сборка для production

```bash
npm run build
npm start
```

## 🌐 API endpoints

### Аутентификация

- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Вход
- `POST /api/auth/logout` — Выход
- `GET /api/auth/me` — Текущий пользователь

### Товары

- `GET /api/products` — Все товары (с фильтрацией)
- `GET /api/products/[id]` — Детали товара
- `POST /api/products` — Создать товар (admin)
- `PUT /api/products/[id]` — Обновить товар (admin)
- `DELETE /api/products/[id]` — Удалить товар (admin)

### Поиск и фильтрация

- `GET /api/search?q=keyword&category=cat&priceMin=0&priceMax=1000&sortBy=price`

### Заказы

- `GET /api/orders` — Мои заказы
- `GET /api/orders/[id]` — Детали заказа
- `POST /api/orders` — Создать заказ

### Отзывы

- `GET /api/reviews?productId=id` — Отзывы товара
- `POST /api/reviews` — Добавить отзыв
- `PUT /api/reviews/[id]` — Редактировать отзыв (owner/admin)
- `DELETE /api/reviews/[id]` — Удалить отзыв (owner/admin)

### Платежи

- `POST /api/payments/create` — Создать платеж
- `GET /api/payments/webhook` — Webhook для платежей

### Загрузка

- `POST /api/upload` — Загрузить изображение (Cloudinary)

### Админ

- `GET /api/admin/dashboard` — Статистика
- `GET /api/admin/users` — Список пользователей

## 🔐 Аутентификация и авторизация

### JWT токены

```bash
# Зарегистрироваться
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }'

# Вход
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'

# Ответ содержит JWT токен
# Использовать в заголовке: Authorization: Bearer <token>
```

### RBAC (Управление доступом)

Роли: `admin`, `moderator`, `user`, `guest`

Разрешения настраиваются в `/app/lib/rbac.ts`

## 💳 Платежи

### Поддерживаемые методы

1. **Stripe** — Международные платежи (карты, Apple Pay, Google Pay)
2. **Post.kg** — Локальный платеж (Кыргызстан)
3. **Demo** — Тестовый режим (без реальных платежей)

### Конфигурация

```env
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
POSTKG_API_URL=https://api.post.kg
POSTKG_API_KEY=...
```

## 📧 Уведомления

### Email (Nodemailer)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@avatar.kg
```

### Telegram бот

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=123456789
```

### Реал-тайм (Socket.io)

```env
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

**Примечание:** Socket.io требует отдельного сервера. Клиент включен, но сервер не реализован.

## 🌍 Мультиязычность

Поддерживаемые языки: **kg** (Кыргызский), **ru** (Русский), **en** (Английский)

Использование в компонентах:

```tsx
import { useI18n } from '@/app/lib/i18n';

export default function Component() {
  const { t, language, setLanguage } = useI18n();
  
  return (
    <div>
      <p>{t('products.title')}</p>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

## 🎨 Темы

Светлая и темная тема с автоматическим определением предпочтений ОС.

```tsx
import { useTheme } from '@/app/lib/theme';

export default function Component() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

## 🚢 Развертывание

### Vercel (рекомендуется)

```bash
# Подготовить код и push на GitHub
git add .
git commit -m "Ready for production"
git push origin main

# 1. Перейти на https://vercel.com/new
# 2. Импортировать GitHub репозиторий
# 3. Настроить Environment Variables
# 4. Развернуть
```

Подробное руководство: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Локальное развертывание

```bash
npm run build
npm start
```

## 🧪 Тестирование

### Jest и React Testing Library (опционально)

```bash
# Установить
npm install --save-dev jest @testing-library/react

# Запустить тесты
npm test
```

## 📈 Мониторинг

Настроить мониторинг ошибок:

- [Sentry](https://sentry.io/) — для отслеживания ошибок
- [LogRocket](https://logrocket.com/) — для логирования сессий
- [Vercel Analytics](https://vercel.com/analytics) — встроенная аналитика

## 🐛 Проблемы и решения

### Ошибка: "Database connection failed"

```bash
# Проверить DATABASE_URL
echo $DATABASE_URL

# Выполнить миграции
npx prisma migrate deploy
```

### Ошибка: "JWT_SECRET is not set"

```bash
# Генерировать новый JWT_SECRET
openssl rand -base64 32

# Добавить в .env
JWT_SECRET=<generated_secret>
```

### Ошибка: "SMTP connection failed"

```bash
# Убедиться, что SMTP параметры верны
# Проверить Gmail App Password (не обычный пароль)
# Включить Less Secure App Access
```

## 📚 Стек технологий

- **Frontend:** React 19, Next.js 16, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL, Prisma ORM
- **State Management:** Zustand
- **UI Components:** Lucide React, Recharts
- **Authentication:** JWT, bcryptjs
- **Payments:** Stripe, Post.kg
- **Notifications:** Telegram API, Nodemailer, Socket.io
- **Image Storage:** Cloudinary
- **Deployment:** Vercel

## 📄 Лицензия

MIT — свободен для использования в коммерческих и личных проектах.

## 👨‍💼 Поддержка

Вопросы? Issues? Pull Requests?

- [GitHub Issues](https://github.com/YOUR_USERNAME/avatar/issues)
- Email: support@avatar.kg

---

**Развернуто на:** [https://avatar.vercel.app](https://avatar.vercel.app)

**Последнее обновление:** October 2026

🚀 **Готово к production!**
