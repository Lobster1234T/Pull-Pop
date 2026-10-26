'use client';

import { Handshake, Globe, Award } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function PartnersPage() {
  const partners = [
    {
      id: 1,
      name: 'Intel Gaming',
      category: 'Оборудование',
      logo: '🖥️',
      description: 'Официальный партнёр по процессорам и оборудованию',
      link: '#',
    },
    {
      id: 2,
      name: 'NVIDIA',
      category: 'Графика',
      logo: '⚡',
      description: 'Поставщик видеокарт и графических решений',
      link: '#',
    },
    {
      id: 3,
      name: 'Corsair',
      category: 'Периферия',
      logo: '🎮',
      description: 'Партнёр по игровой периферии и аксессуарам',
      link: '#',
    },
    {
      id: 4,
      name: 'SteelSeries',
      category: 'Наушники',
      logo: '🎧',
      description: 'Официальный поставщик игровых наушников',
      link: '#',
    },
    {
      id: 5,
      name: 'Red Bull',
      category: 'Напитки',
      logo: '🥤',
      description: 'Официальный энергетический напиток',
      link: '#',
    },
    {
      id: 6,
      name: 'YouTube Gaming',
      category: 'Трансляции',
      logo: '📺',
      description: 'Партнёр по трансляции и контенту',
      link: '#',
    },
  ];

  const sponsors = [
    { name: 'TechCorp', tier: 'PLATINUM', amount: '500,000 ₽' },
    { name: 'GameForce', tier: 'GOLD', amount: '250,000 ₽' },
    { name: 'CyberPower', tier: 'SILVER', amount: '100,000 ₽' },
    { name: 'ProGaming', tier: 'BRONZE', amount: '50,000 ₽' },
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
            ПАРТНЁРЫ И СПОНСОРЫ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Компании, которые поддерживают AVATAR Gaming Club
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <Handshake className="w-8 h-8" />
            ОФИЦИАЛЬНЫЕ ПАРТНЁРЫ
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="glass border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 hover-lift group cursor-pointer transition-all">
                <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 p-12 text-center text-6xl">
                  {partner.logo}
                </div>

                <div className="p-6">
                  <p className="text-orange-400 text-xs font-bold mb-2 uppercase">{partner.category}</p>
                  <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{partner.description}</p>

                  <NeoButton variant="secondary" size="sm" className="w-full text-sm">
                    УЗНАТЬ БОЛЬШЕ
                  </NeoButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12 flex items-center gap-2">
            <Award className="w-8 h-8" />
            ОСНОВНЫЕ СПОНСОРЫ
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {sponsors.map((sponsor, idx) => {
              const tierColors = {
                PLATINUM: 'from-cyan-500 to-blue-500',
                GOLD: 'from-yellow-500 to-orange-500',
                SILVER: 'from-slate-400 to-slate-300',
                BRONZE: 'from-orange-700 to-orange-600',
              };

              const tierBg = {
                PLATINUM: 'bg-cyan-500/10',
                GOLD: 'bg-yellow-500/10',
                SILVER: 'bg-slate-400/10',
                BRONZE: 'bg-orange-700/10',
              };

              return (
                <div key={idx} className={`glass border border-orange-500/30 rounded-xl p-8 ${tierBg[sponsor.tier as keyof typeof tierBg]}`}>
                  <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm mb-4 bg-gradient-to-r ${tierColors[sponsor.tier as keyof typeof tierColors]} text-white`}>
                    {sponsor.tier}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2">{sponsor.name}</h3>
                  <p className="text-3xl font-black text-orange-400">{sponsor.amount}</p>
                </div>
              );
            })}
          </div>

          {/* Partnership Benefits */}
          <div className="glass border border-orange-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-8">ПРЕИМУЩЕСТВА ПАРТНЁРСТВА</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Видимость бренда', desc: 'Ваша компания получит известность среди геймеров' },
                { title: 'Событие и ТТ', desc: 'Участие в турнирах и промо-акциях' },
                { title: 'Целевая аудитория', desc: 'Прямой доступ к 10,000+ геймеров' },
                { title: 'Маркетинг поддержка', desc: 'Помощь в продвижении вашей продукции' },
              ].map((benefit, idx) => (
                <div key={idx} className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-bold text-white text-lg mb-2">{benefit.title}</h4>
                  <p className="text-slate-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass border border-orange-500/30 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-orange-400 mb-4">ХОТИТЕ СТАТЬ ПАРТНЁРОМ?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Свяжитесь с нами и обсудите возможности сотрудничества
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeoButton variant="primary" size="lg">
                КОНТАКТЫ
              </NeoButton>
              <NeoButton variant="secondary" size="lg" icon={<Globe className="w-5 h-5" />}>
                ПОСЕТИТЬ ВЕБ-САЙТ
              </NeoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
