# 🏗️ AVATAR Platform - Архитектура Seed

## Система ролей и разрешений

### 📊 Иерархия ролей

```
                        FOUNDER
                      (полный доступ)
                            ↓
           ┌────────────────┼────────────────┐
           ↓                ↓                ↓
        DIRECTOR          ADMIN          MANAGER
     (10 разрешений)  (16 разрешений)  (14 разрешений)
           ↓                ↓                ↓
       Аналитика        Содержимое        Операции
       Филиалы          Пользователи       Брони
       Просмотр         Товары             Заказы
                        Настройки          Платежи
           
           ↓                ↓                ↓
        CASHIER          STAFF          CUSTOMER
      (8 разрешений)  (4 разрешения)  (2 разрешения)
           ↓                ↓                ↓
       Платежи         Операции        Просмотр
       Расчеты         Места          Своих данных
       Касса           Заказы
```

---

## 🔐 Система разрешений

### Структура: `module.action`

```
MODULES (13)
│
├─ booking (4)
│  ├─ booking.read
│  ├─ booking.create
│  ├─ booking.edit
│  └─ booking.cancel
│
├─ order (7)
│  ├─ order.read
│  ├─ order.create
│  ├─ order.accept
│  ├─ order.prepare
│  ├─ order.deliver
│  ├─ order.complete
│  └─ order.cancel
│
├─ payment (4)
│  ├─ payment.read
│  ├─ payment.create
│  ├─ payment.process
│  └─ payment.refund
│
├─ station (3)
│  ├─ station.read
│  ├─ station.update
│  └─ station.maintenance
│
├─ branch (4)
│  ├─ branch.read
│  ├─ branch.create
│  ├─ branch.edit
│  └─ branch.manage
│
├─ finance (4)
│  ├─ finance.read
│  ├─ finance.create
│  ├─ finance.edit
│  └─ finance.approve
│
├─ analytics (1)
│  └─ analytics.read
│
├─ user (3)
│  ├─ user.read
│  ├─ user.create
│  └─ user.edit
│
├─ employee (1)
│  └─ employee.manage
│
├─ product (2)
│  ├─ product.read
│  └─ product.manage
│
├─ settings (2)
│  ├─ settings.read
│  └─ settings.edit
│
├─ promotion (3)
│  ├─ promotion.read
│  ├─ promotion.create
│  └─ promotion.edit
│
└─ system (1)
   └─ *:* (полный доступ)
```

---

## 🗂️ Структура БД

### Таблицы и их связи

```
┌──────────────────────────────────────────────────────────┐
│                      User (Пользователь)                │
│ ┌────────────────────────────────────────────────────┐  │
│ │ id | email | phone | status | ...                 │  │
│ └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                           ↓
                    1:N связь
                           ↓
┌──────────────────────────────────────────────────────────┐
│               UserRole (Роль пользователя)              │
│ ┌────────────────────────────────────────────────────┐  │
│ │ id | userId | roleId | branchId | ...             │  │
│ └────────────────────────────────────────────────────┘  │
│                      ↓
│              Может быть привязана
│              к конкретному филиалу
│                      ↓
│  ┌──────────────────────────────────────┐
│  │ branchId (опционально)               │
│  │ NULL = доступ ко всем филиалам       │
│  │ SET = доступ только к этому филиалу  │
│  └──────────────────────────────────────┘
└──────────────────────────────────────────────────────────┘
           ↓                                  ↓
         Связь                              Связь
           ↓                                  ↓
┌─────────────────────────┐      ┌─────────────────────────┐
│   Role (7 ролей)       │      │ Branch (Филиал)         │
│ ┌─────────────────────┐ │      │ ┌─────────────────────┐ │
│ │ id | code | name    │ │      │ │ id | code | name    │ │
│ │ - founder           │ │      │ │ - avatar-bishkek    │ │
│ │ - director          │ │      │ │ - avatar-osh        │ │
│ │ - manager           │ │      │ │ - avatar-karakol    │ │
│ │ - admin             │ │      │ │ - ...               │ │
│ │ - cashier           │ │      │ └─────────────────────┘ │
│ │ - staff             │ │      │ Relations:              │
│ │ - customer          │ │      │ - zones (1:N)           │
│ └─────────────────────┘ │      │ - tariffs (1:N)         │
│ Relations: 1:N            │      │ - stations (1:N)        │
│ permissions               │      │ - bookings (1:N)        │
└─────────────────────────┘      │ - products (1:N)        │
           ↓                      │ - ...                   │
         Связь                    └─────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│   RolePermission (Связь)            │
│ ┌────────────────────────────────┐  │
│ │ roleId | permissionId          │  │
│ └────────────────────────────────┘  │
│          ↓                           │
│        Связь (N:M)                  │
│          ↓                           │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│   Permission (24+ разрешений)       │
│ ┌────────────────────────────────┐  │
│ │ id | code | name | module      │  │
│ │ - booking.read                 │  │
│ │ - booking.create               │  │
│ │ - order.read                   │  │
│ │ - ... (еще 20+)                │  │
│ └────────────────────────────────┘  │
└──────────────────────────────────────┘

Отдельно:
┌──────────────────────────────────────┐
│   ProductCategory (5 категорий)     │
│ ┌────────────────────────────────┐  │
│ │ id | name | slug | sortOrder   │  │
│ │ - drinks                       │  │
│ │ - food                         │  │
│ │ - snacks                       │  │
│ │ - accessories                  │  │
│ │ - merchandise                  │  │
│ └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 🔄 Процесс инициализации

### Шаг 1: Запуск seed скрипта

```
npm run prisma:seed
     ↓
