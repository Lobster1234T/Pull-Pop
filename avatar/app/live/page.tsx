'use client';

import { Play, Users, Eye, Radio } from 'lucide-react';
import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function LivePage() {
  const liveStreams = [
    {
      id: 1,
      title: 'CS:GO Pro League - Финал',
      game: 'CS:GO',
      streamer: 'CyberPro',
      viewers: 5234,
      status: 'LIVE',
      image: '🎮',
    },
    {
      id: 2,
      title: 'Valorant Championship Qualifier',
      game: 'Valorant',
      streamer: 'ProGamer77',
      viewers: 3821,
      status: 'LIVE',
      image: '🎯',
    },
    {
      id: 3,
      title: 'Dota 2 Training Stream',
      game: 'Dota 2',
      streamer: 'DotaMaster',
      viewers: 2156,
      status: 'LIVE',
      image: '⚔️',
    },
    {
      id: 4,
      title: 'Apex Legends Ranked Grind',
      game: 'Apex Legends',
      streamer: 'LegendHunter',
      viewers: 1834,
      status: 'LIVE',
      image: '⚡',
    },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Tournament Grand Final', time: '20:00', date: 'Сегодня' },
    { id: 2, title: 'Pro League Matches', time: '18:00', date: 'Завтра' },
    { id: 3, title: 'Community Event', time: '16:00', date: 'Завтра' },
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
            ПРЯМОЙ ЭФИР
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Смотрите лучшие трансляции и турниры в режиме реального времени
          </p>
        </div>
      </section>

      {/* Live Streams */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <Radio className="w-8 h-8 animate-pulse" />
            ПРЯМО СЕЙЧАС ВЕЩАЮТ
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {liveStreams.map((stream) => (
              <div key={stream.id} className="glass border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 hover-lift group cursor-pointer">
                {/* Stream Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center text-8xl overflow-hidden">
                  {stream.image}
                  
                  {/* LIVE Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm animate-pulse">
                    <Radio className="w-3 h-3" />
                    LIVE
                  </div>

                  {/* Viewers */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full text-sm">
                    <Eye className="w-4 h-4" />
                    {stream.viewers.toLocaleString()}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                    <Play className="w-16 h-16 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <p className="text-orange-400 text-xs font-bold mb-2">{stream.game}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{stream.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm">👤</div>
                      <span className="text-slate-300 font-semibold">{stream.streamer}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-400 font-bold animate-pulse">
                      <Radio className="w-4 h-4" />
                      {stream.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Stream */}
          <div className="glass border border-orange-500/60 rounded-xl p-8 mb-12 shadow-xl shadow-orange-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center animate-pulse">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-400">Главная трансляция</h3>
                <p className="text-slate-400">Финал турнира CS:GO Pro League 2024</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-black text-orange-400">12.5K</div>
                <div className="text-slate-400">Зрителей</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-400">2ч 35мин</div>
                <div className="text-slate-400">Идёт трансляция</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-400">8/8</div>
                <div className="text-slate-400">Команд</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12">ПРЕДСТОЯЩИЕ ТРАНСЛЯЦИИ</h2>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="glass border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 hover-lift transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-slate-400 text-sm">{event.date} • {event.time}</p>
                  </div>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all">
                    УВЕДОМИТЬ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">ЧАТ ТРАНСЛЯЦИИ</h2>

          <div className="glass border border-orange-500/30 rounded-xl p-6 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              {[
                { user: 'ProPlayer', msg: 'Отличная игра!' },
                { user: 'Gamer123', msg: 'Кто будет за такого тиму?' },
                { user: 'Admin', msg: 'Спасибо за поддержку!' },
                { user: 'CyberFan', msg: 'Это просто лучший матч в истории!' },
              ].map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-orange-400 font-bold">{msg.user}:</span>
                  <span className="text-slate-300 ml-2">{msg.msg}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Напишите сообщение..."
                className="flex-1 bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              />
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
