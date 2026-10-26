'use client';

import { useState, useEffect } from 'react';
import { Users, Zap, Trophy, Clock } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading stats
    const statsData: StatItem[] = [
      {
        icon: <Users className="w-8 h-8" />,
        label: 'Активных игроков',
        value: 1500,
        color: 'from-cyan-500 to-blue-600',
      },
      {
        icon: <Zap className="w-8 h-8" />,
        label: 'ПК в сети',
        value: 32,
        color: 'from-yellow-500 to-orange-500',
      },
      {
        icon: <Trophy className="w-8 h-8" />,
        label: 'Проведено турниров',
        value: 125,
        color: 'from-green-500 to-emerald-500',
      },
      {
        icon: <Clock className="w-8 h-8" />,
        label: 'Часов сыграно',
        value: 45000,
        suffix: '+',
        color: 'from-purple-500 to-pink-500',
      },
    ];
    setStats(statsData);
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-600/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass border border-cyan-500/30 rounded-lg p-6 text-center hover-lift transition-all hover:border-cyan-500/60"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-3 mx-auto`}>
                {stat.icon}
              </div>
              <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value.toLocaleString('ru-RU')}
                {stat.suffix}
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
