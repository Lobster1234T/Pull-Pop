'use client';

import { Check, Clock, Zap } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import { getTariffs, getZones } from '@/app/lib/db';

export default function TariffsPage() {
  const allTariffs = getTariffs();
  const zones = getZones();

  const groupedTariffs = zones.map(zone => ({
    zone,
    tariffs: allTariffs.filter(t => t.zone_id === zone.id)
  }));

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="ТАРИФЫ"
          subtitle="ГИБКИЕ И ВЫГОДНЫЕ ЦЕНЫ"
          colorA="#ffa500"
          colorB="#ff6b9d"
          speed={1}
        />
      </section>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center gradient-text">
            ДОСТУПНЫЕ ЦЕНЫ ДЛЯ ВСЕХ
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Выберите тариф по карману и играй без забот
          </p>
        </div>
      </section>

      {/* Tariffs by Zone */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {groupedTariffs.map(({ zone, tariffs }) => (
              <div key={zone.id}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="text-4xl">
                    {zone.type === 'standard' ? '🖥️' : zone.type === 'ps5' ? '🎮' : '👑'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-cyan-300">{zone.name}</h2>
                    <p className="text-slate-400">{zone.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {tariffs.map((tariff) => {
                    const isPopular = tariff.billing_type === 'package';

                    return (
                      <div
                        key={tariff.id}
                        className={`glass border rounded-xl p-8 transition-all ${
                          isPopular
                            ? 'border-cyan-500/60 bg-cyan-500/10 ring-2 ring-orange-500/30 hover-lift'
                            : 'border-cyan-500/30 hover:border-cyan-500/60 hover-lift'
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute -top-4 right-6 px-4 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold">
                            ПОПУЛЯРНО
                          </div>
                        )}

                        <h3 className="text-2xl font-black text-cyan-300 mb-2">{tariff.name}</h3>
                        <p className="text-slate-400 text-sm mb-6">{tariff.description}</p>

                        <div className="mb-6 pb-6 border-b border-cyan-500/20">
                          <div className="text-4xl font-black text-white mb-1">
                            ₽{tariff.price.toLocaleString()}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {tariff.duration_minutes} минут
                          </div>
                        </div>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-slate-300">
                            <Clock className="w-5 h-5 text-cyan-300" />
                            <span>
                              {tariff.duration_minutes} мин / {(tariff.price / (tariff.duration_minutes / 60)).toFixed(0)} ₽/час
                            </span>
                          </div>
                          {tariff.min_duration_minutes && (
                            <div className="flex items-center gap-3 text-slate-300">
                              <Zap className="w-5 h-5 text-cyan-300" />
                              <span>Минимум: {tariff.min_duration_minutes} мин</span>
                            </div>
                          )}
                          {tariff.billing_type === 'package' && (
                            <div className="flex items-center gap-3 text-slate-300">
                              <Check className="w-5 h-5 text-green-400" />
                              <span>Выгода до 15%</span>
                            </div>
                          )}
                        </div>

                        <NeoButton variant="primary" size="lg" className="w-full">
                          ВЫБРАТЬ
                        </NeoButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-cyan-300 mb-12 text-center">СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Ночной тариф',
                desc: 'С 20:00 до 08:00 - скидка 30%',
                icon: '🌙',
                color: 'from-purple-500 to-blue-500',
              },
              {
                title: 'Абонемент',
                desc: '10 часов в месяц - выгода 25%',
                icon: '📅',
                color: 'from-cyan-500 to-blue-500',
              },
              {
                title: 'Группа друзей',
                desc: '4+ человека - групповая скидка 20%',
                icon: '👥',
                color: 'from-orange-500 to-red-500',
              },
              {
                title: 'Студентам',
                desc: 'Скидка 15% каждый день',
                icon: '🎓',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((offer, idx) => (
              <div
                key={idx}
                className={`glass border border-cyan-500/30 rounded-xl p-8 bg-gradient-to-br ${offer.color} opacity-20 hover:opacity-30 transition-all hover-lift`}
              >
                <div className="text-5xl mb-4">{offer.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-slate-300">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-cyan-300 mb-12 text-center">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>

          <div className="space-y-4">
            {[
              { q: 'Можно ли зарезервировать место заранее?', a: 'Да, вы можете зарезервировать место на сайте за 1 час до начала.' },
              { q: 'Какой минимальный срок аренды?', a: 'Минимальный срок зависит от тарифа. Для большинства зон - 30 минут.' },
              { q: 'Есть ли скидки для постоянных клиентов?', a: 'Да, постоянные клиенты получают скидку на абонементы и пакеты.' },
              { q: 'Можно ли перенести бронирование?', a: 'Да, бронирование можно перенести за 2 часа до начала без штрафов.' },
            ].map((faq, idx) => (
              <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

