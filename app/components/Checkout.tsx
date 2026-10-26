'use client';

import { useState } from 'react';
import { Loader, MapPin, Phone, Mail } from 'lucide-react';

interface CheckoutProps {
  items: any[];
  onSubmit?: (data: any) => Promise<void>;
  onCancel?: () => void;
}

export default function Checkout({ items, onSubmit, onCancel }: CheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onSubmit?.({
        ...formData,
        items,
        totalAmount,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка оформления заказа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Личные данные
          </h3>

          <input
            type="text"
            placeholder="Имя"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Адрес доставки
          </h3>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Адрес"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Город"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Почтовый индекс"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Способ оплаты
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['card', 'cash', 'wallet'].map((method) => (
            <label
              key={method}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.paymentMethod === method
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="mr-2"
              />
              <span className="capitalize font-semibold text-gray-900 dark:text-white">
                {method === 'card' && 'Карта'}
                {method === 'cash' && 'Наличные'}
                {method === 'wallet' && 'E-кошелек'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          Итоговая сумма
        </h3>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
            <span>Итого:</span>
            <span className="text-cyan-600 dark:text-cyan-400">
              {totalAmount.toLocaleString()} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader size={20} className="animate-spin" />}
          {isLoading ? 'Обработка...' : 'Оформить заказ'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
