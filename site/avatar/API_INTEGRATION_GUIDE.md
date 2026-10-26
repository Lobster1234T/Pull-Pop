# API Integration Guide

Руководство по интеграции API e-commerce системы.

## Требуемые Модели Prisma

Перед использованием API убедитесь, что в вашей БД созданы следующие модели.

### Добавьте эти модели в `prisma/schema.prisma`

```prisma
// ============================================================================
// PRODUCT MANAGEMENT MODULE
// ============================================================================

model ProductCategory {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(150)
  slug        String   @unique @db.VarChar(150)
  description String?  @db.Text
  status      ProductCategoryStatus @default(active)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  products ProductImage[]

  @@index([slug])
  @@index([status])
}

model Product {
  id          String        @id @default(cuid())
  categoryId  String
  name        String        @db.VarChar(255)
  slug        String?       @unique @db.VarChar(255)
  description String?       @db.Text
  price       Decimal       @db.Decimal(12, 2)
  sku         String?       @unique @db.VarChar(100)
  quantity    Int           @default(0)
  status      ProductStatus @default(active)
  metadata    Json?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  category      ProductCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  images        ProductImage[]
  cartItems     CartItem[]
  orderItems    OrderItem[]
  favorites     Favorite[]
  reviews       Review[]

  @@index([categoryId])
  @@index([status])
  @@index([sku])
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  url       String   @db.Text
  createdAt DateTime @default(now())

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
}

// ============================================================================
// CART MODULE
// ============================================================================

model Cart {
  id         String     @id @default(cuid())
  customerId String     @unique
  items      CartItem[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt

  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  @@index([customerId])
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  productId String
  quantity  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  cart    Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([cartId, productId])
  @@index([cartId])
  @@index([productId])
}

// ============================================================================
// ORDERS MODULE
// ============================================================================

model Order {
  id               String      @id @default(cuid())
  customerId       String
  branchId         String
  bookingId        String?
  orderNumber      String      @unique @db.VarChar(50)
  status           OrderStatus @default(pending)
  deliveryType     DeliveryType
  subtotal         Decimal     @db.Decimal(12, 2)
  discountAmount   Decimal     @default(0) @db.Decimal(12, 2)
  totalAmount      Decimal     @db.Decimal(12, 2)
  notes            String?     @db.Text
  promoCodeId      String?
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  completedAt      DateTime?
  cancelledAt      DateTime?

  customer   Customer      @relation(fields: [customerId], references: [id], onDelete: Cascade)
  branch     Branch        @relation(fields: [branchId], references: [id], onDelete: Cascade)
  items      OrderItem[]
  promoCode  PromoCode?    @relation(fields: [promoCodeId], references: [id], onDelete: SetNull)
  delivery   Delivery?
  review     Review?

  @@index([customerId])
  @@index([branchId])
  @@index([status])
  @@index([orderNumber])
  @@index([createdAt])
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  productId  String
  quantity   Int
  unitPrice  Decimal  @db.Decimal(12, 2)
  totalPrice Decimal  @db.Decimal(12, 2)
  createdAt  DateTime @default(now())

  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@index([productId])
}

model Delivery {
  id             String         @id @default(cuid())
  orderId        String         @unique
  zone           String?        @db.VarChar(100)
  status         DeliveryStatus @default(pending)
  estimatedDate  DateTime?
  actualDate     DateTime?
  trackingNumber String?        @unique @db.VarChar(100)
  notes          String?        @db.Text
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@index([status])
}

// ============================================================================
// REVIEWS MODULE
// ============================================================================

model Review {
  id          String       @id @default(cuid())
  productId   String
  customerId  String
  orderId     String?
  rating      Int
  title       String?      @db.VarChar(255)
  content     String       @db.Text
  status      ReviewStatus @default(pending)
  helpfulVotes Int         @default(0)
  moderatedBy String?
  moderatedAt DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  product      Product       @relation(fields: [productId], references: [id], onDelete: Cascade)
  customer     Customer      @relation(fields: [customerId], references: [id], onDelete: Cascade)
  order        Order?        @relation(fields: [orderId], references: [id], onDelete: SetNull)
  moderator    User?         @relation("ReviewModeratedBy", fields: [moderatedBy], references: [id], onDelete: SetNull)
  replies      ReviewReply[]

  @@unique([productId, customerId])
  @@index([productId])
  @@index([customerId])
  @@index([status])
}

model ReviewReply {
  id        String   @id @default(cuid())
  reviewId  String
  createdById String
  content   String   @db.Text
  createdAt DateTime @default(now())

  review    Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  createdBy User   @relation(fields: [createdById], references: [id], onDelete: Cascade)

  @@index([reviewId])
}

// ============================================================================
// FAVORITES MODULE
// ============================================================================

model Favorite {
  id         String   @id @default(cuid())
  customerId String
  productId  String
  createdAt  DateTime @default(now())

  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  product  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([customerId, productId])
  @@index([customerId])
  @@index([productId])
}

// ============================================================================
// PROMOTIONS MODULE
// ============================================================================

model PromoCode {
  id             String          @id @default(cuid())
  code           String          @unique @db.VarChar(50)
  description    String?         @db.Text
  discountType   DiscountType
  discountValue  Decimal         @db.Decimal(12, 2)
  maxUsage       Int             @default(0)
  usageCount     Int             @default(0)
  minOrderAmount Decimal?        @db.Decimal(12, 2)
  status         PromoCodeStatus @default(active)
  expiresAt      DateTime
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  orders PromoCodeUsage[]

  @@index([code])
  @@index([status])
  @@index([expiresAt])
}

model PromoCodeUsage {
  id         String   @id @default(cuid())
  customerId String
  promoCodeId String
  orderId    String
  usedAt     DateTime @default(now())

  customer  Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)
  promoCode PromoCode @relation(fields: [promoCodeId], references: [id], onDelete: Cascade)
  order     Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@unique([customerId, promoCodeId, orderId])
  @@index([customerId])
  @@index([promoCodeId])
}

// ============================================================================
// LOYALTY SYSTEM
// ============================================================================

model LoyaltyLevel {
  id               String              @id @default(cuid())
  name             String              @unique @db.VarChar(100)
  code             String              @unique @db.VarChar(50)
  minPoints        Int                 @default(0)
  bonusPointsMultiplier Decimal       @default(1) @db.Decimal(3, 2)
  discountPercent  Decimal             @default(0) @db.Decimal(5, 2)
  status           LoyaltyLevelStatus  @default(active)
  createdAt        DateTime            @default(now())

  customers Customer[]

  @@index([code])
}

model Wallet {
  id         String       @id @default(cuid())
  customerId String       @unique
  type       WalletType
  balance    Decimal      @default(0) @db.Decimal(12, 2)
  status     WalletStatus @default(active)
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt

  customer     Customer              @relation(fields: [customerId], references: [id], onDelete: Cascade)
  transactions WalletTransaction[]

  @@index([customerId])
}

model WalletTransaction {
  id          String               @id @default(cuid())
  walletId    String
  type        WalletTransactionType
  amount      Decimal              @db.Decimal(12, 2)
  description String?              @db.Text
  createdAt   DateTime             @default(now())

  wallet Wallet @relation(fields: [walletId], references: [id], onDelete: Cascade)

  @@index([walletId])
  @@index([createdAt])
}

model BonusTransaction {
  id         String               @id @default(cuid())
  customerId String
  type       BonusTransactionType
  amount     Int
  description String?             @db.Text
  orderId    String?
  createdAt  DateTime             @default(now())

  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  @@index([customerId])
  @@index([createdAt])
}
```

