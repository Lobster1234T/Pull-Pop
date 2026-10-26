# Развертывание AVATAR на Vercel

## Предварительные требования

1. **GitHub репозиторий** — код должен быть загружен на GitHub
2. **Vercel аккаунт** — регистрация на https://vercel.com
3. **Переменные окружения** — подготовить все необходимые ключи и коды

## Шаг 1: Подготовить код

### 1.1 Инициализировать Git репозиторий (если еще нет)

```bash
cd avatar
git init
git add .
git commit -m "Initial commit: AVATAR e-commerce platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/avatar.git
git push -u origin main
```

### 1.2 Убедиться, что package.json содержит все зависимости

```bash
npm install
```

Обязательные пакеты:
- `next` — React фреймворк
- `react`, `react-dom` — UI библиотека
- `@prisma/client` — ORM
- `bcryptjs` — хеширование паролей
- `jsonwebtoken` — JWT токены
- `zustand` — управление состоянием
- `lucide-react` — иконки
- `recharts` — графики
- `socket.io-client` — реал-тайм обновления
- `nodemailer` — отправка email
- `dotenv` — переменные окружения

### 1.3 Создать `.env.example` (для документации)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/avatar

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_UPLOAD_PRESET=your-preset

# Stripe (Payments)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Post.kg (Payments)
POSTKG_API_URL=https://api.post.kg
POSTKG_API_KEY=your-api-key

# Telegram (Notifications)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=123456789

# SMTP (Email Notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@avatar.kg

# Socket.io (Real-time)
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

## Шаг 2: Подготовить базу данных

### 2.1 Создать PostgreSQL базу данных

Варианты:
- **Vercel Postgres** (рекомендуется) — встроенная интеграция с Vercel
- **Railway** — простой и дешевый
- **Supabase** — PostgreSQL с GraphQL
- **AWS RDS** — масштабируемое решение

### 2.2 Выполнить миграции

```bash
# Генерировать Prisma клиент
npx prisma generate

# Применить миграции
npx prisma migrate deploy

# (Опционально) Загрузить тестовые данные
npx prisma db seed
```

## Шаг 3: Развернуть на Vercel

### 3.1 Подключить GitHub репозиторий

1. Перейти на https://vercel.com/new
2. Нажать "Import Git Repository"
3. Выбрать ваш GitHub репозиторий `avatar`
4. Разрешить Vercel доступ к GitHub

### 3.2 Настроить переменные окружения

1. В Vercel dashboard перейти в "Settings" → "Environment Variables"
2. Добавить все переменные из `.env.example`:

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_UPLOAD_PRESET=...
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
POSTKG_API_URL=...
POSTKG_API_KEY=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASSWORD=...
EMAIL_FROM=...
NEXT_PUBLIC_SOCKET_URL=...
```

**Важно:** Переменные с префиксом `NEXT_PUBLIC_` видны в клиенте. Не добавляйте секреты!

### 3.3 Выбрать регион развертывания

- Framework: **Next.js** (автоматически определяется)
- Build Command: `npm run build` (по умолчанию)
- Output Directory: `.next` (по умолчанию)
- Install Command: `npm install` (по умолчанию)

### 3.4 Развернуть

Нажать "Deploy" и дождаться завершения. Vercel автоматически:
- Установит зависимости
- Соберет Next.js приложение
- Развернет на CDN

## Шаг 4: Тестирование после развертывания

### 4.1 Проверить здоровье приложения

```bash
# Перейти на https://your-app.vercel.app
# Проверить основную страницу

