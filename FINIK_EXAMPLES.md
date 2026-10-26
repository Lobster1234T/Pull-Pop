# 📚 Примеры интеграции Finik Pay

## Практические примеры добавления кнопки оплаты на различные страницы

---

## 1️⃣ На странице тарифов (Tariffs)

**Файл:** `app/tariff/page.tsx` или компонент `TariffCard.tsx`

```tsx
'use client';

import { useState } from 'react';
import PaymentButton from '@/app/components/PaymentButton';

interface TariffCardProps {
  id: string;
  name: string;
  price: number;
  features: string[];
  userId: string; // Передайте от родительского компонента
}

export function TariffCard({ id, name, price, features, userId }: TariffCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-3xl font-bold mb-4">{price} сом</p>
      
      <ul className="mb-6 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <PaymentButton
        workId={`tariff-${id}-${Date.now()}`}
        userId={userId}
        workTopic={`Tariff: ${name}`}
        className="w-full"
      />
    </div>
  );
}
```

---

## 2️⃣ На странице профиля (Profile)

**Файл:** `app/profile/page.tsx`

```tsx
'use client';

import PaymentButton from '@/app/components/PaymentButton';
import { useAuth } from '@/hooks/useAuth'; // Ваш hook для получения текущего пользователя

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please login first</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Мой профиль</h1>

      {/* Текущий баланс */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Баланс</h2>
        <p className="text-3xl font-bold mb-4">{user.balance || 0} сом</p>
        
        <div>
          <h3 className="text-sm font-semibold mb-3">Пополнить баланс:</h3>
          <PaymentButton
            workId={`balance-${user.id}-${Date.now()}`}
            userId={user.id}
            workTopic="Balance refill"
          />
        </div>
      </div>

      {/* Другая информация профиля */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Имя</label>
          <p className="text-lg">{user.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <p className="text-lg">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 3️⃣ В модальном окне платежа

**Файл:** `app/components/PaymentModal.tsx`

```tsx
'use client';

import { useState } from 'react';
import PaymentButton from '@/app/components/PaymentButton';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  workId: string;
  userId: string;
  workTopic: string;
  amount?: number; // Опционально для отображения
}

