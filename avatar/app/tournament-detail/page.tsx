'use client';

import { Trophy, Users, Clock, DollarSign, Zap, Medal, Target } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function TournamentDetailPage() {
  const tournament = {
    name: 'CS:GO Pro League Championship 2024',
    status: 'РЕГИСТРАЦИЯ',
    prizePool: '500,000 ₽',
    teams: 16,
    format: '5v5 Elimination',
    startDate: '2024-11-15',
    endDate: '2024-11-22',
    region: 'Центральная Азия',
  };

  const teams = [
    { rank: 1, name: 'Cyber Elite', wins: 8, seed: 1 },
    { rank: 2, name: 'Dragon Force', wins: 7, seed: 2 },
    { rank: 3, name: 'Phoenix Squad', wins: 6, seed: 3 },
    { rank: 4, name: 'Storm Team', wins: 5, seed: 4 },
    { rank: 5, name: 'Shadow Ops', wins: 4, seed: 5 },
  ];

  const schedule = [
    { round: 'Четвертьфинал', date: '15 ноября', time: '18:00', status: 'ПРЕДСТОИТ' },
    { round: 'Полуфинал', date: '18 ноября', time: '19:00', status: 'ПРЕДСТОИТ' },
    { round: 'Финал', date: '22 ноября', time: '20:00', status: 'ПРЕДСТОИТ' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="glass border border-orange-500/30 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl sm:text-6xl font-black text-orange-400 mb-4">{tournament.name}</h1>
              <div className="flex justify-center gap-3 flex-wrap">
                <span className="px-4 py-2 bg-orange-500 text-white rounded-full font-bold text-sm">
                  {tournament.status}
                </span>
                <span className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-full font-bold text-sm border border-purple-500/50">
                  {tournament.region}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: Trophy, label: 'Призовой фонд', value: tournament.prizePool },
                { icon: Users, label: 'Команд', value: tournament.teams },
                { icon: Target, label: 'Формат', value: tournament.format },
                { icon: Clock, label: 'Дата', value: `${tournament.startDate.split('-')[2]}.${tournament.startDate.split('-')[1]}` },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <Icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-sm text-slate-400 mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-orange-400">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">О ТУРНИРЕ</h2>
            <div className="glass border border-orange-500/30 rounded-xl p-8 space-y-4 text-slate-300">
              <p>
                Это крупнейший турнир по CS:GO в регионе Центральной Азии с призовым фондом 500,000 рублей.
              </p>
              <p>
                Турнир проводится в формате 5v5 Elimination с участием лучших команд региона.
              </p>
              <p>
                Все матчи будут транслироваться в прямом эфире на нашем канале с участием профессиональных комментаторов.
              </p>
            </div>
          </div>

          {/* Register */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400 mb-6">УЧАСТИЕ</h2>
            <div className="glass border border-orange-500/30 rounded-xl p-8 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-black text-orange-400 mb-2">15,000 ₽</div>
                <div className="text-sm text-slate-400">за команду</div>
              </div>

              <div className="border-t border-orange-500/20 pt-4 space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  Мест осталось: 3
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  Регистрация до: 31 окт
                </div>
              </div>

              <NeoButton variant="primary" size="lg" className="w-full">
                ЗАРЕГИСТРИРОВАТЬ КОМАНДУ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>

      {/* Registered Teams */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8 flex items-center gap-2">
            <Medal className="w-8 h-8" />
            ЗАРЕГИСТРИРОВАННЫЕ КОМАНДЫ
          </h2>

          <div className="space-y-3">
            {teams.map((team) => (
              <div key={team.rank} className="glass border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      team.rank === 1 ? 'bg-yellow-500 text-black' :
                      team.rank === 2 ? 'bg-slate-400 text-black' :
                      team.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-slate-700 text-white'
                    }`}>
                      #{team.rank}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{team.name}</h3>
                      <p className="text-sm text-slate-400">Seed: #{team.seed}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-orange-400">{team.wins}W</div>
                    <div className="text-xs text-slate-400">Побед</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8 flex items-center gap-2">
            <Clock className="w-8 h-8" />
            РАСПИСАНИЕ
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-orange-400 mb-4">{item.round}</h3>
                <div className="text-sm text-slate-400 mb-2">{item.date}</div>
                <div className="text-2xl font-black text-white mb-4">{item.time}</div>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">ПРАВИЛА</h2>

          <div className="glass border border-orange-500/30 rounded-xl p-8 space-y-4 text-slate-300">
            <h3 className="font-bold text-lg text-orange-400">Основные правила:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>5v5 командный формат</li>
              <li>Лучшего 2 из 3 раундов</li>
              <li>Финал - лучшего 3 из 5</li>
              <li>Запрещён использованием чит-кодов и модификаций</li>
              <li>Игроки должны иметь действительные аккаунты Steam</li>
              <li>Судьи решения - окончательны</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