prisma/seed.ts запускается
     ↓
Подключение к БД (Prisma Client)
```

### Шаг 2: Создание ролей

```
ROLES = [7 объектов]
     ↓
for each role in ROLES:
  - Проверка: role.code уже существует?
    - ДА → пропустить ✓
    - НЕТ → создать в таблице roles
     ↓
✅ 7 ролей создано (или пропущено)
```

### Шаг 3: Создание разрешений

```
PERMISSIONS = [24+ объектов]
     ↓
for each permission in PERMISSIONS:
  - Проверка: permission.code уже существует?
    - ДА → пропустить ✓
    - НЕТ → создать в таблице permissions
     ↓
✅ 24+ разрешений создано (или пропущено)
```

### Шаг 4: Связывание ролей с разрешениями

```
ROLE_PERMISSIONS = {
  'founder': ['*:*'],
  'director': ['branch.manage', 'booking.read', ...],
  ...
}
     ↓
for each role in ROLE_PERMISSIONS:
  for each permission in ROLE_PERMISSIONS[role]:
    - Найти role объект по коду
    - Найти permission объект по коду
    - Проверка: связь уже существует?
      - ДА → пропустить ✓
      - НЕТ → создать в таблице role_permissions
     ↓
✅ 42+ связей создано (или пропущено)
```

### Шаг 5: Создание категорий

```
PRODUCT_CATEGORIES = [5 объектов]
     ↓
for each category in PRODUCT_CATEGORIES:
  - Проверка: category.slug уже существует?
    - ДА → пропустить ✓
    - НЕТ → создать в таблице product_categories
     ↓
✅ 5 категорий создано (или пропущено)
```

### Шаг 6: Логирование и отключение

```
Вывести статистику:
  - Ролей создано: N
  - Разрешений создано: N
  - Связей создано: N
  - Категорий создано: N
     ↓
Отключить Prisma Client
     ↓
🚀 База данных готова!
```

---

## 🔗 Примеры связей

### Пример 1: Founder

```
User (id: user-1) 
  ↓
UserRole (roleId: founder, branchId: NULL)
  ↓
Role: founder
  ↓
RolePermissions (7+)
  ├─ *:* (полный доступ)
```

### Пример 2: Director филиала

```
User (id: user-2)
  ↓
UserRole (roleId: director, branchId: branch-bishkek)
  ↓
Role: director
  ↓
RolePermissions (10)
  ├─ branch.manage
  ├─ booking.read
  ├─ analytics.read
  ├─ ...
```

### Пример 3: Cashier

```
User (id: user-3)
  ↓
UserRole (roleId: cashier, branchId: branch-bishkek)
  ↓
Role: cashier
  ↓
RolePermissions (8)
  ├─ booking.read
  ├─ booking.create
  ├─ order.read
  ├─ order.create
  ├─ payment.read
  ├─ payment.create
  ├─ payment.process
  └─ station.read
