# ⚡ AVATAR Platform - Быстрый старт (5 минут)

## 🎯 Цель
Инициализировать БД AVATAR Platform с ролями, разрешениями и категориями

## 🚀 5 шагов

### 1️⃣ Откройте терминал
```bash
cd c:\Users\Odyssey\Desktop\avatar\avatar
```

### 2️⃣ Проверьте .env
```bash
# В файле c:\Users\Odyssey\Desktop\avatar\.env
DATABASE_URL="postgresql://user:password@localhost:5432/avatar"
```

### 3️⃣ Запустите миграции
```bash
npm run prisma:migrate dev
```

### 4️⃣ Запустите seed
```bash
npm run prisma:seed
```

### 5️⃣ Проверьте результаты
```bash
npx prisma studio
# Откроется http://localhost:5555
```

---

## ✅ Проверочный лист

- [ ] Открыл терминал в папке `avatar`
- [ ] PostgreSQL запущен
- [ ] `.env` настроен правильно
- [ ] Миграции выполнены
- [ ] Seed скрипт завершился успешно
- [ ] Prisma Studio показывает данные

---

## 📊 Должно быть создано

```
✅ 7 ролей (Founder, Director, Manager, Admin, Cashier, Staff, Customer)
✅ 24+ разрешений (booking, order, payment, station, branch, finance, analytics, etc)
✅ 42+ связей роль-разрешение
✅ 5 категорий (Напитки, Еда, Закуски, Аксессуары, Мерч)
```

---

## 🔥 Частые команды

```bash
# Инициализация
npm run prisma:seed

# Просмотр данных
npx prisma studio

# Очистка и переинициализация (⚠️ удалит все данные!)
npx prisma migrate reset

# Проверка статуса миграций
npx prisma migrate status
```

---

## 🐛 Если не работает

```bash
# Ошибка "no such table"
npm run prisma:migrate dev
npm run prisma:seed

# Ошибка "connection refused"
# 1. Убедитесь, что PostgreSQL запущен
# 2. Проверьте DATABASE_URL

# Если вообще ничего не помогает
npx prisma migrate reset
npm run prisma:seed
```

---

## 📖 Для подробного изучения

- `SEED_INSTRUCTIONS.md` - Полная инструкция
- `prisma/SEED_GUIDE.md` - Руководство
- `prisma/SEED_EXAMPLES.md` - Примеры кода

---

## 🎉 Успешно!

Когда seed завершится без ошибок:

```
🚀 База данных готова к использованию!
```

Вы готовы к разработке! 🎮

---

**Время выполнения:** ~2-5 минут
**Сложность:** ⭐ Очень просто
