'use client';

import {
  MapPin,
  Cpu,
  Zap,
  Clock,
  Phone,
  Gamepad2,
} from 'lucide-react';
import { useLanguage } from './i18n';
import Header from './components/Header';
import GamingZoneCard from './components/GamingZoneCard';
import StatsCard from './components/StatsCard';
import NeoButton from './components/NeoButtton';
import TariffCard from './components/TariffCard';
import AnimatedBackground from './components/AnimatedBackground';
import HeroCarousel from './components/HeroCarousel';
import TournamentCard from './components/TournamentCard';
import NewsCarousel from './components/NewsCarousel';
import GettingStartedSection from './components/GettingStartedSection';
import FeatureCard from './components/FeatureCard';
import StatsSection from './components/StatsSection';
import AvatarClubAnimation from './components/AvatarClubAnimation';
import { getBranch, getZones, getTariffs, getNews, getTournaments } from '@/app/lib/db';

export default function Home() {
  const { t } = useLanguage();
  const branch = getBranch();
  const zones = getZones();
  const allTariffs = getTariffs();
  const news = getNews();
  const tournaments = getTournaments();

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />

      {/* Navigation */}
      <Header />

      {/* Avatar Club Animation - First Screen */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="AVATAR"
          subtitle="КОМПЬЮТЕРНЫЙ КЛУБ"
          colorA="#8a5cff"
          colorB="#19e3ff"
          speed={1}
        />
      </section>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold animate-slide-in-left">
              🎮 {branch.city} • Премиум Клуб
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 gradient-text leading-tight">
              {branch.name}
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {branch.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeoButton variant="primary" size="lg">
                ЗАБРОНИРОВАТЬ МЕСТО
              </NeoButton>
              <NeoButton variant="secondary" size="lg">
                УЗНАТЬ БОЛЬШЕ
              </NeoButton>
            </div>
          </div>

          {/* Hero Carousel - 5 slides with smooth animation */}
          <HeroCarousel />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            <StatsCard label="Зон" value="3" icon={<Gamepad2 className="w-6 h-6" />} />
            <StatsCard label="Мест" value={zones.reduce((sum, z) => sum + z.capacity, 0).toString()} icon={<Cpu className="w-6 h-6" />} />
            <StatsCard label="Тарифов" value={allTariffs.length.toString()} icon={<Clock className="w-6 h-6" />} />
            <StatsCard label="24/7" value={branch.is_24_7 ? 'Да' : 'Нет'} icon={<Zap className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Branch Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-accent rounded-lg p-6 hover-lift">
              <MapPin className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Адрес</h3>
              <p className="text-slate-400 text-sm">{branch.address}</p>
            </div>
            <div className="glass-accent rounded-lg p-6 hover-lift">
              <Phone className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Контакты</h3>
              <p className="text-slate-400 text-sm">{branch.phone}</p>
              <p className="text-slate-400 text-sm">WhatsApp: {branch.whatsapp}</p>
            </div>
            <div className="glass-accent rounded-lg p-6 hover-lift">
              <Clock className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Режим работы</h3>
              <p className="text-slate-400 text-sm">{branch.is_24_7 ? 'Работаем 24/7' : 'Пн-Пт 10:00-00:00'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming Zones */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black gradient-text mb-4">ИГРОВЫЕ ЗОНЫ</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Выберите подходящую зону для вашей игровой сессии
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {zones.map((zone) => (
              <GamingZoneCard
                key={zone.id}
                name={zone.name}
                type={zone.type}
                capacity={zone.capacity}
                description={zone.description}
                icon={zone.type === 'standard' ? '🖥️' : zone.type === 'ps5' ? '🎮' : '👑'}
                color={zone.type === 'standard' ? 'from-blue-500 to-cyan-500' : zone.type === 'ps5' ? 'from-purple-500 to-pink-500' : 'from-yellow-500 to-orange-500'}
                image={zone.type === 'standard' ? '/photo_2026-10-14_15-31-54.jpg' : zone.type === 'ps5' ? '/photo_2026-10-14_15-31-57.jpg' : '/photo_2026-10-14_15-32-00.jpg'}
                price={zone.type === 'standard' ? 150 : zone.type === 'ps5' ? 250 : 400}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs - Redesigned Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-gradient-to-b from-slate-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 text-sm font-semibold">
              💎 ГИБКИЕ И ВЫГОДНЫЕ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">ТАРИФЫ И ЦЕНЫ</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Выберите идеальный тариф для вашей игровой сессии. Все тарифы включают доступ к премиум оборудованию
            </p>
          </div>

          {/* Tariffs Grid with better layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {allTariffs.slice(0, 3).map((tariff, idx) => (
              <TariffCard
                key={tariff.id}
                name={tariff.name}
                price={tariff.price}
                description={tariff.description}
                features={[
                  `${tariff.duration_minutes} минут игры`,
                  `Доступ 24/7`,
                  `Сохранение прогресса`,
                  `Техническая поддержка`,
                  idx === 1 ? `Бонус: +10% времени` : ``,
                ].filter(f => f)}
                highlighted={idx === 1}
              />
            ))}
          </div>

          {/* Additional info section */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-accent rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-bold text-white mb-2">Без ограничений</h4>
              <p className="text-slate-400 text-sm">Играй столько, сколько нужно</p>
            </div>
            <div className="glass-accent rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-white mb-2">Экономия</h4>
              <p className="text-slate-400 text-sm">Чем больше время, тем дешевле час</p>
            </div>
            <div className="glass-accent rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="font-bold text-white mb-2">Премиум ПК</h4>
              <p className="text-slate-400 text-sm">RTX 4080, i9, 32GB RAM</p>
            </div>
            <div className="glass-accent rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl mb-3">🆓</div>
              <h4 className="font-bold text-white mb-2">Пробный период</h4>
              <p className="text-slate-400 text-sm">Первая сессия со скидкой 20%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments - Redesigned */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-gradient-to-b from-transparent to-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
              🏆 СОРЕВНОВАНИЯ И ПРИЗЫ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">ТУРНИРЫ</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Участвуйте в престижных турнирах, соревнуйтесь с лучшими игроками и выигрывайте привлекательные призы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                id={tournament.id}
                name={tournament.name}
                game={tournament.game}
                participants={tournament.participants}
                maxParticipants={tournament.maxParticipants}
                prizePool={tournament.prizePool}
                image={tournament.game === 'CS:GO' ? '/photo_2026-10-14_15-32-12.jpg' : tournament.game === 'Valorant' ? '/photo_2026-10-14_15-32-14.jpg' : '/photo_2026-10-14_15-32-17.jpg'}
                status={tournament.participants >= tournament.maxParticipants ? 'finished' : 'active'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section - Redesigned with Carousel */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
              📰 ВСЕГДА В КУРСЕ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">ПОСЛЕДНИЕ НОВОСТИ</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Следите за обновлениями, турнирами, событиями и всем интересным из мира AVATAR Gaming Club
            </p>
          </div>

          {/* News Carousel Component */}
          <NewsCarousel news={news.slice(0, 15)} />
        </div>
      </section>

      {/* Quick Stats Section */}
      <StatsSection />

      {/* What We Offer Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
              ⭐ ПРЕИМУЩЕСТВА
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">ЧТО МЫ ПРЕДЛАГАЕМ</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Комплексный пакет услуг и условий для максимального комфорта и удовольствия от игры
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="💻"
              title="Мощное оборудование"
              description="Современные ПК с Intel Core i7-14700K, видеокартами RTX 5080/5090, 32-64 GB оперативной памяти и 380+ Hz мониторами"
              image="/photo_2026-10-02_17-40-21.jpg"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon="🎮"
              title="Все популярные игры"
              description="CS:GO, Valorant, Dota 2, League of Legends, Apex Legends, Fortnite и многие другие AAA-титулы"
              image="/photo_2026-10-14_15-31-54.jpg"
              color="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon="🍕"
              title="Бар и закуски"
              description="Энергетические напитки, комбо-наборы, горячие блюда, снеки и всё необходимое для комфортной игровой сессии"
              image="/photo_2026-10-14_15-31-57.jpg"
              color="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon="🏆"
              title="Турниры и события"
              description="Регулярные соревнования с привлекательными призами, рейтинговые системы и специальные события с бонусами"
              image="/photo_2026-10-14_15-32-00.jpg"
              color="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon="🛡️"
              title="Безопасность 24/7"
              description="Видеонаблюдение, профессиональная охрана, страховка оборудования и гарантия защиты личных данных"
              image="/photo_2026-10-14_15-32-08.jpg"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon="🎯"
              title="Комфортная обстановка"
              description="Удобные эргономичные кресла, система вентиляции, климат-контроль, профессиональное освещение и дружелюбный персонал"
              image="/photo_2026-10-14_15-32-10.jpg"
              color="from-teal-500 to-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <GettingStartedSection />
    </main>
  );
}
