'use client';

import { CreditCard, Lock, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center neon-text-orange">
            ОПЛАТА
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Безопасная оплата для бронирования и услуг
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          {!isSuccess ? (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="md:col-span-2">
                <div className="glass border border-orange-500/30 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-orange-400 mb-8">СПОСОБ ОПЛАТЫ</h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { id: 'card', label: 'Кредитная карта', icon: '💳' },
                      { id: 'yandex', label: 'Яндекс.Касса', icon: '💰' },
                      { id: 'sberbank', label: 'Сбербанк', icon: '🏦' },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all" 
                        style={{
                          borderColor: paymentMethod === method.id ? '#ff6b35' : 'rgba(255, 107, 53, 0.2)',
                          backgroundColor: paymentMethod === method.id ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
                        }}>
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 accent-orange-500"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-semibold text-white">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-bold text-orange-400 mb-2">Номер карты</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-orange-400 mb-2">Срок действия</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-orange-400 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-orange-400 mb-2">Имя владельца</label>
                        <input
                          type="text"
                          placeholder="JOHN DOE"
                          className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-slate-300 mb-8 bg-slate-800/50 p-4 rounded-lg border border-orange-500/20">
                    <Lock className="w-4 h-4 text-orange-400" />
                    Ваши платёжные данные защищены 256-битным шифрованием
                  </div>

                  <NeoButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'ОБРАБОТКА...' : 'ОПЛАТИТЬ 15,000 ₽'}
                  </NeoButton>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="glass border border-orange-500/30 rounded-xl p-8 sticky top-32">
                  <h3 className="text-lg font-bold text-orange-400 mb-6">ИТОГО</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-orange-500/20">
                    <div className="flex justify-between text-slate-300">
                      <span>Регистрация турнира</span>
                      <span>15,000 ₽</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Комиссия</span>
                      <span>0 ₽</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">К оплате:</span>
                      <span className="text-3xl font-black text-orange-400">15,000 ₽</span>
                    </div>
                    <p className="text-xs text-slate-400">Все суммы в рублях</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Безопасная трансакция</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Мгновенное подтверждение</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Возврат гарантирован</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Success Screen */
            <div className="max-w-2xl mx-auto">
              <div className="glass border border-orange-500/30 rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
                  <Check className="w-10 h-10 text-green-400" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Платёж успешно принят!</h2>
                <p className="text-slate-300 mb-8">
                  Спасибо за вашу регистрацию на турнир. Квитанция отправлена на вашу электронную почту.
                </p>

                <div className="glass border border-orange-500/20 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-bold text-orange-400 mb-4">Детали транзакции</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID операции:</span>
                      <span className="text-white font-mono">#TXN-2024-789456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Сумма:</span>
                      <span className="text-orange-400 font-bold">15,000 ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Статус:</span>
                      <span className="text-green-400 font-bold">Завершено</span>
                    </div>
                  </div>
                </div>

                <NeoButton variant="primary" size="lg" className="w-full">
                  ВЕРНУТЬСЯ НА ГЛАВНУЮ
                </NeoButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-400 mb-12">ЧАСТЫЕ ВОПРОСЫ</h2>

          <div className="space-y-4">
            {[
              { q: 'Какие платёжные системы вы принимаете?', a: 'Мы принимаем карты Visa, Mastercard, Яндекс.Кассу и Сбербанк.' },
              { q: 'Насколько безопасна оплата?', a: 'Все платежи защищены 256-битным SSL шифрованием. Данные вашей карты не сохраняются.' },
              { q: 'Какой будет срок возврата средств?', a: 'Возврат средств обрабатывается в течение 3-5 рабочих дней.' },
            ].map((faq, idx) => (
              <div key={idx} className="glass border border-orange-500/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
