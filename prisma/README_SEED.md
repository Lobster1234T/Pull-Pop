# 🎮 AVATAR Platform - Инициализация Seed

## 📌 Быстрая справка

```bash
# Основная команда
npm run prisma:seed

# Результат
✅ 7 ролей
✅ 24+ разрешений
✅ 42+ связей
✅ 5 категорий
🚀 База готова!
```

## 📂 Структура документации

| Файл | Назначение |
|------|-----------|
| **README_SEED.md** | Этот файл - быстрая справка |
| **SEED_GUIDE.md** | Полное руководство (как использовать) |
| **SEED_EXAMPLES.md** | Примеры кода и интеграции |
| **../SEED_INSTRUCTIONS.md** | Шаг-за-шагом инструкция с checklist |

## 🚀 Быстрый старт (3 шага)

### 1️⃣ Миграция БД
```bash
npm run prisma:migrate dev
```

### 2️⃣ Запуск seed
```bash
npm run prisma:seed
```

### 3️⃣ Проверка результатов
```bash
npx prisma studio
# Откроется http://localhost:5555
```

## ✅ Что создается

### Роли (7)

```
Founder      → *:* (полный доступ)
Director     → управление филиалом + аналитика
Manager      → операции в филиале
Admin        → управление содержимым
Cashier      → расчеты и платежи
Staff        → операционная работа
Customer     → просмотр своих данных
```

### Разрешения (24+)

```
Модули: booking, order, payment, station, branch,
        finance, analytics, user, employee, product,
        settings, promotion, system
```

### Категории (5)

```
🥤 Напитки      → drinks
🍕 Еда          → food
🍟 Закуски      → snacks
🎮 Аксессуары   → accessories
👕 Мерч         → merchandise
```

## 🔐 Примеры использования

### Проверка разрешения
```typescript
const hasAccess = await hasPermission(userId, 'booking.create');
if (!hasAccess) throw new Error('Нет доступа');
```

### Назначение роли
```typescript
await prisma.userRole.create({
  data: {
    userId,
    roleId: admin.id,
    branchId: 'optional',
  },
});
```

### Получение разрешений пользователя
```typescript
const permissions = await getUserPermissions(userId);
// ['admin', 'user.read', 'user.create', ...]
```

## 📊 Таблицы БД

```
roles                   (7 записей)
permissions             (24+ записей)
role_permissions        (42+ записей)
product_categories      (5 записей)
```

## 🔄 Безопасность повторного запуска

```bash
# Можно запускать сколько угодно раз
npm run prisma:seed

# Результат:
# ✅ Новые элементы создаются
# ⏭️ Существующие пропускаются
# ✅ Данные не удаляются
```

## 🛠️ Модификация

### Добавить роль

Отредактируйте `prisma/seed.ts`:

```typescript
const ROLES = [
  // ...
  { name: 'Manager', code: 'manager', ... },
];

const ROLE_PERMISSIONS = {
  // ...
  manager: ['booking.*', 'order.read', ...],
};
```

Запустите:
```bash
npm run prisma:seed
```

## 🐛 Проблемы?

| Проблема | Решение |
|----------|--------|
| "no such table" | `npm run prisma:migrate dev` |
| "connection refused" | Проверьте БД и `DATABASE_URL` в `.env` |
| "Permission denied" | На Windows: `npx prisma db seed` |

## 📖 Подробно

- **Как использовать:** смотрите `SEED_GUIDE.md`
- **Примеры кода:** смотрите `SEED_EXAMPLES.md`
- **Пошагово:** смотрите `../SEED_INSTRUCTIONS.md`

## 📞 Контрольный список

- [ ] PostgreSQL запущен
- [ ] `.env` содержит правильный `DATABASE_URL`
- [ ] Запущены миграции: `npm run prisma:migrate dev`
- [ ] Запущен seed: `npm run prisma:seed`
- [ ] Проверены данные в Prisma Studio
- [ ] Все 7 ролей созданы
- [ ] Все 24+ разрешений созданы
- [ ] Готово к разработке! 🚀

---

**Версия:** 1.0
**Статус:** ✅ Production Ready
