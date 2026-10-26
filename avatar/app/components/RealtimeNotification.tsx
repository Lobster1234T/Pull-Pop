'use client';

import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { on, off, connectSocket, disconnectSocket } from '@/app/lib/socket';

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'review' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function RealtimeNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Подключиться к Socket.io
    connectSocket();

    // Слушать события
    on('notification:new', handleNewNotification);
    on('order:created', handleOrderCreated);
    on('payment:completed', handlePaymentCompleted);
    on('review:posted', handleReviewPosted);

    return () => {
      // Отключиться
      off('notification:new');
      off('order:created');
      off('payment:completed');
      off('review:posted');
      disconnectSocket();
    };
  }, []);

  const handleNewNotification = (data: any) => {
    addNotification({
      type: 'message',
      title: data.title,
      message: data.message,
    });
  };

  const handleOrderCreated = (data: any) => {
    addNotification({
      type: 'order',
      title: 'Новый заказ',
      message: `Заказ #${data.id} на сумму ${data.total} ₽`,
    });
  };

  const handlePaymentCompleted = (data: any) => {
    addNotification({
      type: 'payment',
      title: 'Платеж обработан',
      message: `Платеж на сумму ${data.amount} ₽ успешно обработан`,
    });
  };

  const handleReviewPosted = (data: any) => {
    addNotification({
      type: 'review',
      title: 'Новый отзыв',
      message: `Оставлен отзыв на товар "${data.productName}"`,
    });
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const id = `${Date.now()}`;
    const newNotif: Notification = {
      ...notif,
      id,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev].slice(0, 20));

    // Показать toast
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => {});
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700';
      case 'payment':
        return 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'review':
        return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600';
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 rounded-lg hover:border-cyan-500/80 transition-all"
      >
        <Bell className="w-6 h-6 text-cyan-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Уведомления ({unreadCount})
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Bell size={40} className="mx-auto mb-2 opacity-50" />
              <p>Нет уведомлений</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notif.type)} flex items-start gap-3`}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {notif.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notif.timestamp).toLocaleTimeString('ru-RU')}
                    </p>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={() => setNotifications([])}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Очистить все
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
