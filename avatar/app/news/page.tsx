'use client';

import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import NeoButton from '@/app/components/NeoButtton';
import NewsCarousel from '@/app/components/NewsCarousel';
import { getNews, getTournaments } from '@/app/lib/db';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category?: 'update' | 'tournament' | 'event' | 'promotion';
}

export default function NewsPage() {
  const news = getNews();
  const tournaments = getTournaments();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Категории новостей
  const categories = [
    { id: 'all', label: 'Все новости' },
    { id: 'tournament', label: '🏆 Турниры' },
    { id: 'event', label: '🎉 События' },
    { id: 'promotion', label: '🎁 Акции' },
    { id: 'update', label: '⚙️ Обновления' },
  ];

  // Фильтрованные новости
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter((item: NewsItem) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="НОВОСТИ"
          subtitle="БУДЬТЕ В КУРСЕ СОБЫТИЙ"
          colorA="#06b6d4"
          colorB="#0891b2"
          speed={1}
        />
      </section>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black mb-6 gradient-text leading-tight">
              СЛЕДИТЕ ЗА СОБЫТИЯМИ
            </h1>

            <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Турниры, акции, обновления и события из мира AVATAR Gaming Club
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeoButton 
                variant="primary" 
                size="lg"
                onClick={() => router.push('/tournaments')}
              >
                ТУРНИРЫ
              </NeoButton>
              <NeoButton 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/booking')}
              >
                ЗАБРОНИРОВАТЬ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>

      {/* News Carousel */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 gradient-text">ПОСЛЕДНИЕ НОВОСТИ</h2>
            <NewsCarousel news={news.slice(0, 10)} />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-cyan-500/20 border border-cyan-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item: NewsItem, idx: number) => (
              <div 
                key={item.id}
                className="glass-accent rounded-lg overflow-hidden hover-lift group cursor-pointer"
              >
                {/* Image */}
                {item.image && (
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-cyan-400 uppercase">
                      {item.date}
                    </span>
                    <span className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs font-semibold text-cyan-300">
                      {item.category?.toUpperCase() || 'НОВОСТЬ'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {item.excerpt || item.content}
                  </p>

                  {/* Read More Button */}
                  <button className="text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors flex items-center gap-2">
                    Читать далее
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-400">Новостей в этой категории пока нет</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Tournaments Section */}
      {tournaments.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-gradient-to-b from-transparent to-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 gradient-text">
                ПРЕДСТОЯЩИЕ ТУРНИРЫ
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Не пропустите возможность поучаствовать в престижных соревнованиях
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.slice(0, 6).map((tournament, idx) => (
                <div 
                  key={tournament.id}
                  className="glass-accent rounded-lg overflow-hidden hover-lift group"
                >
                  <div className="relative h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                    <div className="text-5xl opacity-50 group-hover:scale-110 transition-transform">
                      {tournament.game === 'CS:GO' ? '🔫' : tournament.game === 'Valorant' ? '🎯' : '⚔️'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                    <p className="text-cyan-400 font-semibold mb-4">{tournament.game}</p>
                    <div className="space-y-2 text-sm text-slate-400 mb-6">
                      <p>🏆 Призовой фонд: <span className="text-yellow-400">{tournament.prizePool}₽</span></p>
                      <p>👥 Участников: {tournament.participants}/{tournament.maxParticipants}</p>
                    </div>
                    <NeoButton 
                      variant="primary"
                      onClick={() => router.push(`/tournament-detail/${tournament.id}`)}
                    >
                      ПОДРОБНЕЕ
                    </NeoButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <NeoButton 
                variant="secondary"
                size="lg"
                onClick={() => router.push('/tournaments')}
              >
                ВСЕ ТУРНИРЫ
              </NeoButton>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-accent rounded-lg p-12 text-center hover-lift">
            <h2 className="text-4xl font-black mb-6 gradient-text">
              ПОДПИШИТЕСЬ НА РАССЫЛКУ
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Получайте первыми информацию о турнирах, событиях и спецпредложениях
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email"
                placeholder="Введите вашу почту"
                className="flex-1 px-6 py-3 bg-slate-800/30 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <NeoButton 
                variant="primary"
                onClick={() => alert('Спасибо за подписку!')}
              >
                ПОДПИСАТЬСЯ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
