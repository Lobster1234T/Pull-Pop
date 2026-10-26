'use client';

import { Calendar, Clock, Users, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import FinikPaymentModal from '@/app/components/FinikPaymentModal';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    zone: 'STANDARD',
    duration: '1',
    players: '1',
  });
  const [user, setUser] = useState<User | null>(null);
  const [isFinikModalOpen, setIsFinikModalOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<typeof formData | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем что пользователь авторизован
    if (!user) {
      alert('Пожалуйста, авторизуйтесь для бронирования');
      return;
    }

    // Сохраняем данные бронирования и открываем модальное окно Finik
    setPendingBooking(formData);
    setIsFinikModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (pendingBooking) {
      console.log('Booking confirmed with payment:', pendingBooking);
      alert('✅ Бронирование подтверждено! Оплата прошла успешно. Проверьте вашу почту.');
      // Очищаем форму
      setFormData({
        date: '',
        time: '',
        zone: 'STANDARD',
        duration: '1',
        players: '1',
      });
      setPendingBooking(null);
    }
  };

  const zones = ['STANDARD', 'VIP', 'PS5'];
  const durations = ['1', '2', '4', '8', '24'];
  const players = ['1', '2', '3', '4', '5+'];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="БРОНИРОВАНИЕ"
          subtitle="ВЫБЕРИ МЕСТО И ВРЕМЯ"
          colorA="#f97316"
          colorB="#ea580c"
          speed={1}
        />
      </section>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center gradient-text">
            ЗАБРОНИРОВАТЬ МЕСТО
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Выберите дату, время и зону для вашей игровой сессии
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="glass border border-orange-500/30 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-orange-400 font-bold mb-3">
                  <Calendar className="w-5 h-5" />
                  ВЫБЕРИТЕ ДАТУ
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 text-orange-400 font-bold mb-3">
                  <Clock className="w-5 h-5" />
                  ВРЕМЯ НАЧАЛА
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Zone Selection */}
              <div>
                <label className="flex items-center gap-2 text-orange-400 font-bold mb-3">
                  <Zap className="w-5 h-5" />
                  ВЫБЕРИТЕ ЗОН
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {zones.map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setFormData({ ...formData, zone })}
                      className={`py-3 rounded-lg font-bold transition-all ${
                        formData.zone === zone
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white neon-glow-orange'
                          : 'bg-slate-800/50 border border-orange-500/30 text-slate-300 hover:border-orange-500/60'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-orange-400 font-bold mb-3">
                  <Clock className="w-5 h-5" />
                  ПРОДОЛЖИТЕЛЬНОСТЬ
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {durations.map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: dur })}
                      className={`py-2 rounded-lg font-bold transition-all text-sm ${
                        formData.duration === dur
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-800/50 border border-orange-500/30 text-slate-300 hover:border-orange-500/60'
                      }`}
                    >
                      {dur}ч
                    </button>
                  ))}
                </div>
              </div>

              {/* Players */}
              <div>
                <label className="flex items-center gap-2 text-orange-400 font-bold mb-3">
                  <Users className="w-5 h-5" />
                  КОЛИЧЕСТВО ИГРОКОВ
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {players.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, players: p })}
                      className={`py-2 rounded-lg font-bold transition-all ${
                        formData.players === p
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-800/50 border border-orange-500/30 text-slate-300 hover:border-orange-500/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
                <p className="text-slate-300">
                  <span className="text-orange-400 font-bold">Итого:</span> {formData.duration}ч × 200 сом = <span className="text-orange-400 font-bold text-lg">{Number(formData.duration) * 200} сом</span>
                </p>
              </div>

              <NeoButton type="submit" variant="primary" size="lg" className="w-full" icon={<Zap className="w-5 h-5" />}>
                {user ? 'ПОДТВЕРДИТЬ И ОПЛАТИТЬ' : 'АВТОРИЗУЙТЕСЬ ДЛЯ БРОНИРОВАНИЯ'}
              </NeoButton>
            </form>
          </div>

          {/* Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { title: 'БЫСТРОЕ ПОДТВЕРЖДЕНИЕ', desc: 'Получите подтверждение за 30 секунд' },
              { title: 'ГИБКАЯ ОТМЕНА', desc: 'Отмените за 2 часа до без штрафов' },
              { title: 'ГАРАНТИРОВАННОЕ МЕСТО', desc: 'Ваша зона зарезервирована на дату' },
            ].map((info, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-lg p-4">
                <h3 className="text-orange-400 font-bold mb-2">{info.title}</h3>
                <p className="text-slate-400 text-sm">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finik Payment Modal */}
      {user && pendingBooking && (
        <FinikPaymentModal 
          isOpen={isFinikModalOpen} 
          onClose={() => {
            setIsFinikModalOpen(false);
            setPendingBooking(null);
          }}
          userId={user.id}
        />
      )}
    </main>
  );
}
