'use client';

import { Zap, Users, Trophy, Heart } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import BranchMap from '@/app/components/BranchMap';
import { getBranch } from '@/app/lib/db';

export default function AboutPage() {
  const branch = getBranch();

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="О НАС"
          subtitle="ИСТОРИЯ И ЦЕННОСТИ"
          colorA="#10b981"
          colorB="#059669"
          speed={1}
        />
      </section>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center gradient-text">
            ПРЕМИУМ ИГРОВОЙ КЛУБ
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Узнайте больше о нашей миссии, команде и достижениях
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="glass border border-cyan-500/30 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6">НАША ИСТОРИЯ</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                AVATAR Gaming Club основан в 2023 году с целью создать самый комфортный и современный игровой клуб в регионе.
              </p>
              <p>
                Мы инвестировали в лучшее оборудование, подготовили профессиональный персонал и создали уникальную атмосферу для геймеров.
              </p>
              <p>
                Сегодня AVATAR — это место, где встречаются профессиональные киберспортсмены, любители игр и друзья, чтобы провести время вместе.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center">НАШИ ЦЕННОСТИ</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Инновация', desc: 'Используем последние технологии' },
              { icon: Users, title: 'Сообщество', desc: 'Создаем кружок единомышленников' },
              { icon: Trophy, title: 'Совершенство', desc: 'Стремимся к высочайшему качеству' },
              { icon: Heart, title: 'Забота', desc: 'Заботимся о каждом гостле' },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6 hover-lift text-center">
                  <Icon className="w-8 h-8 text-cyan-300 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center">КОМАНДА</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Александр', role: 'Основатель и CEO', emoji: '👨‍💼' },
              { name: 'Мария', role: 'Директор по операциям', emoji: '👩‍💼' },
              { name: 'Иван', role: 'Технический директор', emoji: '👨‍🔧' },
              { name: 'Елена', role: 'Менеджер мероприятий', emoji: '👩‍🎯' },
            ].map((member, idx) => (
              <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-white mb-2">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center">ПО ЧИСЛАМ</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Счастливых клиентов в месяц' },
              { number: '32', label: 'Мощных ПК и консолей' },
              { number: '24/7', label: 'Работаем не закрываясь' },
              { number: '12', label: 'Турниров в год' },
            ].map((stat, idx) => (
              <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6 text-center hover-lift">
                <div className="text-4xl font-black text-cyan-300 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center">ЛОКАЦИЯ</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <BranchMap />

            <div className="space-y-6">
              <div className="glass border border-cyan-500/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-4">РЕЖИМ РАБОТЫ</h3>
                <div className="space-y-2 text-slate-300 text-sm">
                  <div className="flex justify-between">
                    <span>Понедельник - Четверг</span>
                    <span className="text-cyan-300 font-semibold">10:00 - 00:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Пятница</span>
                    <span className="text-cyan-300 font-semibold">10:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота</span>
                    <span className="text-cyan-300 font-semibold">10:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Воскресенье</span>
                    <span className="text-cyan-300 font-semibold">10:00 - 23:00</span>
                  </div>
                </div>
              </div>

              <div className="glass border border-cyan-500/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-4">КАК ДОБРАТЬСЯ</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>• <span className="text-cyan-300 font-semibold">Автобус:</span> маршруты 201, 202</li>
                  <li>• <span className="text-cyan-300 font-semibold">Метро:</span> станция Молодежная</li>
                  <li>• <span className="text-cyan-300 font-semibold">Парковка:</span> бесплатная на территории</li>
                </ul>
              </div>

              <NeoButton variant="primary" size="lg" className="w-full">
                ЗАБРОНИРОВАТЬ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