```

### Пример 4: Customer

```
User (id: user-4)
  ↓
UserRole (roleId: customer, branchId: NULL)
  ↓
Role: customer
  ↓
RolePermissions (2)
  ├─ booking.read (свои брони)
  └─ order.read (свои заказы)
```

---

## 📈 Статистика

### Созданные объекты

```
roles              7
permissions        24+
role_permissions   42+
product_categories 5
────────────────
ИТОГО              78+ объектов в БД
```

### Созданная документация

```
seed.ts               420 строк кода
README_SEED.md        70 строк
SEED_GUIDE.md         350+ строк
SEED_EXAMPLES.md      400+ строк
SEED_INSTRUCTIONS.md  500+ строк
QUICK_START.md        50 строк
ARCHITECTURE.md       500+ строк (этот файл)
FILES_CREATED.md      400+ строк
SETUP_SUMMARY.md      400+ строк
────────────────
ИТОГО                 ~3000+ строк документации
```

---

## 🔐 Схема безопасности

### Проверка разрешений в коде

```typescript
// 1. Получить пользователя
const user = await prisma.user.findUnique({ where: { id: userId } });

// 2. Получить все роли пользователя
const userRoles = await prisma.userRole.findMany({
  where: { userId: user.id },
  include: {
    role: {
      include: {
        permissions: {
          include: { permission: true }
        }
      }
    }
  }
});

// 3. Собрать все разрешения
const permissions = new Set<string>();
for (const ur of userRoles) {
  for (const rp of ur.role.permissions) {
    permissions.add(rp.permission.code);
  }
}

// 4. Проверить разрешение
const canCreateBooking = permissions.has('booking.create') 
  || permissions.has('booking.*')
  || permissions.has('*:*');

if (!canCreateBooking) {
  throw new Error('Нет разрешения');
}
```

---

## 🎯 Модели использования

### Сценарий 1: Регистрация нового пользователя

```
1. User создается (status: pending)
2. Автоматически назначается роль "customer"
3. UserRole создается с roleId: customer
4. Пользователь может видеть только:
   - Свои брони (booking.read)
   - Свои заказы (order.read)
```

### Сценарий 2: Создание администратора

```
1. User создается (status: active)
2. Вручную назначается роль "admin"
3. UserRole создается с roleId: admin
4. Администратор может:
   - Управлять пользователями
   - Редактировать товары
   - Создавать акции
   - Изменять настройки
```

### Сценарий 3: Добавление Manager к филиалу

```
1. User создается (status: active)
2. Employee создается для пользователя
3. UserRole создается с:
   - roleId: manager
   - branchId: branch-bishkek (ограничение)
4. Manager может управлять только этим филиалом
```

### Сценарий 4: Расширение доступа

```
1. User имеет роль "cashier" в филиале A
2. Добавляется вторая роль "staff" в филиале B
3. Теперь User может:
   - Работать кассиром в филиале A
   - Работать персоналом в филиале B
4. Разрешения объединяются
```

---

## 📊 Диаграмма потока данных

```
Seed скрипт (seed.ts)
       ↓
┌──────────────────────────────────────────┐
│ Конфигурация (ROLES, PERMISSIONS, etc)   │
└──────────────────────────────────────────┘
       ↓
Prisma Client
       ↓
┌──────────────────────────────────────────┐
│ PostgreSQL Database                      │
│ ┌──────────────────────────────────────┐ │
│ │ roles (7)                            │ │
│ ├──────────────────────────────────────┤ │
│ │ permissions (24+)                    │ │
│ ├──────────────────────────────────────┤ │
│ │ role_permissions (42+)               │ │
│ ├──────────────────────────────────────┤ │
│ │ product_categories (5)               │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
       ↓
API / Backend
       ↓
┌──────────────────────┬──────────────────┐
│                      │                  │
↓                      ↓                  ↓
Website              Admin             Telegram
(Customer)          (Manager)           Bot
└──────────────────────┬──────────────────┘
       ↓
Привязка пользователей к ролям и разрешениям
```

---

**Версия:** 1.0
**Дата:** 2024
**Статус:** ✅ Production Ready
