'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Loader,
} from 'lucide-react';

interface PaymentStatusProps {
  paymentId: string;
  onStatusChange?: (status: string) => void;
}

export default function PaymentStatus({
  paymentId,
  onStatusChange,
}: PaymentStatusProps) {
  const [payment, setPayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchPaymentStatus();
    // Проверять статус каждые 5 секунд
    const interval = setInterval(fetchPaymentStatus, 5000);
    return () => clearInterval(interval);
  }, [paymentId]);

  const fetchPaymentStatus = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(`/api/payments/webhook?paymentId=${paymentId}`);

      if (response.ok) {
        const data = await response.json();
        setPayment(data);
        onStatusChange?.(data.status);
      }
    } catch (error) {
      console.error('Ошибка получения статуса:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader size={48} className="mx-auto mb-4 text-cyan-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Загрузка статуса...</p>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="text-center py-8">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
        <p className="text-gray-600 dark:text-gray-400">Платеж не найден</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={48} className="text-green-500" />;
      case 'pending':
        return <Clock size={48} className="text-yellow-500" />;
      case 'failed':
        return <AlertCircle size={48} className="text-red-500" />;
      default:
        return <AlertCircle size={48} className="text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Платеж успешно обработан';
      case 'pending':
        return 'Платеж в ожидании';
      case 'failed':
        return 'Платеж не прошел';
      default:
        return 'Неизвестный статус';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Display */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getStatusIcon(payment.status)}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${getStatusColor(payment.status)}`}>
          {getStatusLabel(payment.status)}
        </h2>
      </div>

      {/* Payment Details */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">ID платежа:</span>
          <span className="font-mono text-sm text-gray-900 dark:text-white">
            {paymentId}
          </span>
        </div>

        {payment.transactionId && (
          <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Транзакция:</span>
            <span className="font-mono text-sm text-gray-900 dark:text-white">
              {payment.transactionId}
            </span>
          </div>
        )}

        <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Сумма:</span>
          <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
            {(payment.amount || 0).toLocaleString()} ₽
          </span>
        </div>

        <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Статус:</span>
          <span className={`font-semibold ${getStatusColor(payment.status)}`}>
            {getStatusLabel(payment.status)}
          </span>
        </div>

        {payment.createdAt && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Дата:</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(payment.createdAt).toLocaleString('ru-RU')}
            </span>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchPaymentStatus}
        disabled={isRefreshing}
        className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isRefreshing && <Loader size={18} className="animate-spin" />}
        Обновить статус
      </button>
    </div>
  );
}
