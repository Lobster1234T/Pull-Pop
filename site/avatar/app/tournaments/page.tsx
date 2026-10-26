'use client';

import { Trophy, Users, DollarSign, Calendar } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import { getTournaments } from '@/app/lib/db';

export default function TournamentsPage() {
  const tournaments = getTournaments();

  const gameEmojis: Record<string, string> = {
    'CS:GO': '🎯',
    'Valorant': '🔫',
    'Gran Turismo 7': '🏎️',
  };

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="ТУРНИРЫ"
          subtitle="СОРЕВНОВАНИЯ И ПРИЗЫ"
          colorA="#ff6b9d"
          colorB="#c44569"
          speed={1}
        />
      </section>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center gradient-text">
            УЧАСТВУЙТЕ И ПОБЕЖДАЙТЕ
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Выбирайте турниры, формируйте команду и получайте щедрые призы
          </p>
        </div>
      </section>

      {/* Tournaments */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => {
              const statusLabel = {
                active: 'В ПРОЦЕССЕ',
                registration: 'РЕГИСТРАЦИЯ',
                completed: 'ЗАВЕРШЕН',
              }[tournament.status] || 'ПРЕДСТОИТ';

              const statusColor = {
                active: 'bg-green-500/30 text-green-400',
                registration: 'bg-cyan-500/30 text-cyan-300',
                completed: 'bg-slate-500/30 text-slate-400',
              }[tournament.status] || 'bg-slate-500/30 text-slate-400';

              return (
                <div key={tournament.id} className="glass border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-500/60 hover-lift group transition-all">
                  {/* Image */}
                  <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 p-8 text-center text-6xl h-40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {gameEmojis[tournament.game] || '🎮'}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Status Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${statusColor}`}>
                      {statusLabel}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-black text-white mb-2 line-clamp-2">
                      {tournament.name}
                    </h3>

                    {/* Game */}
                    <p className="text-sm text-cyan-300 font-semibold mb-4">{tournament.game}</p>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                      {tournament.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-cyan-500/20">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-4 h-4 text-cyan-300" />
                          <span>Участников</span>
                        </div>
                        <span className="text-cyan-300 font-bold">
                          {tournament.participants}/{tournament.maxParticipants}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <DollarSign className="w-4 h-4 text-cyan-300" />
                          <span>Призовой фонд</span>
                        </div>
                        <span className="text-cyan-300 font-bold">
                          ₽{tournament.prizePool.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-cyan-300" />
                          <span>Начало</span>
                        </div>
                        <span className="text-cyan-300 font-bold">
                          {new Date(tournament.startDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <NeoButton
                      variant="primary"
                      size="md"
                      className="w-full"
                      disabled={tournament.status === 'completed'}
                    >
                      {tournament.status === 'completed'
                        ? 'ЗАВЕРШЕН'
                        : tournament.status === 'registration'
                        ? 'ЗАРЕГИСТРИРОВАТЬСЯ'
                        : 'СМОТРЕТЬ'}
                    </NeoButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center">КАК УЧАСТВОВАТЬ</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Выберите турнир', desc: 'Из доступных турниров' },
              { step: '2', title: 'Зарегистрируйтесь', desc: 'Заполните профиль команды' },
              { step: '3', title: 'Оплатите взнос', desc: 'Безопасный платеж онлайн' },
              { step: '4', title: 'Сыграйте!', desc: 'Приходите и побеждайте' },
            ].map((item, idx) => (
              <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6 hover-lift text-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center">ПРАВИЛА</h2>

          <div className="glass border border-cyan-500/30 rounded-xl p-8">
            <ul className="space-y-4">
              {[
                'Все участники должны быть зарегистрированы в системе',
                'Минимальный возраст: 12 лет (родительское согласие обязательно)',
                'Запрещено использование читов и модификаций',
                'Каждая команда должна состоять из 5 игроков',
                'Матчи проводятся на официальном сервере',
                'Судьи решения являются окончательными',
              ].map((rule, idx) => (
                <li key={idx} className="flex gap-4 text-slate-300">
                  <span className="text-cyan-300 font-bold">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

