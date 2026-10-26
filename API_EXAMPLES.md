# API Примеры использования

Практические примеры для работы со всеми API endpoints.

## Содержание

1. [Настройка](#настройка)
2. [Аутентификация](#аутентификация)
3. [Товары](#товары)
4. [Корзина](#корзина)
5. [Заказы](#заказы)
6. [Отзывы](#отзывы)
7. [Поиск](#поиск)
8. [Избранное](#избранное)
9. [Административные операции](#административные-операции)
10. [JavaScript/TypeScript примеры](#javascripttypescript-примеры)

## Настройка

### URL базы
```
http://localhost:3000
```

### Заголовки
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Аутентификация

### Вход
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Ответ:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Сохранение токена
Сохраните токен в localStorage или sessionStorage для использования в последующих запросах.

---

## Товары

### Получить все товары
```bash
# Базовый запрос
curl "http://localhost:3000/api/products"

# С пагинацией
curl "http://localhost:3000/api/products?page=1&limit=20"

# С фильтрацией
curl "http://localhost:3000/api/products?categoryId=cat_123&status=active"

# С сортировкой
curl "http://localhost:3000/api/products?sortBy=price&sortOrder=asc"
```

### Получить товар по ID
```bash
curl "http://localhost:3000/api/products/prod_123"
```

### Создать товар (админ)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ноутбук",
    "categoryId": "cat_electronics",
    "description": "Мощный ноутбук для работы",
    "price": 1299.99,
    "sku": "LAPTOP-001",
    "quantity": 50,
    "images": [
      "https://example.com/laptop1.jpg",
      "https://example.com/laptop2.jpg"
    ],
    "metadata": {
      "brand": "Dell",
      "model": "XPS 15"
    }
  }'
```

### Обновить товар (админ)
```bash
curl -X PUT http://localhost:3000/api/products/prod_123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "quantity": 40,
    "status": "active"
  }'
```

### Удалить товар (админ)
```bash
curl -X DELETE http://localhost:3000/api/products/prod_123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Корзина

### Получить корзину
```bash
curl "http://localhost:3000/api/cart" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Добавить товар в корзину
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_laptop",
    "quantity": 1
  }'
```

**Примеры:**
- Добавить 2 товара: `"quantity": 2`
- Если товар уже в корзине, количество увеличится

### Обновить количество товара
```bash
curl -X PUT http://localhost:3000/api/cart/cartitem_123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

**Примечание:** Если установить `quantity: 0`, товар будет удален.

### Удалить товар из корзины
```bash
curl -X DELETE http://localhost:3000/api/cart/cartitem_123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Оформить заказ (checkout)
```bash
curl -X POST http://localhost:3000/api/cart/checkout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "branch_central",
    "deliveryType": "pickup",
    "addressId": "addr_123",
    "notes": "Забрать до 18:00",
    "promoCode": "SUMMER2024"
  }'
```

**Параметры:**
- `deliveryType`: `pickup`, `to_station`, `external`
- `addressId`: ID адреса доставки (опционально)
- `promoCode`: Код скидки (опционально)

**Ответ:**
```json
{
  "id": "order_456",
  "orderNumber": "ORD-1704067200000",
  "status": "pending",
  "totalAmount": 1299.99,
  "items": [...],
  "createdAt": "2024-01-01T12:00:00Z"
}
```

---

## Заказы

### Получить мои заказы
```bash
# Все заказы текущего пользователя
curl "http://localhost:3000/api/orders" \
  -H "Authorization: Bearer YOUR_TOKEN"

# С фильтрацией по статусу
curl "http://localhost:3000/api/orders?status=completed" \
  -H "Authorization: Bearer YOUR_TOKEN"

# С пагинацией
curl "http://localhost:3000/api/orders?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Получить детали заказа
```bash
curl "http://localhost:3000/api/orders/order_456" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Создать заказ напрямую (без корзины)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "branch_central",
    "items": [
      {
        "productId": "prod_laptop",
        "quantity": 1
      },
      {
        "productId": "prod_mouse",
        "quantity": 2
      }
    ],
    "deliveryType": "to_station",
    "notes": "Срочная доставка"
  }'
```

### Обновить статус заказа (админ)
```bash
curl -X PUT http://localhost:3000/api/orders/order_456 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparing",
    "notes": "Начали подготовку"
  }'
```

**Допустимые статусы:**
- `pending` - Ожидает
- `accepted` - Принят
- `preparing` - Подготавливается
- `ready` - Готов
- `delivering` - Доставляется
- `completed` - Завершён
- `cancelled` - Отменён

### Отменить заказ
```bash
curl -X DELETE http://localhost:3000/api/orders/order_456 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Примечание:** Только заказы со статусом `pending` или `accepted` можно отменить.

---

## Отзывы

### Получить отзывы о товаре
```bash
# Все одобренные отзывы
curl "http://localhost:3000/api/reviews?productId=prod_laptop"

# С фильтрацией по рейтингу
curl "http://localhost:3000/api/reviews?productId=prod_laptop&minRating=4&maxRating=5"

# С пагинацией
curl "http://localhost:3000/api/reviews?productId=prod_laptop&page=1&limit=5"
```

### Получить среднюю оценку
```bash
curl "http://localhost:3000/api/reviews/prod_laptop/rating"
```

**Ответ:**
```json
{
  "productId": "prod_laptop",
  "averageRating": 4.5,
  "totalReviews": 25
}
```

### Создать отзыв
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_laptop",
    "rating": 5,
    "title": "Отличный ноутбук!",
    "content": "Использую уже месяц. Производительность супер, батарея держит весь день. Сборка отличная. Рекомендую всем!"
  }'
```

**Требования:**
- Рейтинг от 1 до 5
- Товар должен быть куплен
- Максимум один отзыв на товар

### Обновить отзыв
```bash
curl -X PUT http://localhost:3000/api/reviews/review_789 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "content": "Обновленный текст отзыва..."
  }'
```

### Удалить отзыв
```bash
curl -X DELETE http://localhost:3000/api/reviews/review_789 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Поиск

### Базовый поиск
```bash
# Поиск по названию
curl "http://localhost:3000/api/search?q=ноутбук"

# Поиск с фильтром по цене
curl "http://localhost:3000/api/search?q=ноутбук&priceMin=1000&priceMax=2000"
```

### Поиск по категории
```bash
curl "http://localhost:3000/api/search?category=cat_electronics"
```

### Поиск с сортировкой
```bash
# По цене (от дешевого к дорогому)
curl "http://localhost:3000/api/search?sortBy=price&sortOrder=asc"

# По названию (А-Я)
curl "http://localhost:3000/api/search?sortBy=name&sortOrder=asc"

# По рейтингу
curl "http://localhost:3000/api/search?sortBy=rating&sortOrder=desc"
```

### Только товары в наличии
```bash
curl "http://localhost:3000/api/search?inStock=true"
```

### Комбинированный поиск
```bash
curl "http://localhost:3000/api/search?q=ноутбук&category=cat_electronics&priceMin=800&priceMax=1500&inStock=true&sortBy=price&sortOrder=asc&page=1&limit=20"
```

---

## Избранное

### Получить избранные товары
```bash
curl "http://localhost:3000/api/favorites" \
  -H "Authorization: Bearer YOUR_TOKEN"

# С пагинацией
curl "http://localhost:3000/api/favorites?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Добавить в избранное
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_laptop"
  }'
```

### Удалить из избранного
```bash
curl -X DELETE http://localhost:3000/api/favorites/favorite_999 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Административные операции

### Получить панель статистики
```bash
curl "http://localhost:3000/api/admin/dashboard" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Ответ содержит:**
- Общую статистику (кол-во клиентов, товаров, заказов, доход)
- Тренды за 7 и 30 дней
- Топ товаров по продажам
- Последние заказы
- Распределение заказов по статусам

### Получить все товары (админ)
```bash
curl "http://localhost:3000/api/admin/products?status=active&page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Получить все заказы (админ)
```bash
curl "http://localhost:3000/api/admin/orders?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# С фильтром по статусу
curl "http://localhost:3000/api/admin/orders?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# С поиском
curl "http://localhost:3000/api/admin/orders?search=user@example.com" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Получить всех пользователей (админ)
```bash
curl "http://localhost:3000/api/admin/users?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# По роли
curl "http://localhost:3000/api/admin/users?role=customer" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# По статусу
curl "http://localhost:3000/api/admin/users?status=active" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Управление категориями

#### Получить категории
```bash
curl "http://localhost:3000/api/categories"
```

#### Создать категорию
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Электроника",
    "slug": "elektronika",
    "description": "Электронные товары и гаджеты"
  }'
```

#### Обновить категорию
```bash
curl -X PUT http://localhost:3000/api/categories/cat_123 \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Электроника и гаджеты",
    "description": "Обновленное описание"
  }'
```

#### Удалить категорию
```bash
curl -X DELETE http://localhost:3000/api/categories/cat_123 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## JavaScript/TypeScript примеры

### Инициализация API клиента

```typescript
class ApiClient {
  private baseUrl: string = 'http://localhost:3000/api';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Error');
    }

    return response.json();
  }

  // Товары
  async getProducts(page = 1, limit = 10) {
    return this.request(`/products?page=${page}&limit=${limit}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async searchProducts(query: string, filters = {}) {
    const params = new URLSearchParams({
      q: query,
      ...filters,
    });
    return this.request(`/search?${params}`);
  }

  // Корзина
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId: string, quantity: number) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(id: string, quantity: number) {
    return this.request(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async checkout(checkoutData: any) {
    return this.request('/cart/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
  }

  // Заказы
  async getOrders(page = 1, limit = 10) {
    return this.request(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  // Отзывы
  async getReviews(productId: string, page = 1) {
    return this.request(`/reviews?productId=${productId}&page=${page}`);
  }

  async createReview(data: any) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Избранное
  async getFavorites() {
    return this.request('/favorites');
  }

  async addToFavorites(productId: string) {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }
}
```

### Использование клиента

```typescript
const api = new ApiClient();

// После логина сохраните токен
api.setToken('YOUR_JWT_TOKEN');

// Получить товары
const products = await api.getProducts(1, 20);
console.log(products);

// Поиск
const searchResults = await api.searchProducts('ноутбук', {
  priceMin: 1000,
  priceMax: 2000,
});

// Добавить в корзину
await api.addToCart('prod_laptop', 1);

// Получить корзину
const cart = await api.getCart();
console.log(cart);

// Оформить заказ
const order = await api.checkout({
  branchId: 'branch_central',
  deliveryType: 'pickup',
  promoCode: 'SUMMER2024',
});
console.log('Заказ создан:', order.orderNumber);

// Получить отзывы
const reviews = await api.getReviews('prod_laptop');

// Создать отзыв
const review = await api.createReview({
  productId: 'prod_laptop',
  rating: 5,
  title: 'Отличный товар!',
  content: 'Очень доволен покупкой...',
});
```

### React компонент для отправки запросов

```typescript
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?page=1&limit=10');
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Цена: ${product.price}</p>
          <button onClick={() => addToCart(product.id)}>
            Добавить в корзину
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## Советы и лучшие практики

1. **Всегда сохраняйте токен** после входа для использования в защищённых endpoints
2. **Проверяйте статус ответа** перед обработкой данных
3. **Используйте параметр limit** для оптимизации запросов
4. **Кэшируйте категории и часто запрашиваемые товары**
5. **Валидируйте данные** перед отправкой на сервер
6. **Обрабатывайте ошибки** с помощью try-catch блоков
7. **Используйте debounce** для поиска при вводе пользователем

---

Последнее обновление: 2024
