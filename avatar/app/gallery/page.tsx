'use client';

import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function GalleryPage() {
  const photos = [
    { id: 1, title: 'VIP Зона', category: 'Помещения', emoji: '🎮' },
    { id: 2, title: 'Gaming Setups', category: 'Оборудование', emoji: '🖥️' },
    { id: 3, title: 'Турнир CS:GO', category: 'События', emoji: '🏆' },
    { id: 4, title: 'Игровые комнаты', category: 'Помещения', emoji: '🏢' },
    { id: 5, title: 'Premium Headsets', category: 'Оборудование', emoji: '🎧' },
    { id: 6, title: 'Valorant Finals', category: 'События', emoji: '🎯' },
    { id: 7, title: 'Standard Зона', category: 'Помещения', emoji: '💻' },
    { id: 8, title: 'Mechanical Keyboards', category: 'Оборудование', emoji: '⌨️' },
    { id: 9, title: 'Призовая церемония', category: 'События', emoji: '🎁' },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center gradient-text">
            ГАЛЕРЕЯ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Посмотрите как выглядит жизнь в AVATAR Gaming Club
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="glass border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-500/60 hover-lift group cursor-pointer transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {photo.emoji}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="w-full p-6">
                      <p className="text-xs text-cyan-400 font-bold mb-1">{photo.category}</p>
                      <p className="text-lg font-bold text-white">{photo.title}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-cyan-400 text-xs font-bold mb-1">{photo.category}</p>
                  <h3 className="font-bold text-white">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Фото', value: '128' },
              { label: 'Видео', value: '45' },
              { label: 'События', value: '32' },
              { label: 'Лайки', value: '12K+' },
            ].map((stat, idx) => (
              <div key={idx} className="glass border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 hover-lift">
                <div className="text-4xl font-black text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
