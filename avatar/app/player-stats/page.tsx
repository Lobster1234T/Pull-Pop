'use client';

import { TrendingUp, Award, Zap, Target, Clock, Users } from 'lucide-react';
import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function PlayerStatsPage() {
  const playerStats = {
    username: 'CyberNinja',
    level: 47,
    totalMatches: 1247,
    winRate: 68.5,
    kills: 15847,
    deaths: 4236,
    avgKD: 3.74,
    playTime: '2,341 часов',
  };

  const recentMatches = [
    { id: 1, game: 'CS:GO', result: 'WIN', score: '16-8', rank: 'Global Elite', date: '2 часа назад' },
    { id: 2, game: 'Valorant', result: 'WIN', score: '13-9', rank: 'Immortal', date: '5 часов назад' },
    { id: 3, game: 'Dota 2', result: 'LOSS', score: '45-32', rank: '5000 MMR', date: '8 часов назад' },
    { id: 4, game: 'CS:GO', result: 'WIN', score: '16-14', rank: 'Global Elite', date: '12 часов назад' },
    { id: 5, game: 'Valorant', result: 'WIN', score: '13-11', rank: 'Immortal', date: '1 день назад' },
  ];

  const achievements = [
    { title: '500 Kills', icon: '🎯', rarity: 'COMMON' },
    { title: 'Kill Spree', icon: '⚡', rarity: 'RARE' },
    { title: 'Tournament Winner', icon: '🏆', rarity: 'LEGENDARY' },
    { title: '100% Accuracy', icon: '🎪', rarity: 'EPIC' },
    { title: 'Headshot Master', icon: '💀', rarity: 'RARE' },
    { title: 'Team Leader', icon: '👑', rarity: 'EPIC' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero Profile */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="glass border border-orange-500/30 rounded-xl p-8 md:flex items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-6xl mb-6 md:mb-0 flex-shrink-0">
              👾
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-4xl font-black text-orange-400 mb-2">{playerStats.username}</h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold">Level {playerStats.level}</span>
                  <span className="text-slate-400">Pro Player</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-orange-400">{playerStats.totalMatches}</div>
                  <div className="text-sm text-slate-400">Матчей</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-green-400">{playerStats.winRate}%</div>
                  <div className="text-sm text-slate-400">Винрейт</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-red-400">{playerStats.avgKD}</div>
                  <div className="text-sm text-slate-400">K/D Ratio</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-400">{playerStats.playTime}</div>
                  <div className="text-sm text-slate-400">Игровое время</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <TrendingUp className="w-8 h-8" />
            ОСНОВНАЯ СТАТИСТИКА
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Всего Фрагов', value: playerStats.kills, icon: Target, color: 'from-red-500 to-orange-500' },
              { label: 'Смертей', value: playerStats.deaths, icon: Zap, color: 'from-purple-500 to-pink-500' },
              { label: 'Среднее K/D', value: playerStats.avgKD, icon: Award, color: 'from-orange-500 to-yellow-500' },
              { label: 'Рейтинг', value: '4,850', icon: TrendingUp, color: 'from-cyan-500 to-blue-500' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 hover-lift transition-all">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                  <div className="text-3xl font-black text-white">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Win Rate Chart */}
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-orange-400 mb-8">Распределение побед</h3>
              <div className="space-y-4">
                {[
                  { game: 'CS:GO', winRate: 72, color: 'from-orange-500 to-red-500' },
                  { game: 'Valorant', winRate: 68, color: 'from-purple-500 to-pink-500' },
                  { game: 'Dota 2', winRate: 65, color: 'from-cyan-500 to-blue-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 font-semibold">{item.game}</span>
                      <span className="text-orange-400 font-bold">{item.winRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Play Time */}
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h3 className="text-xl font-bold text-orange-400 mb-8">Активность по часам</h3>
              <div className="space-y-3">
                {[
                  { time: '00:00 - 04:00', activity: 12 },
                  { time: '04:00 - 08:00', activity: 8 },
                  { time: '08:00 - 12:00', activity: 25 },
                  { time: '12:00 - 16:00', activity: 35 },
                  { time: '16:00 - 20:00', activity: 42 },
                  { time: '20:00 - 00:00', activity: 38 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{item.time}</span>
                    <div className="flex-1 mx-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: `${(item.activity / 42) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-orange-400 font-bold text-sm w-8">{item.activity}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Matches */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <Clock className="w-8 h-8" />
            ПОСЛЕДНИЕ МАТЧИ
          </h2>

          <div className="space-y-3">
            {recentMatches.map((match) => (
              <div key={match.id} className="glass border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 hover-lift transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`px-4 py-2 rounded font-bold text-lg ${match.result === 'WIN' ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'}`}>
                      {match.result}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{match.game}</p>
                      <p className="text-sm text-slate-400">{match.rank}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-orange-400 mb-1">{match.score}</div>
                    <div className="text-sm text-slate-400">{match.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <Award className="w-8 h-8" />
            ДОСТИЖЕНИЯ
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-xl p-8 text-center hover:border-orange-500/60 hover-lift transition-all">
                <div className="text-5xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  achievement.rarity === 'LEGENDARY' ? 'bg-yellow-500/30 text-yellow-400' :
                  achievement.rarity === 'EPIC' ? 'bg-purple-500/30 text-purple-400' :
                  achievement.rarity === 'RARE' ? 'bg-blue-500/30 text-blue-400' :
                  'bg-slate-500/30 text-slate-400'
                }`}>
                  {achievement.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