export function PaymentModal({
  isOpen,
  onClose,
  workId,
  userId,
  workTopic,
  amount = 5,
}: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Подтверждение платежа</h2>

        <div className="bg-gray-50 rounded p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Сумма платежа:</p>
          <p className="text-3xl font-bold text-green-600">{amount} сом</p>
        </div>

        <p className="text-gray-600 mb-6">{workTopic}</p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Отмена
          </button>
          
          <div className="flex-1">
            <PaymentButton
              workId={workId}
              userId={userId}
              workTopic={workTopic}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Использование:**

```tsx
const [isPaymentOpen, setIsPaymentOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsPaymentOpen(true)}>
      Оплатить
    </button>

    <PaymentModal
      isOpen={isPaymentOpen}
      onClose={() => setIsPaymentOpen(false)}
      workId="order-123"
      userId="user-456"
      workTopic="Order #123"
    />
  </>
);
```

---

## 4️⃣ На странице бронирования (Booking)

**Файл:** `app/booking/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import PaymentButton from '@/app/components/PaymentButton';

interface BookingData {
  date: string;
  time: string;
  service: string;
}

export default function BookingPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const userId = 'current-user-id'; // Получите из session/context

  const handleBooking = (data: BookingData) => {
    setBooking(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Забронировать услугу</h1>

      {!booking ? (
        <BookingForm onSubmit={handleBooking} />
      ) : (
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Подтверждение бронирования</h2>

          <div className="space-y-4 mb-8 p-4 bg-white rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Дата</p>
              <p className="text-lg font-semibold">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Время</p>
              <p className="text-lg font-semibold">{booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Услуга</p>
              <p className="text-lg font-semibold">{booking.service}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Стоимость</p>
              <p className="text-2xl font-bold text-green-600">5 сом</p>
            </div>
          </div>

          <PaymentButton
            workId={`booking-${Date.now()}`}
            userId={userId}
            workTopic={`Booking: ${booking.service}`}
          />
        </div>
      )}
    </div>
  );
}

function BookingForm({ onSubmit }: { onSubmit: (data: BookingData) => void }) {
  const [formData, setFormData] = useState<BookingData>({
    date: '',
    time: '',
    service: '',
  });

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <div>
        <label className="block text-sm font-medium mb-2">Дата</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Время</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Услуга</label>
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Выберите услугу</option>
          <option value="Консультация">Консультация</option>
          <option value="Тестирование">Тестирование</option>
          <option value="Тренировка">Тренировка</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Продолжить к оплате
      </button>
    </form>
  );
}
```

---

## 5️⃣ На странице магазина (Shop)

**Файл:** `app/shop/page.tsx` или компонент `ProductCard.tsx`

```tsx
'use client';

import PaymentButton from '@/app/components/PaymentButton';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  userId: string;
}

export function ProductCard({ product, userId }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="mb-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">{product.price} сом</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Фиксированная цена
          </span>
        </div>

        <PaymentButton
          workId={`product-${product.id}-${Date.now()}`}
          userId={userId}
          workTopic={`Purchase: ${product.name}`}
          className="w-full"
        />
      </div>
    </div>
  );
}
```

---

## 6️⃣ В компоненте чата (ChatWidget)

**Файл:** `app/components/ChatWidget.tsx`

```tsx
'use client';

import { useState } from 'react';
import PaymentButton from '@/app/components/PaymentButton';

export default function ChatWidget() {
  const [showPayment, setShowPayment] = useState(false);
  const userId = 'current-user-id'; // Получите из context

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-bold">Поддержка</h3>
      </div>

      <div className="p-4 h-64 overflow-y-auto">
        {/* Сообщения чата */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Привет! Для приоритетной поддержки, пожалуйста, активируйте премиум.
          </p>
        </div>

        {showPayment ? (
          <div className="bg-gray-50 rounded p-3">
            <PaymentButton
              workId={`chat-premium-${Date.now()}`}
              userId={userId}
              workTopic="Chat Premium Support"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowPayment(true)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Активировать премиум
          </button>
        )}
      </div>
    </div>
  );
}
```

---

## 7️⃣ С обработкой ошибок и retry

**Файл:** `app/components/PaymentButtonWithRetry.tsx`

```tsx
'use client';

import { useState } from 'react';

interface PaymentButtonWithRetryProps {
  workId: string;
  userId: string;
  workTopic?: string;
  maxRetries?: number;
}

export default function PaymentButtonWithRetry({
  workId,
  userId,
  workTopic = 'Payment',
  maxRetries = 3,
}: PaymentButtonWithRetryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/finik/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workId,
          userId,
          workTopic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);

      // Автоматический retry
      if (retryCount < maxRetries) {
        console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
        setRetryCount(retryCount + 1);
        setTimeout(() => {
          handlePayment();
        }, 1000 * (retryCount + 1)); // Экспоненциальная задержка
      }
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`
          bg-blue-600 hover:bg-blue-700 text-white font-semibold
          px-6 py-3 rounded-lg transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isLoading ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            {retryCount > 0 ? `Повторная попытка... (${retryCount})` : 'Создание платежа...'}
          </>
        ) : (
          'Оплатить 5 сомов'
        )}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <p className="font-semibold">Ошибка платежа:</p>
          <p>{error}</p>
          {retryCount < maxRetries && (
            <p className="text-xs mt-1 text-red-600">
              Автоматическая повторная попытка...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 📝 Интеграция в существующие компоненты

### В Header.tsx - добавить кнопку быстрой оплаты

```tsx
// app/components/Header.tsx
import PaymentButton from '@/app/components/PaymentButton';

export default function Header({ userId }: { userId: string }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1>Avatar</h1>
        
        <div className="flex gap-4">
          {/* Существующие элементы */}
          
          {/* Добавить кнопку оплаты */}
          <PaymentButton
            workId={`header-purchase-${Date.now()}`}
            userId={userId}
            workTopic="Quick purchase"
          />
        </div>
      </div>
    </header>
  );
}
```

---

## ✅ Чек-лист для каждого примера

При добавлении кнопки оплаты на любую страницу:

- [ ] Импортирован `PaymentButton` из `/app/components/PaymentButton`
- [ ] Компонент помечен как `'use client'` (если на странице)
- [ ] Передан обязательный `workId` (уникальный ID)
- [ ] Передан обязательный `userId` (ID текущего пользователя)
- [ ] Добавлены нужные параметры `workTopic` и `className`
- [ ] Обновлена логика webhook в `/api/finik/webhook/route.ts`
- [ ] Протестирован платеж на `/payment-test`

---

## 🎨 Кастомизация стилей

Вы можете переопределить стили кнопки через `className`:

```tsx
<PaymentButton
  workId="..."
  userId="..."
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
/>
```

Или отредактировать CSS в самом компоненте `PaymentButton.tsx`.

---

**Выберите нужный пример и адаптируйте под вашу систему! 🚀**
