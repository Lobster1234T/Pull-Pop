'use client';

import { Trophy, Medal, Zap } from 'lucide-react';
import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function LeaderboardPage() {
  const players = [
    { rank: 1, name: 'Иван "Pro" Петров', points: 12500, wins: 45, level: 'Легенда', medal: '🥇' },
    { rank: 2, name: 'Алексей "Apex" Смиров', points: 11800, wins: 42, level: 'Мастер', medal: '🥈' },
    { rank: 3, name: 'Дмитрий "Flash" Иванов', points: 11200, wins: 40, level: 'Мастер', medal: '🥉' },
    { rank: 4, name: 'Сергей "Pixel" Сергеев', points: 10900, wins: 38, level: 'Эксперт', medal: '4️⃣' },
    { rank: 5, name: 'Кирилл "Nova" Козлов', points: 10500, wins: 36, level: 'Эксперт', medal: '5️⃣' },
    { rank: 6, name: 'Константин "Speed" Волков', points: 9800, wins: 33, level: 'Профессионал', medal: '6️⃣' },
    { rank: 7, name: 'Валерий "Storm" Ветров', points: 9200, wins: 31, level: 'Профессионал', medal: '7️⃣' },
    { rank: 8, name: 'Виталий "Cyber" Цветков', points: 8700, wins: 29, level: 'Любитель', medal: '8️⃣' },
    { rank: 9, name: 'Андрей "Echo" Беляев', points: 8100, wins: 27, level: 'Любитель', medal: '9️⃣' },
    { rank: 10, name: 'Игорь "Raid" Раздобудько', points: 7500, wins: 25, level: 'Новичок', medal: '🔟' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center neon-text-orange">
            РЕЙТИНГ ИГРОКОВ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Лучшие геймеры месяца. Докажите свой скилл и займите топ позицию
          </p>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {players.slice(0, 3).map((player, idx) => {
              const podiumHeights = ['md:h-96', 'h-80', 'md:h-72'];
              const medals = [
                { icon: Trophy, color: 'from-yellow-400 to-orange-400', glow: 'shadow-yellow-500/50' },
                { icon: Medal, color: 'from-slate-300 to-slate-400', glow: 'shadow-slate-500/50' },
                { icon: Medal, color: 'from-orange-600 to-orange-700', glow: 'shadow-orange-500/50' },
              ];

              const MedalIcon = medals[idx].icon;

              return (
                <div key={player.rank} className={`flex flex-col items-center ${podiumHeights[idx]}`}>
                  {/* Medal */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${medals[idx].color} rounded-full flex items-center justify-center mb-4 shadow-lg ${medals[idx].glow}`}>
                    <MedalIcon className="w-12 h-12 text-white" />
                  </div>

                  {/* Card */}
                  <div className="glass border border-orange-500/30 rounded-xl p-6 w-full hover-lift">
                    <div className="text-center">
                      <div className="text-4xl font-black text-orange-400 mb-2">{player.medal}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
                      <p className="text-sm text-orange-400 font-bold mb-4">{player.level}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-400">
                          <span>Очки:</span>
                          <span className="text-orange-400 font-bold">{player.points.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Побед:</span>
                          <span className="text-orange-400 font-bold">{player.wins}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Leaderboard */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8 flex items-center gap-2">
            <Zap className="w-8 h-8" />
            ПОЛНЫЙ РЕЙТИНГ
          </h2>

          <div className="glass border border-orange-500/30 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-500/20 bg-orange-500/5">
                    <th className="px-6 py-4 text-left text-orange-400 font-bold">Место</th>
                    <th className="px-6 py-4 text-left text-orange-400 font-bold">Игрок</th>
                    <th className="px-6 py-4 text-center text-orange-400 font-bold">Уровень</th>
                    <th className="px-6 py-4 text-right text-orange-400 font-bold">Очки</th>
                    <th className="px-6 py-4 text-right text-orange-400 font-bold">Побед</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.rank} className={`border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors ${
                      player.rank <= 3 ? 'bg-orange-500/2' : ''
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{player.medal}</span>
                          <span className="text-xl font-bold text-orange-400">#{player.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-white">{player.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                          {player.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-orange-400">{player.points.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-300">{player.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
