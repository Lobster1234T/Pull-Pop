'use client';

import { BookOpen, Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { useState, useMemo } from 'react';
import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('Все');

  const articles = [
    {
      id: 1,
      title: 'Топ 10 советов для улучшения вашего CS:GO',
      excerpt: 'Узнайте, как профессионалы тренируют свои скиллы и достигают высокого уровня игры.',
      author: 'ProCoach',
      date: '2024-10-15',
      category: 'Гайды',
      tags: ['CS:GO', 'Советы', 'Тактика'],
      readTime: 8,
      image: '🎯',
    },
    {
      id: 2,
      title: 'Обзор новых видеокарт для гейминга',
      excerpt: 'Сравнение последних GPU для максимальной производительности в играх.',
      author: 'TechReview',
      date: '2024-10-14',
      category: 'Оборудование',
      tags: ['Оборудование', 'GPU', 'Обзор'],
      readTime: 12,
      image: '⚡',
    },
    {
      id: 3,
      title: 'Интервью с чемпионом Valorant',
      excerpt: 'Беседа с одним из лучших игроков мира о его пути к вершине.',
      author: 'Journalist',
      date: '2024-10-13',
      category: 'Интервью',
      tags: ['Valorant', 'Интервью', 'Профессионалы'],
      readTime: 15,
      image: '🏆',
    },
    {
      id: 4,
      title: 'История киберспорта: от истоков до наших дней',
      excerpt: 'Полный обзор эволюции киберспорта и его влияния на культуру.',
      author: 'Historian',
      date: '2024-10-12',
      category: 'История',
      tags: ['Киберспорт', 'История', 'Культура'],
      readTime: 20,
      image: '📚',
    },
    {
      id: 5,
      title: 'Как улучшить FPS в ваших играх',
      excerpt: 'Практические советы по оптимизации настроек для лучшей производительности.',
      author: 'TechGuy',
      date: '2024-10-11',
      category: 'Гайды',
      tags: ['FPS', 'Оптимизация', 'Советы'],
      readTime: 10,
      image: '⚙️',
    },
    {
      id: 6,
      title: 'Психология гейминга: мотивация и достижения',
      excerpt: 'Разберёмся, что мотивирует игроков и как достичь своих целей.',
      author: 'Psychologist',
      date: '2024-10-10',
      category: 'Психология',
      tags: ['Психология', 'Мотивация', 'Развитие'],
      readTime: 14,
      image: '🧠',
    },
  ];

  const allTags = ['Все', ...new Set(articles.flatMap(a => a.tags))];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'Все' || article.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center neon-text-orange">
            БЛОГ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Статьи, гайды и интервью из мира киберспорта
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
            <input
              type="text"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800/50 text-slate-300 border border-orange-500/30 hover:border-orange-500/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-400 mb-8">РЕКОМЕНДУЕМАЯ СТАТЬЯ</h2>

            <div className="glass border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 group cursor-pointer transition-all md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-orange-500/20 to-purple-500/20 p-12 text-center text-7xl flex items-center justify-center">
                {filteredArticles[0].image}
              </div>

              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-500/30 text-orange-400 rounded-full text-xs font-bold">
                    {filteredArticles[0].category}
                  </span>
                  <span className="text-slate-400 text-sm">{filteredArticles[0].readTime} мин</span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {filteredArticles[0].title}
                </h3>

                <p className="text-slate-300 mb-4">{filteredArticles[0].excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-orange-500/10">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {filteredArticles[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(filteredArticles[0].date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            ВСЕ СТАТЬИ
          </h2>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(1).map((article) => (
                <div
                  key={article.id}
                  className="glass border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 hover-lift group cursor-pointer transition-all flex flex-col"
                >
                  <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 p-8 text-center text-4xl flex items-center justify-center h-32">
                    {article.image}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-orange-500/30 text-orange-400 rounded text-xs font-bold">
                        {article.category}
                      </span>
                      <span className="text-slate-400 text-xs">{article.readTime} мин</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 flex-1">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-orange-500/10 text-sm text-slate-400">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass border border-orange-500/30 rounded-xl p-12 text-center">
              <p className="text-2xl font-bold text-slate-300 mb-2">Статьи не найдены</p>
              <p className="text-slate-400">Попробуйте изменить поисковый запрос или фильтры</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
