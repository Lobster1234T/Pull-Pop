# 🚀 Finik Pay - Быстрый старт

## ⚡ За 2 минуты

### 1. Протестируйте интеграцию
Откройте в браузере:
```
http://localhost:3000/payment-test
```

Нажмите кнопку "Оплатить 5 сомов" и вы будете перенаправлены на платежную страницу Finik.

### 2. Добавьте кнопку оплаты на вашу страницу

```tsx
// app/your-page/page.tsx
import PaymentButton from '@/app/components/PaymentButton';

export default function YourPage() {
  return (
    <div>
      <h1>Оплата услуги</h1>
      <PaymentButton
        workId="your-work-id"
        userId="current-user-id"
        workTopic="Описание платежа"
      />
    </div>
  );
}
```

### 3. Обработка результата платежа

Когда платеж пройден успешно, Finik отправит webhook на:
```
POST /api/finik/webhook
```

Логика обработки находится в `app/api/finik/webhook/route.ts`.

Найдите комментарий `// 9. ЗДЕСЬ ВПИСЫВАЕМ ЛОГИКУ ОБНОВЛЕНИЯ БАЗЫ ДАННЫХ` и добавьте ваш код:

```typescript
// Пример обновления статуса заказа
const { userId, workId } = metadata;

await prisma.work.update({
  where: { id: workId },
  data: {
    status: 'PAID',
    paidAt: new Date(),
    transactionId: body.transactionId,
  },
});
```

---

## 📋 Что интегрировано

| Компонент | Путь | Описание |
|-----------|------|---------|
| Библиотека Finik | `app/lib/finik.ts` | Основная логика работы с Finik |
| API создания платежа | `app/api/finik/create-payment/route.ts` | Создает платеж, возвращает URL |
| API webhook | `app/api/finik/webhook/route.ts` | Получает уведомления о статусе |
| Компонент кнопки | `app/components/PaymentButton.tsx` | Ready-to-use кнопка оплаты |
| Тестовая страница | `app/payment-test/page.tsx` | Для проверки интеграции |

---

## 💰 Важные параметры

| Параметр | Значение |
|----------|----------|
| **Сумма платежа** | 5 сомов (фиксированная) |
| **Окружение** | prod (указано в .env) |
| **API Key** | Установлен в .env ✅ |
| **Account ID** | Установлен в .env ✅ |
| **Private Key** | Установлен в .env ✅ |

---

## 🔗 Props компонента PaymentButton

```typescript
<PaymentButton
  workId="string"           // ✅ Обязательный - ID заказа/работы
  userId="string"           // ✅ Обязательный - ID пользователя
  workTopic="string"        // ⭕ Опциональный - описание платежа
  className="string"        // ⭕ Опциональный - CSS классы
  disabled={boolean}        // ⭕ Опциональный - отключить кнопку
/>
```

---

## 📡 API Endpoints

### Создание платежа
```bash
POST /api/finik/create-payment
Content-Type: application/json

{
  "workId": "work-123",
  "userId": "user-456",
  "workTopic": "Payment description"
}
```

**Ответ:**
```json
{
  "success": true,
  "paymentUrl": "https://beta.api.acquiring.averspay.kg/payment/...",
  "amount": 5
}
```

### Webhook (автоматически от Finik)
```bash
POST /api/finik/webhook
Headers:
  signature: "..."
  x-api-timestamp: "..."
  host: "..."
```

---

## ✅ Чек-лист использования

- [ ] Протестировал платеж на `/payment-test`
- [ ] Добавил `PaymentButton` на страницу
- [ ] Обновил логику в webhook эндпоинте
- [ ] Настроил redirect после оплаты
- [ ] Протестировал на реальных данных
- [ ] Готово к использованию!

---

## 🎯 Примеры использования

### На странице с профилем пользователя

```tsx
import PaymentButton from '@/app/components/PaymentButton';

export default function ProfilePage({ userId }: { userId: string }) {
  return (
    <div>
      <h2>Пополнить баланс</h2>
      <PaymentButton
        workId={`balance-refill-${Date.now()}`}
        userId={userId}
        workTopic="Пополнение баланса"
      />
    </div>
  );
}
```

### На странице заказа

```tsx
export default function OrderPage({ orderId, userId }: { orderId: string; userId: string }) {
  return (
    <div>
      <h2>Оплатить заказ</h2>
      <PaymentButton
        workId={orderId}
        userId={userId}
        workTopic={`Оплата заказа №${orderId}`}
      />
    </div>
  );
}
```

### На странице подписки

```tsx
export default function SubscriptionPage({ userId }: { userId: string }) {
  return (
    <div>
      <h2>Подписка Premium - 5 сомов в месяц</h2>
      <PaymentButton
        workId={`subscription-${Date.now()}`}
        userId={userId}
        workTopic="Premium subscription"
      />
    </div>
  );
}
```

---

## 🔍 Отладка

### Смотреть логи платежей
Откройте консоль сервера (терминал где запущен `npm run dev`) и ищите:
```
[PAYMENT_SUCCESS] Work ID: ... | User ID: ... | Amount: 5 | Transaction: ...
```

### Проверить переменные окружения
```bash
# В корне проекта
cat .env | grep FINIK
```

### Протестировать API
```bash
# Создание платежа
curl -X POST http://localhost:3000/api/finik/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "workId": "test-123",
    "userId": "user-456"
  }'
```

---

## 💡 Советы

1. **Используйте UUID для workId** - для уникальности платежей
2. **Сохраняйте transactionId** - для отслеживания платежей
3. **Добавьте нотификации** - уведомляйте пользователя о статусе
4. **Логируйте все платежи** - для аудита и отладки
5. **Используйте try-catch** - обрабатывайте ошибки сети

---

## 📚 Дополнительные ресурсы

- Полная документация: `FINIK_INTEGRATION_COMPLETE.md`
- Руководство интеграции: `FINIK_INTEGRATION_GUIDE.md`
- Тестовая страница: `/payment-test`

---

**Готово! Интеграция Finik Pay полностью завершена и готова к использованию! 🎉**