## Миграция БД

После добавления моделей выполните:

```bash
# Создать миграцию
npx prisma migrate dev --name add_ecommerce_models

# Синхронизировать схему
npx prisma db push

# Обновить Prisma Client
npx prisma generate
```

## Вспомогательные Файлы

Созданы следующие вспомогательные файлы для работы с API:

### `/lib/auth.ts`
Содержит функции для:
- Получения JWT токена из запроса
- Проверки токена
- Получения текущего пользователя
- Проверки ролей и разрешений
- Middleware для аутентификации и авторизации

### `/lib/api-utils.ts`
Содержит утилиты для:
- Параметров пагинации
- Форматирования списков ответов
- Обработки ошибок БД
- Валидации полей
- Парсинга фильтров и сортировки

## Структура API Routes

```
/api
  ├── /products
  │   ├── route.ts          # GET (список), POST (создать)
  │   └── [id]
  │       └── route.ts      # GET, PUT (обновить), DELETE
  ├── /cart
  │   ├── route.ts          # GET (корзина), POST (добавить)
  │   ├── [id]
  │   │   └── route.ts      # PUT (обновить), DELETE (удалить)
  │   └── /checkout
  │       └── route.ts      # POST (оформить заказ)
  ├── /orders
  │   ├── route.ts          # GET (мои заказы), POST (создать)
  │   └── [id]
  │       └── route.ts      # GET, PUT (статус), DELETE (отменить)
  ├── /reviews
  │   ├── route.ts          # GET (по товару), POST (создать)
  │   └── [id]
  │       ├── route.ts      # PUT (обновить), DELETE (удалить)
  │       └── /rating
  │           └── route.ts  # GET (средняя оценка)
  ├── /search
  │   └── route.ts          # GET (поиск и фильтрация)
  ├── /favorites
  │   ├── route.ts          # GET (мои избранные), POST (добавить)
  │   └── [id]
  │       └── route.ts      # DELETE (удалить)
  ├── /categories
  │   ├── route.ts          # GET, POST (админ)
  │   └── [id]
  │       └── route.ts      # GET, PUT, DELETE (админ)
  └── /admin
      ├── /dashboard
      │   └── route.ts      # GET (статистика)
      ├── /products
      │   └── route.ts      # GET (все товары)
      ├── /orders
      │   └── route.ts      # GET (все заказы)
      └── /users
          └── route.ts      # GET (все пользователи)
```