# Тестировать API
curl https://your-app.vercel.app/api/products
curl https://your-app.vercel.app/api/health
```

### 4.2 Тестировать основные функции

- [ ] **Регистрация и вход** — `/auth/register`, `/auth/login`
- [ ] **Продукты** — просмотр товаров, поиск, фильтрация
- [ ] **Корзина** — добавление/удаление товаров
- [ ] **Заказы** — оформление заказа, просмотр истории
- [ ] **Отзывы** — добавление/просмотр отзывов
- [ ] **Админ панель** — доступ администратора, CRUD операции
- [ ] **Платежи** — создание платежа, вебхук
- [ ] **Загрузка изображений** — image upload через Cloudinary
- [ ] **Email уведомления** — проверить отправку писем
- [ ] **Telegram уведомления** — проверить сообщения в боте
- [ ] **Socket.io** — реал-тайм уведомления (требует сервера)
- [ ] **Мультиязычность** — переключение языка kg/ru/en
- [ ] **Тема** — переключение light/dark режима

### 4.3 Проверить логи

```bash
# В Vercel dashboard
# Settings → Deployments → выбрать развертывание → Logs
```

Проверить на ошибки:
- Ошибки подключения БД
- Ошибки миграции Prisma
- Ошибки аутентификации
- Ошибки внешних API

## Шаг 5: Настройка производства

### 5.1 Настроить домен

1. В Vercel dashboard → Settings → Domains
2. Добавить ваш домен или получить `*.vercel.app`
3. Настроить DNS (если используется собственный домен)

### 5.2 Включить HTTPS

Vercel автоматически выдает SSL сертификаты для всех развертываний.

### 5.3 Настроить CI/CD

1. GitHub Actions или Vercel Deployments для автоматического развертывания при push
2. Добавить checks перед merge (linting, тесты)

### 5.4 Мониторинг

1. Включить аналитику в Vercel dashboard
2. Настроить Sentry для ошибок (опционально)
3. Настроить логирование платежей и критических операций

## Шаг 6: Масштабирование

### 6.1 Оптимизация БД

```bash
# Создать индексы
npx prisma migrate dev --name add-indexes

# Анализировать производительность
ANALYZE=true npx prisma generate
```

### 6.2 Кеширование

- ISR (Incremental Static Regeneration) для статических страниц
- Redis для сессий (опционально)
- CDN Cloudflare для дополнительного ускорения

### 6.3 Бюджет

- Vercel: ~$20-50/месяц (для хобби/стартапа)
- PostgreSQL: ~$15-100/месяц (в зависимости от данных)
- Cloudinary: ~$10/месяц (100GB трафика включен бесплатно)
- Stripe/Post.kg: 2-3% за каждую транзакцию
- Email (Nodemailer): бесплатно (через Gmail или свой SMTP)

## Проблемы и решения

### Ошибка: "Database connection failed"

**Решение:**
1. Проверить DATABASE_URL в .env
2. Убедиться, что БД доступна (IP белый список)
3. Выполнить `npx prisma migrate deploy`

### Ошибка: "JWT_SECRET is not set"

**Решение:**
1. Добавить JWT_SECRET в Vercel Environment Variables
2. Перередеплоить приложение

### Ошибка: "Cloudinary upload failed"

**Решение:**
1. Проверить CLOUDINARY_CLOUD_NAME и CLOUDINARY_UPLOAD_PRESET
2. Убедиться, что preset позволяет загрузки без авторизации

### Socket.io не работает

**Решение:**
1. Socket.io требует отдельного сервера (Next.js не подходит для длительных соединений)
2. Развернуть Socket.io сервер на Railway, Render или другом хостинге
3. Установить NEXT_PUBLIC_SOCKET_URL на адрес сервера

### Медленные запросы к БД

**Решение:**
1. Добавить индексы на часто используемые поля
2. Использовать connection pooling (PgBouncer)
3. Оптимизировать N+1 запросы в Prisma

## Откат развертывания

Если что-то пошло не так:

1. В Vercel dashboard → Deployments
2. Выбрать предыдущее успешное развертывание
3. Нажать "Promote to Production"

## Дополнительные ресурсы

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [GitHub Codespaces](https://github.com/features/codespaces) — облачная IDE для разработки

---

**Готово!** 🚀 Ваше приложение AVATAR развернуто и готово к использованию!
