'use client';

import { useState } from 'react';
import { CreditCard, Loader } from 'lucide-react';

interface PaymentMethodProps {
  orderId: string;
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function PaymentMethod({
  orderId,
  amount,
  onSuccess,
  onError,
}: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState('demo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const paymentMethods = [
    {
      id: 'demo',
      name: 'Демо платеж',
      description: 'Для тестирования (автоматически одобрен)',
      icon: '🧪',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Кредитная карта / Дебетовая карта',
      icon: '💳',
    },
    {
      id: 'post_kg',
      name: 'Post.kg',
      description: 'Система платежей Post.kg (Киргизия)',
      icon: '🏦',
    },
  ];

  const handlePayment = async () => {
    setError('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount,
          paymentMethod: selectedMethod,
          description: `Order #${orderId}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании платежа');
      }

      const data = await response.json();

      // Для демо платежа сразу вызываем success
      if (selectedMethod === 'demo') {
        onSuccess?.(data.paymentId);
      } else if (data.redirectUrl) {
        // Для реальных платежей перенаправляем на внешний сервис
        window.location.href = data.redirectUrl;
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Ошибка платежа';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Выберите способ оплаты
        </h3>

        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`
              p-4 border-2 rounded-lg cursor-pointer transition-all
              ${
                selectedMethod === method.id
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{method.icon}</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {method.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {method.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Amount Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 dark:text-gray-300">Сумма к оплате:</span>
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {amount.toLocaleString()} ₽
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Заказ: #{orderId}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing && <Loader size={20} className="animate-spin" />}
        {isProcessing ? 'Обработка...' : 'Оплатить'}
      </button>

      {/* Note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {selectedMethod === 'demo'
          ? 'Это тестовый платеж. Используйте для демонстрации.'
          : 'Вы будете перенаправлены на защищенную страницу платежей.'}
      </p>
    </div>
  );
}
