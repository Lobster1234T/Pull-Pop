'use client';

import { useState, useEffect } from 'react';
import { Eye, Package, Calendar, DollarSign } from 'lucide-react';
import { LoadingSkeleton, Pagination } from './index';

interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

interface OrderHistoryProps {
  onOrderClick?: (order: Order) => void;
}

export default function OrderHistory({ onOrderClick }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/orders?page=${page}`);
      const data = await response.json();
      setOrders(data.data);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'accepted':
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ready':
      case 'delivering':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: 'В ожидании',
      accepted: 'Принят',
      preparing: 'Подготовка',
      ready: 'Готов',
      delivering: 'Доставка',
      completed: 'Завершен',
      cancelled: 'Отмен',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return <LoadingSkeleton height={200} count={3} />;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          У вас нет заказов
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Заказ #{order.orderNumber}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <Calendar size={16} />
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Сумма</p>
                  <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                    {order.totalAmount.toLocaleString()} ₽
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Товары ({order.items.length}):
              </p>
              <div className="space-y-2">
                {order.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {item.productId || 'Товар'} x {item.quantity}
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ... и еще {order.items.length - 2}
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onOrderClick?.(order)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-700 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Eye size={16} />
              Подробнее
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
