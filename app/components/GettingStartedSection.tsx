'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Как начать играть',
    description: 'Три простых шага для начала',
    icon: '🎮',
    details: [
      'Выберите удобную игровую зону (PC, PS5 или VIP)',
      'Сообщите администратору, сколько времени вам нужно',
      'Получите доступ к оборудованию и наслаждайтесь игрой',
    ],
  },
  {
    number: 2,
    title: 'Регистрация и аккаунт',
    description: 'Создайте профиль для отслеживания прогресса',
    icon: '👤',
    details: [
      'Нажмите кнопку "Регистрация" в верхнем меню',
      'Заполните данные (email, пароль, имя)',
      'Подтвердите email и готово!',
      'Ваш аккаунт даёт доступ к рейтингам и турнирам',
    ],
  },
  {
    number: 3,
    title: 'Пополнение счёта',
    description: 'Оплата быстро и безопасно',
    icon: '💳',
    details: [
      'В личном кабинете нажмите "Пополнить счёт"',
      'Выберите способ оплаты (карта, Finik, USDT)',
      'Введите сумму и завершите операцию',
      'Средства сразу поступят на ваш счёт',
    ],
  },
  {
    number: 4,
    title: 'Как выигрывать',
    description: 'Максимизируйте свои шансы на призы',
    icon: '🏆',
    details: [
      'Участвуйте в еженедельных турнирах',
      'Поднимайтесь в рейтинговой таблице',
      'Получайте бонусы за регулярные игры',
      'Выигрывайте призы и кэшбэк',
    ],
  },
];

export default function GettingStartedSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-gradient-to-b from-slate-900/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">
            🚀 НАЧНИТЕ ПРЯМО СЕЙЧАС
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="gradient-text">Готовы начать?</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Четыре простых шага для начала вашего игрового путешествия с AVATAR Gaming Club
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg overflow-hidden transition-all duration-300 hover-lift cursor-pointer"
              onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
            >
              {/* Step header */}
              <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{step.icon}</div>
                    <div>
                      <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold mb-2">
                        Шаг {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-cyan-400 transition-transform flex-shrink-0 ${
                      expandedStep === step.number ? 'rotate-90' : ''
                    }`}
                  />
                </div>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>

              {/* Step details - expandable */}
              {expandedStep === step.number && (
                <div className="border-t border-cyan-500/20 p-6 bg-slate-900/30 animate-fade-in-up">
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Не знаешь, с чего начать?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Наша команда всегда готова помочь вам. Приходите в клуб или свяжитесь с нами через чат
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
            ЗАБРОНИРОВАТЬ МЕСТО СЕЙЧАС
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
