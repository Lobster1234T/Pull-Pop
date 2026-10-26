'use client';

import { BarChart3, Users, DollarSign, TrendingUp, Activity, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Пользователей', value: '2,847', change: '+12%' },
    { icon: DollarSign, label: 'Доход', value: '₽847,500', change: '+28%' },
    { icon: Activity, label: 'Активность', value: '8,234', change: '+5%' },
    { icon: TrendingUp, label: 'Конверсия', value: '3.24%', change: '+0.5%' },
  ];

  const recentUsers = [
    { id: 1, name: 'ProGamer2024', email: 'pro@mail.com', joined: '2 часа назад', status: 'Active' },
    { id: 2, name: 'CyberNinja', email: 'cyber@mail.com', joined: '5 часов назад', status: 'Active' },
    { id: 3, name: 'GamingFan99', email: 'fan@mail.com', joined: '1 день назад', status: 'Inactive' },
  ];

  const tournaments = [
    { name: 'CS:GO Championship', participants: 16, status: 'Active', prize: '500,000 ₽' },
    { name: 'Valorant Open', participants: 12, status: 'Active', prize: '300,000 ₽' },
    { name: 'Dota 2 League', participants: 8, status: 'Completed', prize: '200,000 ₽' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-orange-400 mb-2">АДМИН-ПАНЕЛЬ</h1>
              <p className="text-slate-400">Добро пожаловать, Admin</p>
            </div>
            <NeoButton variant="secondary" size="md" icon={<LogOut className="w-4 h-4" />}>
              ВЫХОД
            </NeoButton>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto">
          {['overview', 'users', 'tournaments', 'payments', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-orange-500/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="glass border border-orange-500/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-orange-400" />
                        <span className="text-green-400 text-sm font-bold">{stat.change}</span>
                      </div>
                      <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                      <div className="text-3xl font-black text-white">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass border border-orange-500/30 rounded-xl p-8">
                  <h3 className="text-lg font-bold text-orange-400 mb-6">Доход по месяцам</h3>
                  <div className="space-y-4">
                    {['Сентябрь', 'Октябрь', 'Ноябрь'].map((month, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-slate-400">{month}</span>
                          <span className="text-orange-400 font-bold">{[230, 420, 580][idx]}K</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${[50, 80, 95][idx]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass border border-orange-500/30 rounded-xl p-8">
                  <h3 className="text-lg font-bold text-orange-400 mb-6">Активные пользователи</h3>
                  <div className="space-y-3">
                    {['Турниры', 'Магазин', 'Трансляции', 'Блог'].map((category, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-slate-400">{category}</span>
                          <span className="text-cyan-400 font-bold">{[45, 32, 28, 15][idx]}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${[45, 32, 28, 15][idx]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="glass border border-orange-500/30 rounded-xl overflow-hidden">
              <div className="p-8 border-b border-orange-500/20">
                <h2 className="text-2xl font-bold text-orange-400">Пользователи</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-500/10 border-b border-orange-500/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-400">Имя</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-400">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-400">Присоединился</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-400">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-all">
                        <td className="px-6 py-4 text-white font-semibold">{user.name}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{user.joined}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === 'Active'
                              ? 'bg-green-500/30 text-green-400'
                              : 'bg-slate-500/30 text-slate-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-8">Турниры</h2>

              <div className="space-y-4">
                {tournaments.map((tournament, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 border border-orange-500/20 rounded-lg hover:border-orange-500/50 transition-all">
                    <div>
                      <h3 className="font-bold text-white mb-1">{tournament.name}</h3>
                      <p className="text-sm text-slate-400">{tournament.participants} участников</p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-lg font-black text-orange-400">{tournament.prize}</div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          tournament.status === 'Active'
                            ? 'bg-green-500/30 text-green-400'
                            : 'bg-slate-500/30 text-slate-400'
                        }`}>
                          {tournament.status}
                        </span>
                      </div>

                      <NeoButton variant="secondary" size="sm">
                        УПРАВЛЯТЬ
                      </NeoButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-8">Платежи</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Всего платежей', value: '₽2,450,000', change: '+35% за месяц' },
                  { title: 'Ожидающих', value: '₽125,000', change: '3 платежа' },
                  { title: 'Возвратов', value: '₽45,000', change: '-2% за месяц' },
                ].map((item, idx) => (
                  <div key={idx} className="border border-orange-500/20 rounded-lg p-6 text-center">
                    <div className="text-sm text-slate-400 mb-2">{item.title}</div>
                    <div className="text-3xl font-black text-orange-400 mb-2">{item.value}</div>
                    <div className="text-xs text-slate-500">{item.change}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-8 flex items-center gap-2">
                <Settings className="w-8 h-8" />
                Настройки
              </h2>

              <div className="space-y-6">
                {[
                  { title: 'Система уведомлений', desc: 'Отправлять уведомления по email' },
                  { title: 'Автосохранение', desc: 'Сохранять данные каждые 5 минут' },
                  { title: 'Логирование', desc: 'Записывать все действия администратора' },
                  { title: 'Резервная копия', desc: 'Создавать резервные копии еженедельно' },
                ].map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 border border-orange-500/20 rounded-lg">
                    <div>
                      <h3 className="font-bold text-white mb-1">{setting.title}</h3>
                      <p className="text-sm text-slate-400">{setting.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 accent-orange-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
