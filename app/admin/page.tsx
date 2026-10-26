'use client';

import { useEffect, useState } from 'react';
import AdminDashboard from '@/app/components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userJson = localStorage.getItem('user');

        console.log('=== Admin Page Check ===');
        console.log('Token:', !!token);
        console.log('User JSON:', userJson);

        if (!token || !userJson) {
          console.log('No token or user in localStorage, redirecting to home');
          window.location.href = '/';
          return;
        }

        const user = JSON.parse(userJson);
        console.log('Parsed user:', user);
        console.log('User isAdmin:', user.isAdmin);

        // Check if user is admin
        if (user.isAdmin === true) {
          console.log('✅ Admin access granted');
          setUser(user);
          setIsLoading(false);
          return;
        }

        // If not admin, show error
        console.log('❌ Not an admin');
        setError('У вас нет доступа к админ-панели');
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка проверки:', error);
        setError('Ошибка при проверке доступа');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading && !error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <p className="text-slate-300 mt-4">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500 text-red-300 p-8 rounded-lg max-w-md">
          <h1 className="text-2xl font-bold mb-4">Ошибка доступа</h1>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Админ-панель</h1>
          <p className="text-slate-400">Добро пожаловать, {user.name || user.email}!</p>
        </div>
        
        <AdminDashboard />
      </div>
    </div>
  );
}