## Инициализация Системы

### 1. Создание Ролей и Разрешений

```bash
# Создать скрипт для инициализации ролей
# prisma/init-roles.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeRoles() {
  // Создать роли
  const roles = [
    { name: 'Admin', code: 'admin', description: 'Администратор' },
    { name: 'Manager', code: 'manager', description: 'Менеджер' },
    { name: 'Customer', code: 'customer', description: 'Клиент' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    });
  }

  // Создать разрешения
  const permissions = [
    { code: 'product.create', name: 'Создание товаров', module: 'products' },
    { code: 'product.update', name: 'Обновление товаров', module: 'products' },
    { code: 'product.delete', name: 'Удаление товаров', module: 'products' },
    { code: 'product.view.all', name: 'Просмотр всех товаров', module: 'products' },
    { code: 'order.view.all', name: 'Просмотр всех заказов', module: 'orders' },
    { code: 'order.update', name: 'Обновление статуса заказов', module: 'orders' },
    { code: 'admin.dashboard.view', name: 'Просмотр панели администратора', module: 'admin' },
    { code: 'user.view.all', name: 'Просмотр всех пользователей', module: 'admin' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: {},
      create: permission,
    });
  }

  console.log('Роли и разрешения инициализированы');
}

initializeRoles()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 2. Создание Категорий Товаров

```typescript
async function initializeCategories() {
  const categories = [
    { name: 'Электроника', slug: 'elektronika', description: 'Электронные товары' },
    { name: 'Одежда', slug: 'odezhda', description: 'Одежда и аксессуары' },
    { name: 'Книги', slug: 'knigi', description: 'Книги и издания' },
    { name: 'Спорт', slug: 'sport', description: 'Спортивные товары' },
  ];

  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        ...category,
        status: 'active',
      },
    });
  }
}
```

## Тестирование API

### Используя cURL

```bash
# Получить токен
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  | jq -r '.token')

# Получить товары
curl "http://localhost:3000/api/products" \
  -H "Authorization: Bearer $TOKEN"
```

### Используя Postman

1. Создайте новую коллекцию "E-commerce API"
2. Добавьте переменную окружения `token`
3. После входа, установите `token` из ответа
4. Используйте `{{token}}` в заголовке Authorization

### Используя REST Client (VS Code)

Создайте файл `requests.http`:

```http
@baseUrl = http://localhost:3000/api
@token = YOUR_JWT_TOKEN

### Получить товары
GET {{baseUrl}}/products
Authorization: Bearer {{token}}

### Добавить в корзину
POST {{baseUrl}}/cart
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "productId": "prod_123",
  "quantity": 1
}
```

## Обработка Ошибок

Все endpoints возвращают стандартизированные ошибки:

```json
{
  "error": "Описание ошибки",
  "details": "Дополнительная информация"
}
```

## Производительность

### Рекомендации

1. **Кэширование**: Кэшируйте список категорий на клиенте
2. **Пагинация**: Всегда используйте параметр limit
3. **Индексы**: Проверьте индексы в БД для часто фильтруемых полей
4. **Асинхронность**: Используйте Promise.all() для параллельных запросов

### Оптимизация Запросов

```typescript
// Плохо - N+1 проблема
const products = await prisma.product.findMany();
for (const product of products) {
  const reviews = await prisma.review.count({ where: { productId: product.id } });
}

// Хорошо - один запрос
const products = await prisma.product.findMany({
  include: {
    _count: { select: { reviews: true } },
  },
});
```

## Безопасность

1. **Валидация входных данных** - всегда проверяйте на сервере
2. **Rate limiting** - добавьте ограничение на количество запросов
3. **CORS** - настройте правильно для вашего домена
4. **JWT тайм-ауты** - используйте короткие сроки действия токена
5. **Хеширование паролей** - используйте bcrypt с солью

## Зависимости

Убедитесь, что установлены:

```json
{
  "dependencies": {
    "next": "16.4.0",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "jsonwebtoken": "^9.0.3",
    "bcryptjs": "^3.0.3"
  },
  "devDependencies": {
    "@prisma/client": "^5.22.0",
    "prisma": "^5.22.0",
    "typescript": "^5"
  }
}
```

Последнее обновление: 2024
