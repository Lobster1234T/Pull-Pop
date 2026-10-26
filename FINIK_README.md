# 💳 Finik Pay Integration

> Полная интеграция платежной системы Finik с фиксированной ценой **5 сомов**

## 📦 Что было сделано

✅ **Библиотека Finik** (`app/lib/finik.ts`)  
✅ **API эндпоинты** для создания платежей и вебхуков  
✅ **React компонент** готовой кнопки оплаты  
✅ **Тестовая страница** для проверки интеграции  
✅ **Документация и примеры**

## 🚀 Быстрый старт

### 1. Протестируйте интеграцию

```bash
npm run dev
```

Откройте браузер:
```
http://localhost:3000/payment-test
```

### 2. Добавьте кнопку на вашу страницу

```tsx
import PaymentButton from '@/app/components/PaymentButton';

export default function Page() {
  return (
    <PaymentButton
      workId="work-123"
      userId="user-456"
      workTopic="Payment description"
    />
  );
}
```

### 3. Обработайте webhook

Отредактируйте `app/api/finik/webhook/route.ts` и добавьте логику обновления БД:

```typescript
// После успешного платежа
await db.order.update({
  where: { id: workId },
  data: { status: 'PAID', paidAt: new Date() }
});
```

## 📁 Структура файлов

```
app/
├── lib/
│   └── finik.ts                    # Основная библиотека
├── api/finik/
│   ├── create-payment/route.ts     # Создание платежа
│   └── webhook/route.ts            # Обработка webhook
├── components/
│   └── PaymentButton.tsx           # Компонент кнопки
└── payment-test/page.tsx           # Тестовая страница
```

## 💰 Параметры

| Параметр | Значение |
|----------|----------|
| Сумма | 5 сомов (фиксированная) |
| Окружение | prod |
| Credentials | В `.env` ✅ |

## 📡 API

### POST /api/finik/create-payment

```json
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
  "paymentUrl": "https://...",
  "amount": 5
}
```

### POST /api/finik/webhook

Автоматически получает уведомления от Finik.

## 🎯 Props компонента

```tsx
<PaymentButton
  workId="string"        // ✅ ID заказа/работы
  userId="string"        // ✅ ID пользователя
  workTopic="string"     // ⭕ Описание платежа
  className="string"     // ⭕ CSS классы
  disabled={boolean}     // ⭕ Отключить кнопку
/>
```

## 📚 Документация

- **Быстрый старт**: `FINIK_QUICK_START.md`
- **Полная интеграция**: `FINIK_INTEGRATION_COMPLETE.md`
- **Примеры**: `FINIK_EXAMPLES.md`
- **Руководство**: `FINIK_INTEGRATION_GUIDE.md`

## ✅ Чек-лист

- [ ] Протестировал платеж на `/payment-test`
- [ ] Добавил `PaymentButton` на страницу
- [ ] Обновил логику в webhook
- [ ] Проверил переменные в `.env`
- [ ] Готово к production!

## 🔧 Обновление БД

**Файл:** `app/api/finik/webhook/route.ts`

Найдите комментарий `// 9. ЗДЕСЬ ВПИСЫВАЕМ ЛОГИКУ` и добавьте ваш код:

```typescript
const { userId, workId } = metadata;

// Ваша логика обновления БД:
// await prisma.work.update(...)
// await db.payment.create(...)
// и т.д.
```

## 🔍 Отладка

### Логи платежей

Проверьте консоль сервера:
```
[PAYMENT_SUCCESS] Work ID: ... | Amount: 5 | Transaction: ...
```

### Проверить окружение

```bash
cat .env | grep FINIK
```

## 💡 Примеры использования

### На странице профиля
```tsx
<PaymentButton
  workId={`balance-${user.id}`}
  userId={user.id}
  workTopic="Balance refill"
/>
```

### На странице заказа
```tsx
<PaymentButton
  workId={orderId}
  userId={userId}
  workTopic={`Order #${orderId}`}
/>
```

### На странице подписки
```tsx
<PaymentButton
  workId={`subscription-${Date.now()}`}
  userId={userId}
  workTopic="Premium subscription"
/>
```

## 🛠️ Кастомизация

### Изменить сумму платежа

Отредактируйте `app/lib/finik.ts`:
```typescript
const FIXED_AMOUNT = 5; // Измените сюда
```

### Изменить URL после оплаты

Отредактируйте `app/lib/finik.ts`:
```typescript
RedirectUrl: `${APP_URL}/dashboard?payment=success`, // Измените сюда
```

### Кастомные стили кнопки

```tsx
<PaymentButton
  workId="..."
  userId="..."
  className="bg-green-600 hover:bg-green-700 px-8 py-4"
/>
```

## 📞 Переменные окружения

Проверьте что все установлены в `.env`:

```env
FINIK_ENV="prod"
FINIK_API_KEY="..."
FINIK_ACCOUNT_ID="..."
FINIK_PRIVATE_KEY="..."
NEXT_PUBLIC_APP_URL="..."
```

## 🔐 Безопасность

✅ Верификация подписей webhook  
✅ Защита от replay-атак  
✅ Валидация входных данных  
✅ Окружение и credentials в `.env`

## 📊 Мониторинг

Добавьте в webhook логику:

```typescript
// Логирование платежей
console.log('[PAYMENT_SUCCESS]', {
  userId,
  workId,
  amount: body.amount,
  transaction: body.transactionId,
  timestamp: new Date(),
});

// Отправка метрик (опционально)
// await analytics.trackPayment(...)
```

## 🚀 Production Ready

Интеграция готова к использованию в production:

- ✅ Все credentials из переменных окружения
- ✅ HTTPS поддерживается
- ✅ Обработка ошибок реализована
- ✅ Логирование настроено
- ✅ Типизация TypeScript

## 📞 Поддержка

При вопросах:

1. Проверьте консоль браузера (DevTools)
2. Проверьте логи сервера
3. Прочитайте документацию в файлах
4. Протестируйте на `/payment-test`

---

**Интеграция завершена! Начните с добавления кнопки на вашу первую страницу. 🎉**
