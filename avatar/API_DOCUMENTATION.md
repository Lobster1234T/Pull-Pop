# API Documentation

Полная документация всех API routes для e-commerce платформы.

## Оглавление

1. [Аутентификация и Авторизация](#аутентификация-и-авторизация)
2. [Товары (Products)](#товары-products)
3. [Корзина (Cart)](#корзина-cart)
4. [Заказы (Orders)](#заказы-orders)
5. [Отзывы (Reviews)](#отзывы-reviews)
6. [Поиск (Search)](#поиск-search)
7. [Избранное (Favorites)](#избранное-favorites)
8. [Категории (Categories)](#категории-categories)
9. [Админ Панель (Admin)](#админ-панель-admin)

## Аутентификация и Авторизация

Все защищённые endpoints требуют передачи JWT токена в заголовке `Authorization`:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Структура JWT токена
- `userId`: ID пользователя
- `email`: Email пользователя
- `iat`: Время выдачи
- `exp`: Время истечения (7 дней)

### Проверка ролей и разрешений

Система использует ролевую модель управления доступом (RBAC):
- Роли: Admin, Manager, Staff, Customer и т.д.
- Разрешения: product.create, order.view.all и т.д.

---

## Товары (Products)

### GET /api/products
Получить список всех товаров с пагинацией и фильтрацией.

**Query параметры:**
- `page` (число, default: 1) - номер страницы
- `limit` (число, default: 10, max: 100) - товаров на странице
- `categoryId` (строка) - ID категории для фильтрации
- `status` (строка, default: "active") - статус товара (active, inactive)
- `minPrice` (число) - минимальная цена
- `maxPrice` (число) - максимальная цена
- `search` (строка) - поиск по названию и описанию
- `sortBy` (строка, default: "createdAt") - поле для сортировки
- `sortOrder` (строка, default: "desc") - порядок сортировки (asc, desc)

**Ответ:**
```json
{
  "data": [
    {
      "id": "prod_123",
      "name": "Товар",
      "description": "Описание",
      "price": 99.99,
      "sku": "SKU-001",
      "quantity": 50,
      "status": "active",
      "category": {
        "id": "cat_123",
        "name": "Категория"
      },
      "images": [
        {
          "id": "img_123",
          "url": "https://..."
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasMore": true
  }
}
```

### GET /api/products/[id]
Получить детали товара по ID.

**Ответ:** Объект товара с полной информацией

### POST /api/products
Создать новый товар (требует разрешение `product.create`).

**Тело запроса:**
```json
{
  "name": "Новый товар",
  "categoryId": "cat_123",
  "description": "Описание товара",
  "price": 99.99,
  "sku": "SKU-002",
  "quantity": 100,
  "images": ["https://...url1", "https://...url2"],
  "metadata": {}
}
```

**Ответ:** Созданный объект товара (статус 201)

### PUT /api/products/[id]
Обновить товар (требует разрешение `product.update`).

**Тело запроса:** Любые поля товара для обновления

### DELETE /api/products/[id]
Удалить товар (требует разрешение `product.delete`).

---

## Корзина (Cart)

### GET /api/cart
Получить корзину текущего пользователя (требует аутентификация).

**Ответ:**
```json
{
  "id": "cart_123",
  "customerId": "cust_123",
  "items": [
    {
      "id": "cartitem_123",
      "productId": "prod_123",
      "quantity": 2,
      "product": {
        "id": "prod_123",
        "name": "Товар",
        "price": 99.99
      }
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### POST /api/cart
Добавить товар в корзину.

**Тело запроса:**
```json
{
  "productId": "prod_123",
  "quantity": 2
}
```

**Ответ:** Добавленный элемент корзины (статус 201)

### PUT /api/cart/[id]
Обновить количество товара в корзине.

**Тело запроса:**
```json
{
  "quantity": 5
}
```

**Примечание:** Если установить quantity = 0, товар будет удалён из корзины.

### DELETE /api/cart/[id]
Удалить товар из корзины.

### POST /api/cart/checkout
Оформить заказ из корзины (требует аутентификация).

**Тело запроса:**
```json
{
  "branchId": "branch_123",
  "deliveryType": "pickup|to_station|external",
  "addressId": "addr_123",
  "notes": "Комментарий к заказу",
  "promoCode": "SUMMER20"
}
```

**Ответ:** Созданный заказ с деталями (статус 201)

---

## Заказы (Orders)

### GET /api/orders
Получить список заказов текущего пользователя.

**Query параметры:**
- `page`, `limit`, `sortBy`, `sortOrder` - стандартные параметры пагинации
- `status` (строка) - фильтр по статусу заказа
- `branchId` (строка) - фильтр по филиалу

**Примечание:** Админ может просмотреть все заказы (требует разрешение `order.view.all`)

### GET /api/orders/[id]
Получить детали заказа.

### POST /api/orders
Создать новый заказ напрямую.

**Тело запроса:**
```json
{
  "branchId": "branch_123",
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2
    }
  ],
  "deliveryType": "pickup",
  "notes": "Комментарий"
}
```

### PUT /api/orders/[id]
Обновить статус заказа (требует разрешение `order.update`).

**Тело запроса:**
```json
{
  "status": "accepted|preparing|ready|delivering|completed|cancelled",
  "notes": "Обновлённый комментарий"
}
```

**Допустимые статусы:**
- `pending` - Ожидает
- `accepted` - Принят
- `preparing` - Подготавливается
- `ready` - Готов
- `delivering` - Доставляется
- `completed` - Завершён
- `cancelled` - Отменён

### DELETE /api/orders/[id]
Отменить заказ (только если статус pending или accepted).

---

## Отзывы (Reviews)

### GET /api/reviews
Получить отзывы о товаре.

**Query параметры:**
- `productId` (строка, **обязательно**) - ID товара
- `minRating` (число) - минимальный рейтинг
- `maxRating` (число) - максимальный рейтинг
- `page`, `limit` - стандартные параметры пагинации

### POST /api/reviews
Создать новый отзыв (требует аутентификация).

**Требования:**
- Пользователь должен быть клиентом
- Пользователь должен приобрести товар (статус заказа: completed)
- Пользователь не должен иметь уже существующий отзыв на этот товар

**Тело запроса:**
```json
{
  "productId": "prod_123",
  "rating": 5,
  "title": "Отличный товар!",
  "content": "Детальный отзыв о товаре..."
}
```

**Ответ:** Созданный отзыв в статусе `pending` (требует модерации)

### PUT /api/reviews/[id]
Обновить отзыв (только собственный отзыв).

**Тело запроса:**
```json
{
  "rating": 4,
  "title": "Обновлённый заголовок",
  "content": "Обновлённое содержание"
}
```

### DELETE /api/reviews/[id]
Удалить отзыв (требует разрешение `review.delete` для админа, или свой отзыв).

### GET /api/reviews/[id]/rating
Получить среднюю оценку товара и количество отзывов.

**Ответ:**
```json
{
  "productId": "prod_123",
  "averageRating": 4.5,
  "totalReviews": 15
}
```

---

## Поиск (Search)

### GET /api/search
Поиск и фильтрация товаров.

**Query параметры:**
- `q` (строка) - поисковая фраза
- `category` (строка) - ID категории
- `priceMin` (число) - минимальная цена
- `priceMax` (число) - максимальная цена
- `inStock` (boolean, default: false) - только товары в наличии
- `sortBy` (строка, default: "createdAt") - поле сортировки (name, price, createdAt, rating)
- `sortOrder` (строка, default: "desc")
- `page`, `limit` - пагинация

**Ответ:** Список товаров с информацией о рейтинге и количестве отзывов

**Примеры:**
- `/api/search?q=товар` - поиск по названию
- `/api/search?priceMin=10&priceMax=100` - фильтр по цене
- `/api/search?category=cat_123&sortBy=price&sortOrder=asc` - по категории и цене

---

## Избранное (Favorites)

### GET /api/favorites
Получить список избранных товаров (требует аутентификация).

**Query параметры:**
- `page`, `limit` - пагинация

### POST /api/favorites
Добавить товар в избранное.

**Тело запроса:**
```json
{
  "productId": "prod_123"
}
```

### DELETE /api/favorites/[id]
Удалить товар из избранного.

---

## Категории (Categories)

### GET /api/categories
Получить список категорий.

**Query параметры:**
- `status` (строка, default: "active")
- `page`, `limit`, `sortBy`, `sortOrder` - пагинация и сортировка

**Ответ:**
```json
{
  "data": [
    {
      "id": "cat_123",
      "name": "Электроника",
      "slug": "elektronika",
      "description": "Описание категории",
      "status": "active",
      "_count": {
        "products": 45
      }
    }
  ],
  "pagination": {}
}
```

### GET /api/categories/[id]
Получить детали категории.

### POST /api/categories
Создать новую категорию (требует разрешение `category.create`).

**Тело запроса:**
```json
{
  "name": "Новая категория",
  "slug": "new-category",
  "description": "Описание"
}
```

### PUT /api/categories/[id]
Обновить категорию (требует разрешение `category.update`).

### DELETE /api/categories/[id]
Удалить категорию (требует разрешение `category.delete`).

**Ограничение:** Категория не должна содержать товаров.

---

## Админ Панель (Admin)

### GET /api/admin/dashboard
Получить статистику и аналитику (требует разрешение `admin.dashboard.view`).

**Ответ:**
```json
{
  "summary": {
    "totalCustomers": 150,
    "totalProducts": 500,
    "activeProducts": 480,
    "totalOrders": 2000,
    "totalUsers": 200,
    "totalRevenue": 50000,
    "pendingReviews": 12,
    "totalReviews": 450,
    "lowStockProducts": 5
  },
  "trends": {
    "ordersLast30Days": 150,
    "ordersLast7Days": 35,
    "revenueLastMonth": 5000,
    "revenueLastWeek": 1000
  },
  "topProducts": [
    {
      "id": "prod_123",
      "name": "Товар",
      "unitsSold": 150
    }
  ],
  "recentOrders": [...],
  "ordersByStatus": {
    "pending": 10,
    "accepted": 5,
    "completed": 2000
  }
}
```

### GET /api/admin/products
Получить все товары с статистикой (требует разрешение `product.view.all`).

**Query параметры:**
- `status` - фильтр по статусу
- `search` - поиск по названию или SKU
- `categoryId` - фильтр по категории
- `page`, `limit`, `sortBy`, `sortOrder` - пагинация и сортировка

**Дополнительные поля:**
- `reviewCount` - количество отзывов
- `unitsSold` - продано единиц

### GET /api/admin/orders
Получить все заказы (требует разрешение `order.view.all`).

**Query параметры:**
- `status` - фильтр по статусу
- `branchId` - фильтр по филиалу
- `search` - поиск по номеру заказа или email клиента
- `page`, `limit`, `sortBy`, `sortOrder` - пагинация и сортировка

### GET /api/admin/users
Получить список всех пользователей (требует разрешение `user.view.all`).

**Query параметры:**
- `status` - фильтр по статусу
- `role` - фильтр по роли
- `search` - поиск по email или имени
- `page`, `limit`, `sortBy`, `sortOrder` - пагинация и сортировка

---

## Обработка Ошибок

Все API используют стандартную структуру ошибок:

```json
{
  "error": "Описание ошибки",
  "details": "Дополнительная информация (опционально)"
}
```

### HTTP Статус Коды
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Примеры Использования

### Пример 1: Регистрация и вход

```bash
# Вход (уже зарегистрирован)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Ответ:
# {
#   "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
#   "user": { "id": "...", "email": "user@example.com", "name": "User" }
# }
```

### Пример 2: Добавление товара в корзину

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": "prod_123", "quantity": 2}'
```

### Пример 3: Поиск товаров

```bash
curl "http://localhost:3000/api/search?q=электроника&priceMin=100&priceMax=500&sortBy=price&sortOrder=asc&page=1&limit=10"
```

### Пример 4: Создание отзыва

```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_123",
    "rating": 5,
    "title": "Отличный товар!",
    "content": "Использую уже месяц, очень доволен качеством."
  }'
```

### Пример 5: Оформление заказа из корзины

```bash
curl -X POST http://localhost:3000/api/cart/checkout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "branch_123",
    "deliveryType": "pickup",
    "notes": "Забрать в 18:00",
    "promoCode": "SUMMER20"
  }'
```

---

## Постоянные Параметры Пагинации

Все LIST endpoints поддерживают:
- `page` - номер страницы (default: 1)
- `limit` - товаров на странице (default: 10, max: 100)
- `sortBy` - поле для сортировки (default: createdAt)
- `sortOrder` - asc или desc (default: desc)

Ответ содержит объект `pagination`:
```json
{
  "page": 1,
  "limit": 10,
  "total": 100,
  "totalPages": 10,
  "hasMore": true
}
```

---

## Требования к Разрешениям

### Для создания/обновления товаров
- `product.create` - создание товара
- `product.update` - обновление товара
- `product.delete` - удаление товара
- `product.view.all` - просмотр всех товаров (админ)

### Для управления заказами
- `order.view.all` - просмотр всех заказов
- `order.update` - обновление статуса заказа
- `order.delete` - удаление заказа

### Для админ панели
- `admin.dashboard.view` - просмотр статистики
- `user.view.all` - просмотр всех пользователей
- `category.create`, `category.update`, `category.delete` - управление категориями

---

## Примечания

1. **Аутентификация**: Большинство endpoints требуют JWT токен
2. **Пагинация**: Максимум 100 товаров на странице
3. **Безопасность**: Пароли хэшируются, sensitive данные не передаются
4. **Отзывы**: Требуют модерации перед публикацией
5. **Корзина**: Очищается при оформлении заказа
6. **Товары**: При удалении заказа, товары возвращаются на склад

---

Последнее обновление: 2024
