'use client';

import PaymentButton from '@/app/components/PaymentButton';
import { useEffect, useState } from 'react';

export default function PaymentTestPage() {
  const [testWorkId, setTestWorkId] = useState('test-work-loading');
  const [testUserId] = useState('test-user-123');

  useEffect(() => {
    // Генерируем ID на клиенте, чтобы избежать проблем с prerendering
    setTestWorkId('test-work-' + Date.now());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">
            Тест платежа Finik Pay
          </h1>
          
          <p className="text-center text-slate-600 mb-8">
            Фиксированная цена: <span className="font-bold text-lg text-green-600">5 сомов</span>
          </p>

          <div className="space-y-4 mb-8 p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm text-slate-600">ID работы:</p>
              <p className="text-sm font-mono text-slate-900">{testWorkId}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">ID пользователя:</p>
              <p className="text-sm font-mono text-slate-900">{testUserId}</p>
            </div>
          </div>

          <div className="mb-6">
            <PaymentButton
              workId={testWorkId}
              userId={testUserId}
              workTopic="Test Payment"
              className="w-full"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-slate-700">
            <p className="font-semibold mb-2">📝 Инструкция:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Нажмите кнопку "Оплатить 5 сомов"</li>
              <li>Вы будете перенаправлены на платежную страницу Finik</li>
              <li>Сканируйте QR-код для оплаты</li>
              <li>После успешной оплаты вернётесь на сайт</li>
            </ol>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              🔒 Это тестовая страница. Используйте для проверки интеграции Finik Pay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
