'use client';

import { useState } from 'react';

interface PaymentButtonProps {
  workId: string;
  workTopic?: string;
  userId: string;
  className?: string;
  disabled?: boolean;
}

export default function PaymentButton({
  workId,
  workTopic = 'Payment',
  userId,
  className = '',
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Вызов API для создания платежа
      const response = await fetch('/api/finik/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workId,
          workTopic,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      // 2. Редирект на платежную страницу Finik
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={isLoading || disabled}
        className={`
          bg-blue-600 hover:bg-blue-700 text-white font-semibold
          px-6 py-3 rounded-lg transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isLoading ? 'Создание платежа...' : 'Оплатить 5 сомов'}
      </button>
      
      {error && (
        <p className="text-red-600 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
}
