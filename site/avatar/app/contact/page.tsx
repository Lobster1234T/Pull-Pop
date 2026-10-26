'use client';

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

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
            КОНТАКТЫ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Свяжитесь с нами. Мы всегда готовы помочь
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: 'Телефон',
                value: '+996 709 016 008',
                link: 'tel:+996709016008',
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'info@avatar.kg',
                link: 'mailto:info@avatar.kg',
              },
              {
                icon: MapPin,
                title: 'Адрес',
                value: 'ул. Ленина, 42, Бишкек',
                link: '#',
              },
              {
                icon: Clock,
                title: 'Режим работы',
                value: '24/7 без выходных',
                link: '#',
              },
            ].map((info, idx) => (
              <a
                key={idx}
                href={info.link}
                className="glass border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 hover-lift group transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-3 mb-4 group-hover:neon-glow-orange transition-all">
                  <info.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-bold text-orange-400 mb-1">{info.title}</h3>
                <p className="text-slate-300">{info.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="glass border border-orange-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-6">Отправить сообщение</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm font-semibold mb-2">Имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="ваша@почта.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-semibold mb-2">Сообщение</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all resize-none"
                    placeholder="Ваше сообщение"
                  />
                </div>

                <NeoButton type="submit" variant="primary" size="lg" className="w-full" icon={<Send className="w-5 h-5" />}>
                  ОТПРАВИТЬ
                </NeoButton>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="glass border border-orange-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-3">⏰ Время ответа</h3>
                <p className="text-slate-300">Обычно мы отвечаем в течение 1 часа. Если письмо пришло ночью, мы ответим утром.</p>
              </div>

              <div className="glass border border-orange-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-3">📱 Другие способы</h3>
                <p className="text-slate-300 mb-3">Вы также можете связаться с нами через:</p>
                <div className="space-y-2">
                  <a href="https://wa.me/996709016008" className="text-orange-400 hover:text-orange-300 transition-colors">
                    💬 WhatsApp: +996 709 016 008
                  </a>
                  <a href="https://t.me/avatargaming" className="text-orange-400 hover:text-orange-300 transition-colors block">
                    ✈️ Telegram: @avatargaming
                  </a>
                  <a href="https://instagram.com/avatargaming" className="text-orange-400 hover:text-orange-300 transition-colors block">
                    📸 Instagram: @avatargaming
                  </a>
                </div>
              </div>

              <div className="glass border border-orange-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-3">🎮 Приезжайте к нам</h3>
                <p className="text-slate-300">
                  Лучший способ узнать о нас - это посетить клуб лично! Первый час игры будет с 30% скидкой.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-orange-400 mb-8 text-center">Как найти нас?</h2>

          <div className="glass border border-orange-500/30 rounded-xl overflow-hidden h-96">
            <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center text-6xl">
              📍
            </div>
          </div>

          <p className="text-center text-slate-400 mt-6">
            AVATAR Gaming Club находится в центре города, легко добраться на общественном транспорте или личном автомобиле.
            Подробные указания будут отправлены при бронировании.
          </p>
        </div>
      </section>
    </main>
  );
}
