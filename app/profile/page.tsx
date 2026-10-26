'use client';

import { User, Settings, LogOut, Award, Clock, Zap } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function ProfilePage() {
  const [profile] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    joinDate: '2024-09-15',
    level: 'Мастер',
    points: 12500,
    wins: 45,
  });

  const bookings = [
    { id: 1, zone: 'VIP', date: '2024-11-20', time: '18:00', duration: '2ч', status: 'Предстоит' },
    { id: 2, zone: 'STANDARD', date: '2024-11-18', time: '14:00', duration: '4ч', status: 'Завершено' },
    { id: 3, zone: 'PS5', date: '2024-11-15', time: '16:00', duration: '1ч', status: 'Завершено' },
  ];

  const achievements = [
    { emoji: '🏆', title: 'Чемпион месяца', desc: 'Выиграл 10 турниров' },
    { emoji: '🎯', title: 'Точный выстрел', desc: 'Первый lugar в FPS турнире' },
    { emoji: '🔥', title: 'На огне', desc: 'Серия из 5 побед подряд' },
    { emoji: '⚡', title: 'Молния', desc: 'Самая быстрая победа' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="glass border border-orange-500/30 rounded-xl p-8 flex items-center gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-orange-400 font-bold text-lg mb-4">{profile.level} • {profile.points.toLocaleString()} очков</p>
              <p className="text-slate-400">Участник с {new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
            <NeoButton variant="secondary" size="md" icon={<Settings className="w-4 h-4" />}>
              НАСТРОЙКИ
            </NeoButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, label: 'Уровень', value: profile.level },
              { icon: Zap, label: 'Очки', value: profile.points.toLocaleString() },
              { icon: Clock, label: 'Побед', value: profile.wins },
            ].map((stat, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bookings */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">Мои бронирования</h2>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="glass border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{booking.zone} зона</h3>
                    <p className="text-slate-400 text-sm">
                      {booking.date} • {booking.time} • {booking.duration}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                    booking.status === 'Предстоит'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-slate-600/20 text-slate-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <NeoButton variant="primary" size="lg" className="mt-8">
            НОВОЕ БРОНИРОВАНИЕ
          </NeoButton>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">Достижения</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-lg p-6 text-center hover:border-orange-500/60 hover-lift">
                <div className="text-5xl mb-3">{achievement.emoji}</div>
                <h3 className="font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-sm text-slate-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Account Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">Настройки аккаунта</h2>

          <div className="space-y-4">
            <div className="glass border border-orange-500/30 rounded-lg p-6 flex items-center justify-between hover:border-orange-500/60">
              <div>
                <h3 className="font-bold text-white mb-1">Email</h3>
                <p className="text-slate-400 text-sm">{profile.email}</p>
              </div>
              <NeoButton variant="secondary" size="sm">
                ИЗМЕНИТЬ
              </NeoButton>
            </div>

            <div className="glass border border-orange-500/30 rounded-lg p-6 flex items-center justify-between hover:border-orange-500/60">
              <div>
                <h3 className="font-bold text-white mb-1">Пароль</h3>
                <p className="text-slate-400 text-sm">Последнее изменение: 2 месяца назад</p>
              </div>
              <NeoButton variant="secondary" size="sm">
                ИЗМЕНИТЬ
              </NeoButton>
            </div>

            <div className="glass border border-orange-500/30 rounded-lg p-6 flex items-center justify-between hover:border-orange-500/60">
              <div>
                <h3 className="font-bold text-white mb-1">Уведомления</h3>
                <p className="text-slate-400 text-sm">Получайте обновления о турнирах и событиях</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500" />
            </div>

            <NeoButton variant="ghost" size="lg" className="w-full text-red-400 mt-8" icon={<LogOut className="w-5 h-5" />}>
              ВЫЙТИ
            </NeoButton>
          </div>
        </div>
      </section>
    </main>
  );
}
