'use client';

import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import Link from 'next/link';

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  estimatedDelivery?: string;
  items?: any[];
}

export default function OrderConfirmation({
  orderNumber,
  total,
  estimatedDelivery,
  items,
}: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Message */}
      <div className="text-center mb-8">
        <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Заказ принят!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Спасибо за ваш заказ. Мы начали его обработку.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 space-y-6 mb-8">
        {/* Order Number */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Номер заказа:</span>
          <span className="font-mono font-bold text-gray-900 dark:text-white">
            {orderNumber}
          </span>
        </div>

        {/* Items */}
        {items && items.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Товары в заказе:
            </h3>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Итого:
          </span>
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {total.toLocaleString()} ₽
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4 mb-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Этапы заказа
        </h3>

        <div className="space-y-4">
          {/* Processing */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-1 h-12 bg-green-500 my-2"></div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Заказ принят
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ваш заказ успешно создан
              </p>
            </div>
          </div>

          {/* Packing */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Package className="w-10 h-10 text-gray-400" />
              <div className="w-1 h-12 bg-gray-300 dark:bg-gray-600 my-2"></div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Упаковка
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Товары упаковываются
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Truck className="w-10 h-10 text-gray-400" />
              <div className="w-1 h-12 bg-gray-300 dark:bg-gray-600 my-2"></div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Доставка
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Товар в пути
              </p>
            </div>
          </div>

          {/* Delivered */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Доставлено
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {estimatedDelivery || 'Ожидается в течение 3-5 дней'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/orders"
          className="flex-1 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors text-center"
        >
          Мои заказы
        </Link>
        <Link
          href="/"
          className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
        >
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
}
