'use client';

import { useEffect, useState } from 'react';
import { LogOut, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import RevenueChart from '@/app/components/Charts/RevenueChart';
import BookingsChart from '@/app/components/Charts/BookingsChart';
import PaymentsChart from '@/app/components/Charts/PaymentsChart';
import UsersChart from '@/app/components/Charts/UsersChart';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем, есть ли сессия
    const hasCookie = document.cookie.includes('admin-session');
    if (!hasCookie) {
      window.location.href = '/admin';
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // Удаляем cookie
    document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    window.location.href = '/admin';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <AnimatedBackground />

      {/* Навигация */}
      <nav className="relative z-20 bg-slate-900/80 backdrop-blur border-b border-cyan-500/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Выход
          </button>
        </div>
      </nav>

      {/* Контент */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 gradient-text">Аналитика и статистика</h2>
          <p className="text-slate-400">Ключевые метрики вашего бизнеса</p>
        </div>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <BookingsChart />
          <PaymentsChart />
          <UsersChart />
        </div>

        {/* Быстрые ссылки на управление */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/dashboard/zones" className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition cursor-pointer">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="font-bold text-white">Зоны</h3>
            <p className="text-slate-400 text-sm mt-1">Управление игровыми зонами</p>
          </Link>
          <Link href="/admin/dashboard/tariffs" className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition cursor-pointer">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-bold text-white">Тарифы</h3>
            <p className="text-slate-400 text-sm mt-1">Настройка цен и тарифов</p>
          </Link>
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 cursor-not-allowed opacity-60">
            <div className="text-3xl mb-2">👾</div>
            <h3 className="font-bold text-white">Игры</h3>
            <p className="text-slate-400 text-sm mt-1">Каталог игр (вскоре)</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 cursor-not-allowed opacity-60">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-white">Турниры</h3>
            <p className="text-slate-400 text-sm mt-1">Управление турнирами (вскоре)</p>
          </div>
        </div>
      </main>
    </div>
  );
}
