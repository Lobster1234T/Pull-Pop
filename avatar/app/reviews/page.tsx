'use client';

import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function ReviewsPage() {
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 1,
      author: 'ProGamer2024',
      rating: 5,
      title: 'Лучший клуб в городе!',
      content: 'Отличное оборудование, быстрые ПК, профессиональная атмосфера. Рекомендую всем геймерам!',
      date: '2 дня назад',
      helpful: 156,
      verified: true,
    },
    {
      id: 2,
      author: 'GamingFan99',
      rating: 4,
      title: 'Хорошее место для игр',
      content: 'Удобное расположение, вежливый персонал. Только цены немного высокие.',
      date: '5 дней назад',
      helpful: 89,
      verified: true,
    },
    {
      id: 3,
      author: 'CyberNinja',
      rating: 5,
      title: 'Участвовал в турнире - очень впечатлён!',
      content: 'Организация на высочайшем уровне, справедливые условия для всех. Приз отличный!',
      date: '1 неделя назад',
      helpful: 234,
      verified: true,
    },
    {
      id: 4,
      author: 'NoobMaster',
      rating: 3,
      title: 'Норм, но есть замечания',
      content: 'Интернет иногда лагает, кондиционер слабый. Но в целом неплохо.',
      date: '10 дней назад',
      helpful: 45,
      verified: false,
    },
    {
      id: 5,
      author: 'ProTeam',
      rating: 5,
      title: 'Лучшее место для тренировок',
      content: 'Идеальное оборудование для профессиональных тренировок. Админы помогают с ТТ.',
      date: '2 недели назад',
      helpful: 312,
      verified: true,
    },
  ];

  const stats = [
    { rating: 5, count: 234, percentage: 65 },
    { rating: 4, count: 98, percentage: 27 },
    { rating: 3, count: 25, percentage: 7 },
    { rating: 2, count: 5, percentage: 1 },
    { rating: 1, count: 0, percentage: 0 },
  ];

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
            ОТЗЫВЫ И РЕЦЕНЗИИ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Мнения наших игроков о AVATAR Gaming Club
          </p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="glass border border-orange-500/30 rounded-xl p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-7xl font-black text-orange-400 mb-4">4.8</div>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-slate-400 text-lg">Основано на 362 отзывах</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.rating}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {stat.rating}
                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      </div>
                      <span className="text-slate-400">{stat.count} отзывов</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Write Review */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">ОСТАВИТЬ ОТЗЫВ</h2>

          <div className="glass border border-orange-500/30 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-orange-400 mb-2">Ваша оценка</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-4xl hover:scale-110 transition-transform">
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-orange-400 mb-2">Заголовок</label>
                <input
                  type="text"
                  placeholder="Короткое описание вашего мнения"
                  className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-orange-400 mb-2">Отзыв</label>
                <textarea
                  placeholder="Поделитесь вашим мнением..."
                  rows={6}
                  className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                ></textarea>
              </div>

              <NeoButton variant="primary" size="lg" className="w-full">
                ОПУБЛИКОВАТЬ ОТЗЫВ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-orange-400 flex items-center gap-2">
              <MessageSquare className="w-8 h-8" />
              ВСЕ ОТЗЫВЫ
            </h2>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-2 text-white focus:outline-none"
            >
              <option value="newest">Новые</option>
              <option value="helpful">Полезные</option>
              <option value="rating-high">Высокий рейтинг</option>
              <option value="rating-low">Низкий рейтинг</option>
            </select>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="glass border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/60 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0 text-lg">
                      <User className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white">{review.author}</h3>
                        {review.verified && (
                          <span className="text-xs bg-green-500/30 text-green-400 px-2 py-1 rounded">✓ Проверен</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-slate-600'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400">{review.date}</span>
                      </div>

                      <h4 className="font-bold text-lg text-white mb-2">{review.title}</h4>
                      <p className="text-slate-300 mb-4">{review.content}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-orange-500/10">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-all">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{review.helpful}</span>
                  </button>
                  <button className="px-4 py-1 text-sm text-slate-400 hover:text-orange-400 transition-all">
                    Ответить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
